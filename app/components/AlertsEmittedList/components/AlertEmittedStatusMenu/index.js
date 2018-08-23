/**
 *
 * AlertEmittedStatusMenu
 *
 */

import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { resolveAlertKey, unsolveAlertKey } from '../../constants';
const MenuItem = Menu.Item;

class AlertEmittedStatusMenu extends Component {
  selectedAlertsMessage = (selectedRows) => {
    if (selectedRows.length === 1) {
      return `${selectedRows.length} alerta selecionado`;
    }
    return `${selectedRows.length} alertas selecionados`;
  };

  renderMenu = () => (
    <Menu onClick={this.props.handleMenuClick}>
      <MenuItem key={resolveAlertKey}>Marcar como resolvido</MenuItem>
      <MenuItem key={unsolveAlertKey}>
        Marcar como <strong>não</strong> resolvido
      </MenuItem>
    </Menu>
  );
  render() {
    const { selectedRows } = this.props;
    const hasSelected = selectedRows.length > 0;
    const menu = this.renderMenu();
    const disabled = !(selectedRows && selectedRows.length > 0);
    return (
      <div style={{ marginBottom: 16 }}>
        <Dropdown disabled={disabled} overlay={menu}>
          <Button>
            Marcar <Icon type="down" />
          </Button>
        </Dropdown>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? this.selectedAlertsMessage(selectedRows) : ''}
        </span>
      </div>
    );
  }
}

AlertEmittedStatusMenu.propTypes = {
  selectedRows: PropTypes.array.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default AlertEmittedStatusMenu;
