import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import Loading from '../../components/Loading/index';

// TODO: Refatorar MeterTreeFilter para que ele trabalhe como MeterTree
export const meterIsChecked = (meter, checkedMeters) => {
  const { id, className } = meter;
  return checkedMeters.some((checkedMeter) =>
    checkedMeter.id === id && checkedMeter.className === className);
};
export const generateKeyForMeter = (meter) => `${meter.className}-${meter.id}`;

export const getSelectedMetersAndIgnoreChildrenWhenIsChecked = (
  metersList,
  checkedMeters
) => {
  let selectedMeters = [];
  for (let i = 0; i < metersList.length; i += 1) {
    const meter = metersList[i];
    if (!meterIsChecked(meter, checkedMeters)) {
      let groupings = [];
      let eggs = [];
      if (meter.groupings && meter.groupings.length) {
        groupings = getSelectedMetersAndIgnoreChildrenWhenIsChecked(
          meter.groupings,
          checkedMeters,
          'grouping'
        );
      }
      if (meter.eggs && meter.eggs.length) {
        eggs = getSelectedMetersAndIgnoreChildrenWhenIsChecked(
          meter.eggs,
          checkedMeters,
          'egg'
        );
      }
      selectedMeters = [...selectedMeters, ...groupings, ...eggs];
    } else {
      selectedMeters.push(meter);
    }
  }
  return selectedMeters;
};

const { TreeNode } = Tree;

const hasArrayOf = (obj, prop) => obj[prop] && obj[prop].length;

class MetersTree extends Component {
  onSelect = (
    checked,
    {
      node: {
        props: { dataRef },
      },
    }
  ) => {
    if (!this.props.onChange) {
      return;
    }
    this.handleOnChange(dataRef);
  };

  onCheck = (
    checked,
    {
      node: {
        props: { dataRef },
      },
    }
  ) => {
    this.handleOnChange(dataRef);
  };

  handleOnChange(meter) {
    const { onChange, meterTree } = this.props;
    let { checkedMeters } = this.props;
    if (!onChange) {
      return;
    }
    checkedMeters = checkedMeters || [];
    const index = checkedMeters.findIndex((checkedMeter) =>
      checkedMeter.id === meter.id &&
        checkedMeter.className === meter.className);
    checkedMeters =
      index === -1
        ? checkedMeters.concat(meter)
        : [...checkedMeters.slice(0, index), ...checkedMeters.slice(index + 1)];
    checkedMeters = getSelectedMetersAndIgnoreChildrenWhenIsChecked(
      meterTree,
      checkedMeters
    );
    onChange(checkedMeters, meter, !!index);
  }

  isCheckable = () => !!this.props.checkedMeters;

  renderTreeNodes = (meterTree, type, _disabled = false) => {
    const { checkedMeters } = this.props;
    const disabled = _disabled;
    const isCheckable = this.isCheckable();

    return meterTree.map((meter) => {
      const treeNodeProps = {
        title: meter.name || meter.tradename,
        key: generateKeyForMeter(meter),
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
        if (isCheckable && meterIsChecked(meter, checkedMeters)) {
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

  render() {
    const { meterTree, checkedMeters } = this.props;
    if (meterTree.length) {
      const treeProps = {
        checkable: true,
        defaultExpandAll: true,
        checkStrictly: true,
        checkedKeys: checkedMeters.map((meter) => generateKeyForMeter(meter)),
        onSelect: this.onSelect,
        onCheck: this.onCheck,
      };
      return (
        <Tree {...treeProps}>{this.renderTreeNodes(meterTree, 'branch')}</Tree>
      );
    }
    return <Loading />;
  }
}

MetersTree.propTypes = {
  meterTree: PropTypes.array.isRequired,
  checkedMeters: PropTypes.array,
  onChange: PropTypes.func,
};
MetersTree.defaultProps = {
  checkedMeters: [],
  onChange: () => {},
};

export default MetersTree;
