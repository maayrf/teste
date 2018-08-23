/**
 *
 * ModalButtonConfirm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import './style.less';

const { confirm } = Modal;

const modalConfirm = (onSubmit, modalProps) => {
  confirm({
    ...modalProps,
    onOk: onSubmit,
  });
};

const ModalButtonConfirm = ({
  loading,
  buttonLabel,
  onSubmit,
  buttonProps,
  modalProps,
}) => (
  <div className="modal-button-confirm">
    <Button
      type="danger"
      onClick={() => modalConfirm(onSubmit, modalProps)}
      loading={loading}
      {...buttonProps}
    >
      {buttonLabel}
    </Button>
  </div>
);

ModalButtonConfirm.propTypes = {
  modalProps: {
    title: 'Confirme sua ação!',
    okText: 'Confirmar',
  },
};

ModalButtonConfirm.propTypes = {
  loading: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  report: PropTypes.object.isRequired,
  buttonProps: PropTypes.object,
  modalProps: PropTypes.object,
};

export default ModalButtonConfirm;
