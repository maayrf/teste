import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import Loading from '../../../../components/Loading/index';
import { generateKeyForMeter, meterIsChecked } from '../../utils';
import LoadingCard from '../../../../components/LoadingCard/index';

const { TreeNode } = Tree;

const hasArrayOf = (obj, prop) => obj[prop] && obj[prop].length;

class MetersTree extends Component {
  onSelect = (meterKey) => {
    if (!this.props.onClickMeter) {
      return;
    }
    this.props.onClickMeter(meterKey);
  };

  onCheck = (
    checked,
    {
      node: {
        props: { dataRef },
      },
    }
  ) => {
    if (!this.props.onClickMeter) {
      return;
    }
    const meterKey = generateKeyForMeter(dataRef, dataRef.type);
    this.props.onClickMeter(meterKey);
  };

  isCheckable = () => !!this.props.checkedMeters;

  renderTreeNodes = (meters, type, _disabled = false) => {
    const { checkedMeters } = this.props;
    const disabled = _disabled;
    const isCheckable = this.isCheckable();

    return meters.map((meter) => {
      const treeNodeProps = {
        title: meter.name || meter.tradename,
        key: generateKeyForMeter(meter, type),
        dataRef: {
          ...meter,
          type,
        },
        disabled,
      };

      const groupingMeters = hasArrayOf(meter, 'groupings')
        ? meter.groupings
        : [];
      const eggMeters = hasArrayOf(meter, 'eggs') ? meter.eggs : [];
      const childrenMetersLength = eggMeters.length + groupingMeters.length;

      if (childrenMetersLength) {
        let newDisabled = disabled;
        if (isCheckable && meterIsChecked(meter, checkedMeters, type)) {
          newDisabled = true;
        }
        return (
          <TreeNode {...treeNodeProps}>
            {[
              ...this.renderTreeNodes(groupingMeters, 'grouping', newDisabled),
              ...this.renderTreeNodes(eggMeters, 'egg', newDisabled),
            ]}
          </TreeNode>
        );
      }

      return <TreeNode {...treeNodeProps} />;
    });
  };

  renderMetersTree = (meters, checkedMeters) => {
    const treeProps = {
      checkable: true,
      defaultExpandAll: true,
      checkStrictly: true,
      checkedKeys: checkedMeters,
      onSelect: this.onSelect,
      onCheck: this.onCheck,
    };
    return <Tree {...treeProps}>{this.renderTreeNodes(meters, 'branch')}</Tree>;
  };
  render() {
    const { meters, checkedMeters, branchesLoading } = this.props;

    return (
      <LoadingCard loading={branchesLoading}>
        {this.renderMetersTree(meters, checkedMeters)}
      </LoadingCard>
    );
  }
}

MetersTree.propTypes = {
  meters: PropTypes.array.isRequired,
  checkedMeters: PropTypes.array,
  onClickMeter: PropTypes.func,
  branchesLoading: PropTypes.bool,
};

export default MetersTree;
