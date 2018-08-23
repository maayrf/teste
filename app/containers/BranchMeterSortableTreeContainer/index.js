/**
 *
 * MeterSortableTreeContainer
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetersSortableTree from '../../components/MetersSortableTree';
import './style.less';

class BranchMeterSortableTreeContainer extends Component {
  getMeters = () => [this.props.branch];
  render() {
    const meters = this.getMeters();
    return <MetersSortableTree {...this.props} meters={meters} />;
  }
}

BranchMeterSortableTreeContainer.propTypes = {
  branch: PropTypes.object,
};

export default BranchMeterSortableTreeContainer;
