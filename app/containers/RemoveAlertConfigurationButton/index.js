/**
 *
 * RemoveAlertConfigurationButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import RemoveAlertConfigurationConfirm from '../RemoveAlertConfigurationConfirm';

class RemoveAlertConfigurationButton extends Component {
  state = {
    visible: false,
  };
  onCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onOpen = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const { onCancel, onOpen } = this;
    const { visible } = this.state;
    return (
      <div>
        <ModalButton
          buttonLabel="Deletar"
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="default"
          size="small"
        >
          <RemoveAlertConfigurationConfirm
            {...this.props}
            onCancel={onCancel}
            onSuccess={onCancel}
            onError={onCancel}
          />
        </ModalButton>
      </div>
    );
  }
}

RemoveAlertConfigurationButton.propTypes = {
  registerOnlyPreviousRates: PropTypes.bool,
  onSuccess: PropTypes.func,
  alertConfiguration: PropTypes.object.isRequired,
};

export default RemoveAlertConfigurationButton;
