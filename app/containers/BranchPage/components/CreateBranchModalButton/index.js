/**
 *
 * CreateBranchModalButton
 *
 */

import React, { Component } from 'react';
import './style.less';
import ModalButton from '../../../../components/ModalButton';
import BranchGeneralInformationContainer from '../../../BranchGeneralInformationFormContainer';

class CreateBranchModalButton extends Component {
  state = {
    visible: false,
  };
  openModal = () => this.setState({ visible: true });
  cancelModal = () => this.setState({ visible: false });
  render() {
    const { visible } = this.state;
    return (
      <div className="register-company-modal">
        <ModalButton
          visible={visible}
          onCancel={this.cancelModal}
          onOpen={this.openModal}
          buttonLabel="Cadastrar Unidade"
          type="primary"
          width={700}
          footer={null}
        >
          <BranchGeneralInformationContainer
            onSuccess={this.cancelModal}
            onCancel={this.cancelModal}
          />
        </ModalButton>
      </div>
    );
  }
}

export default CreateBranchModalButton;
