/**
 *
 * MetersSortableTree
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { withRouter } from 'react-router-dom';
import CreateGroupingButtonModal from '../../containers/CreateGroupingButtonModal/index';
import MoreInfoForSortableTreeItem from '../MoreInfoForSortableTreeItem/index';

import './style.less';

const isSelected = (selectedMeter, meter) => {
  if (selectedMeter === null) {
    return false;
  }
  return (
    selectedMeter &&
    selectedMeter.className === meter.className &&
    selectedMeter.id === meter.id
  );
};
const formatMetersToTree = (metersList, type = 'branch', selectedMeter) => {
  const nodes = [];

  for (let i = 0; i < metersList.length; i += 1) {
    const meter = metersList[i];
    let groupings = [];
    let eggs = [];
    if (meter.groupings && meter.groupings.length) {
      groupings = formatMetersToTree(
        meter.groupings,
        'grouping',
        selectedMeter
      );
    }
    if (meter.eggs && meter.eggs.length) {
      eggs = formatMetersToTree(meter.eggs, 'egg', selectedMeter);
    }
    const selected = isSelected(selectedMeter, meter);
    const node = {
      title: meter.tradename || meter.name,
      expanded: true,
      selected,
      type,
      data: {
        ...meter,
        groupings,
        eggs,
      },
      children: [...groupings, ...eggs],
    };
    nodes.push(node);
  }
  return nodes;
};

const formatMetersToTreeWithPendingMeters = (
  meters,
  pendingMeters,
  selectedMeter
) => {
  const newMeters = [
    {
      title: 'Medidores Ativos',
      type: 'activeMeters',
      expanded: true,
      children: formatMetersToTree(meters, 'branch', selectedMeter),
    },
  ];
  if (pendingMeters) {
    return [
      {
        title: 'Medidores Pendentes',
        type: 'pendingMeters',
        expanded: true,
        children: formatMetersToTree(pendingMeters, 'egg', selectedMeter),
      },
      ...newMeters,
    ];
  }
  return newMeters;
};

class MetersSortableTree extends Component {
  onMoveNode = ({ node, nextParentNode }) => {
    this.props.onChange(node, nextParentNode);
  };

  onChange = () => {};

  getMeterFormattedToTree = (meters, pendingMeters, selectedMeter) =>
    formatMetersToTreeWithPendingMeters(meters, pendingMeters, selectedMeter);

  canDrag = ({ parentNode, node }) => {
    let canDrag = parentNode !== null;
    canDrag = canDrag && node.type !== 'branch';
    return canDrag;
  };

  canDrop = ({ nextParent, node }) => {
    if (nextParent === null) {
      return false;
    }
    if (nextParent.type === 'pendingMeters' && node.type !== 'egg') {
      return false;
    }
    if (nextParent.type === 'activeMeters' && node.type !== 'egg') {
      return false;
    }
    if (nextParent.type === 'activeMeters' && node.type === 'egg') {
      return false;
    }
    if (nextParent.type === 'egg') {
      return false;
    }
    return true;
  };

  handleClick = (node) => {
    if (node.data && !node.selected) {
      this.props.onClick(node.data);
    }
  };
  getSelectedMeter = () => {
    const { match, location } = this.props;
    const [className, id] = location.pathname
      .replace(`${match.url}/`, '')
      .split('/');
    return {
      id: parseInt(id),
      className,
    };
  };
  generateNodeProps = ({ node }) => ({
    className: `node-${node.type} ${node.selected ? 'selected' : ''}`,
    onClick: this.handleClick.bind(this, node),
    buttons: this.renderActionButton(node),
  });
  renderActionButton = (node) => {
    if (node.type === 'grouping') {
      return [
        <MoreInfoForSortableTreeItem
          grouping={{
            id: node.data.id,
            name: node.data.name,
            className: node.data.className,
          }}
        />,
      ];
    } else if (node.type === 'branch') {
      return [
        <CreateGroupingButtonModal
          parentMeter={{ id: node.data.id, className: node.data.className }}
        />,
      ];
    }
    return [];
  };

  render() {
    const { meters, pendingMeters } = this.props;
    const selectedMeter = this.getSelectedMeter();
    const metersFormattedToTree = this.getMeterFormattedToTree(
      meters,
      pendingMeters,
      selectedMeter
    );

    return (
      <div className="meters-sortable-tree" style={{ height: 400 }}>
        <SortableTree
          treeData={metersFormattedToTree}
          generateNodeProps={this.generateNodeProps}
          onChange={this.onChange}
          onMoveNode={this.onMoveNode}
          canDrag={this.canDrag}
          canDrop={this.canDrop}
          theme={FileExplorerTheme}
        />
      </div>
    );
  }
}

MetersSortableTree.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  meters: PropTypes.array.isRequired,
  pendingMeters: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withRouter(MetersSortableTree);
