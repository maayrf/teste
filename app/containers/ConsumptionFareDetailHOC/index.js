import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import { loadConsumptionFareById } from './actions';
import LoadingCard from '../../components/LoadingCard/index';

export const withConsumptionFare = (WrappedComponent) => {
  const withConsumptionFareComponent = class extends React.Component {
    componentDidMount() {
      const { consumptionFareId } = this.props;
      this.props.loadConsumptionFareById(consumptionFareId);
    }
    render() {
      const {
        loading,
        success,
        error,
        consumptionFareId,
        ...restProps
      } = this.props;

      if (success) {
        restProps.consumptionFare = success.consumptionFare;
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

  withConsumptionFareComponent.propTypes = {
    loadConsumptionFareById: PropTypes.func.isRequired,
    consumptionFareId: PropTypes.number.isRequired,
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
    loadConsumptionFareById: (consumptionFareId) =>
      dispatch(loadConsumptionFareById(consumptionFareId)),
  });

  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return withConnect(withConsumptionFareComponent);
};
