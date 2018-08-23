import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import openNotificationWithIcon from '../../utils/antd-notification';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import { loadDemandFareById } from './actions';
import LoadingCard from '../../components/LoadingCard/index';

export const withDemandFare = (WrappedComponent) => {
  const withDemandFareComponent = class extends React.Component {
    componentDidMount() {
      const { demandFareId } = this.props;
      this.props.loadDemandFareById(demandFareId);
    }
    render() {
      const {
        loading,
        success,
        error,
        demandFareId,
        ...restProps
      } = this.props;

      if (success) {
        restProps.demandFare = success.demandFare;
      }
      return (
        <LoadingCard
          loading={loading}
          className="card-no-padding card-no-border card-no-background"
        >
          {success ? <WrappedComponent {...restProps} /> : ''}
          {error ? (
            <div>
              {' '}
              <h3>{error.toString()}</h3>
            </div>
          ) : (
            ''
          )}
        </LoadingCard>
      );
    }
  };

  withDemandFareComponent.propTypes = {
    loadDemandFareById: PropTypes.func.isRequired,
    demandFareId: PropTypes.number.isRequired,
    error: PropTypes.object,
    success: PropTypes.object,
    loading: PropTypes.bool,
  };

  const mapStateToProps = createStructuredSelector({
    error: makeSelectError(),
    loading: makeSelectLoading(),
    success: makeSelectSuccess(),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadDemandFareById: (demandFareId) =>
      dispatch(loadDemandFareById(demandFareId)),
  });

  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return withConnect(withDemandFareComponent);
};
