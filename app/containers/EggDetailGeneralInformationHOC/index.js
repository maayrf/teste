/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import { loadEggDetailGeneralInformationById } from './actions';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

export const withEggDetailGeneralInformation = (WrappedComponent) => {
  const withEggDetailGeneralInformationComponent = class extends React.Component {
    componentDidMount() {
      const { loadEggDetailGeneralInformationById, eggId } = this.props;
      loadEggDetailGeneralInformationById(eggId);
    }

    componentDidUpdate(prevProps) {
      const { loadEggDetailGeneralInformationById, eggId, error } = this.props;
      if (error && prevProps.error !== error) {
        openNotificationWithIcon('error', error.toString());
      }
      if (prevProps.eggId !== eggId) {
        loadEggDetailGeneralInformationById(eggId);
      }
    }

    render() {
      const { success, error, ...restProps } = this.props;
      let { loading } = this.props;
      if (success) {
        restProps.egg = success.eggDetailGeneralInformation;
      } else {
        loading = true;
      }
      return (
        <Card
          loading={loading}
          className="card-no-padding card-no-border card-no-background"
        >
          {!loading && <WrappedComponent {...restProps} />}
        </Card>
      );
    }
  };

  withEggDetailGeneralInformationComponent.propTypes = {
    eggId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    error: PropTypes.object,
    success: PropTypes.object,
    loading: PropTypes.bool,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    loadEggDetailGeneralInformationById: PropTypes.func.isRequired,
  };

  const mapStateToProps = createStructuredSelector({
    error: makeSelectError(),
    loading: makeSelectLoading(),
    success: makeSelectSuccess(),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadEggDetailGeneralInformationById: (eggId) =>
      dispatch(loadEggDetailGeneralInformationById(eggId)),
  });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );
  const withReducer = injectReducer({
    key: 'eggDetailGeneralInformation',
    reducer,
  });
  const withSaga = injectSaga({ key: 'eggDetailGeneralInformation', saga });
  return compose(
    withReducer,
    withSaga,
    withRouter,
    withConnect
  )(withEggDetailGeneralInformationComponent);
};
