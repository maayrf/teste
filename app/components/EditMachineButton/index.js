/**
 *
 * EditMachineButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ModalButton from '../ModalButton';
import MachineFormContainerWithLoad from '../../containers/MachineFormContainerWithLoad';

class EditMachineButton extends Component {
  state = {
    visible: false,
  };
  onOpen = () => {
    this.setState({
      visible: true,
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { onOpen, onCancel } = this;
    const { machineId } = this.props;
    const { visible } = this.state;
    const title = `Editar maquina #${machineId}`;
    return (
      <div className="edit-machine-button">
        <ModalButton
          buttonLabel="Editar"
          title={title}
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          icon="edit"
          size="small"
        >
          <MachineFormContainerWithLoad
            machineId={machineId}
            onCancel={onCancel}
          />
        </ModalButton>
      </div>
    );
  }
}

EditMachineButton.propTypes = {
  machineId: PropTypes.number.isRequired,
};

export default EditMachineButton;
