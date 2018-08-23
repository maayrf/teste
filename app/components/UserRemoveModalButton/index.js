/**
 *
 * UserRemoveModalButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../ModalButton';
import './style.less';
import UserRemoveContainer from '../../containers/UserRemoveContainer';

class UserRemoveModalButton extends Component {
  state = {
    visible: false,
  };
  onOpen = () => this.setState({ visible: true });
  onCancel = () => this.setState({ visible: false });
  render() {
    const {
      user,
      labelButton = 'Remover',
      onSuccess,
      ...restProps
    } = this.props;
    const { visible } = this.state;
    return (
      <div className="user-remove-modal-button">
        <ModalButton
          visible={visible}
          onCancel={this.onCancel}
          onOpen={this.onOpen}
          buttonLabel={labelButton}
          width={400}
          {...restProps}
        >
          <UserRemoveContainer
            user={user}
            onCancel={this.onCancel}
            onSuccess={onSuccess}
          />
        </ModalButton>
      </div>
    );
  }
}

UserRemoveModalButton.propTypes = {
  user: PropTypes.object.isRequired,
  labelButton: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default UserRemoveModalButton;
