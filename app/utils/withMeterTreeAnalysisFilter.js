import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { isFilterReady } from '../containers/MetersTreeFilter/utils';
import { makeSelectMetersFilter } from '../containers/MetersTreeFilter/selectors';

export const withMeterTreeAnalysisFilter = (WrappedComponent) => {
  const withMeterTreeAnalysisFilterComponent = (props) => (
    <WrappedComponent
      isFilterReady={() => isFilterReady(props.filter)}
      {...props}
    />
  );
  withMeterTreeAnalysisFilterComponent.propTypes = {
    filter: PropTypes.object,
  };
  const mapStateToProps = createStructuredSelector({
    filter: makeSelectMetersFilter(),
  });
  const mapDispatchToProps = () => ({});
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );
  return withConnect(withMeterTreeAnalysisFilterComponent);
};
