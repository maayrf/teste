/* eslint-disable react/prop-types,react/no-unused-prop-types */
/**
 *
 * MoreInfoForSortableTreeItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Menu } from 'antd';
import './style.less';
import CreateGroupingButtonModal from '../../containers/CreateGroupingButtonModal';
import RemoveGroupingContainer from '../../containers/RemoveGroupingButtonConfirmContainer/loadable';

const MenuItem = Menu.Item;
const wrapperStyle = { margin: '-5px -12px' };
const style = {
  borderRadius: 0,
  background: 'none',
  border: 'none',
  width: '100%',
  outline: 'none',
  textAlign: 'left',
};

const renderMenu = ({ grouping: { id, name, className } }) => (
  <Menu>
    <MenuItem>
      <CreateGroupingButtonModal
        buttonLabel="Cadastrar"
        parentMeter={{ id, className }}
        wrapperStyle={wrapperStyle}
        style={style}
      />
    </MenuItem>
    <MenuItem>
      <RemoveGroupingContainer
        grouping={{ id, name }}
        wrapperStyle={wrapperStyle}
        style={style}
        size="small"
      />
    </MenuItem>
  </Menu>
);

const MoreInfoForSortableTreeItem = (props) => (
  <div className="more-info-for-sortable-tree-item  -show-on-hover">
    <Dropdown overlay={renderMenu(props)}>
      <Button icon="ellipsis" type="dashed" size="small" />
    </Dropdown>
  </div>
);

MoreInfoForSortableTreeItem.propTypes = {
  grouping: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
};

export default MoreInfoForSortableTreeItem;
