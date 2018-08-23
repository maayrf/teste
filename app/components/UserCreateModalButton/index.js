/**
 *
 * UserCreateModalButton
 *
 */

import React, { Component } from 'react';
import { Icon } from 'antd';
import ModalButton from '../ModalButton/index';
import UserFormContainer from '../../containers/UserFormContainer';

class UserCreateModalButton extends Component {
  state = {
    visible: false,
  };
  onCancel = () => this.setState({ visible: false });
  onOpen = () => this.setState({ visible: true });
  render() {
    const { visible } = this.state;
    return (
      <div className="my-users-create-button">
        <ModalButton
          type="primary"
          buttonLabel={
            <span>
              <Icon type="plus" /> Adicionar usuário
            </span>
          }
          visible={visible}
          onCancel={this.onCancel}
          onOpen={this.onOpen}
        >
          <h3>Adicionar Usuário</h3>
          <UserFormContainer
            onCancel={this.onCancel}
            onSuccess={this.onCancel}
          />
        </ModalButton>
      </div>
    );
  }
}

export default UserCreateModalButton;
