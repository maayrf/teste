/**
 *
 * MachineCreateModalButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ModalButton from '../../../ModalButton';
import MachineFormContainer from '../../../../containers/MachineFormContainer';

class MachineCreateModalButton extends Component {
  state = {
    visible: false,
  };
  openModal = () => this.setState({ visible: true });
  closeModal = () => this.setState({ visible: false });
  render() {
    const { visible } = this.state;
    const { eggId } = this.props;
    return (
      <div className="machine-create-modal-button">
        <ModalButton
          buttonLabel="Cadastrar Máquina"
          visible={visible}
          onCancel={this.closeModal}
          onOpen={this.openModal}
          type="primary"
          size="small"
        >
          <h3>Cadastrar Máquina</h3>
          <MachineFormContainer onCancel={this.closeModal} eggId={eggId} />
        </ModalButton>
      </div>
    );
  }
}

MachineCreateModalButton.propTypes = {
  eggId: PropTypes.number.isRequired,
};

export default MachineCreateModalButton;
