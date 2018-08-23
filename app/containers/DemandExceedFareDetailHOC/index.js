import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import { loadDemandExceedFareById } from './actions';
import LoadingCard from '../../components/LoadingCard/index';

export const withDemandExceedFare = (WrappedComponent) => {
  const withDemandExceedFareComponent = class extends React.Component {
    componentDidMount() {
      const { demandExceedFareId } = this.props;
      this.props.loadDemandExceedFareById(demandExceedFareId);
    }
    render() {
      const {
        loading, success, error, ...restProps
      } = this.props;

      if (success) {
        restProps.demandExceedFare = success.demandExceedFare;
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

  withDemandExceedFareComponent.propTypes = {
    loadDemandExceedFareById: PropTypes.func.isRequired,
    demandExceedFareId: PropTypes.number.isRequired,
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
    loadDemandExceedFareById: (demandExceedFareId) =>
      dispatch(loadDemandExceedFareById(demandExceedFareId)),
  });

  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return withConnect(withDemandExceedFareComponent);
};
