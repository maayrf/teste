/**
 *
 * MyProfileEditModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import UserFormContainer from '../../containers/UserFormContainer';
import MyUserForm from '../MyUserForm';
import './style.less';

const MyProfileEditModal = ({ visible, user, onCancel }) => (
  <div className="my-profile-edit-modal">
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <h2>Editar perfil</h2>
      {visible && (
        <UserFormContainer
          user={user}
          onCancel={onCancel}
          onSuccess={onCancel}
          formComponent={MyUserForm}
          isMyUser
        />
      )}
    </Modal>
  </div>
);

MyProfileEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default MyProfileEditModal;
