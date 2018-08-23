/**
 *
 * UserEditModalButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EDIT_USER_LABEL } from '../../utils/constants';
import UserBranchesForm from '../UserBranchesForm/index';
import './style.less';
import ModalButton from '../ModalButton';
import UserFormContainer from '../../containers/UserFormContainer';

class UserEditModalButton extends Component {
  state = {
    visible: false,
  };
  onCancel = () => this.setState({ visible: false });
  onOpen = () => this.setState({ visible: true });
  render() {
    const { user, onSuccess, ...restProps } = this.props;
    const { visible } = this.state;
    return (
      <div className="user-edit-modal-button">
        <ModalButton
          buttonLabel={EDIT_USER_LABEL}
          visible={visible}
          onCancel={this.onCancel}
          onOpen={this.onOpen}
          {...restProps}
        >
          <h2>
            Editar usuário <strong>{user.name}</strong>
          </h2>
          <UserFormContainer
            onCancel={this.onCancel}
            onSuccess={onSuccess}
            user={user}
          />
        </ModalButton>
      </div>
    );
  }
}

UserEditModalButton.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

export default UserEditModalButton;
