/**
 *
 * UserRemoveModalButtonContent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Icon, Row } from 'antd';
import './style.less';

const ModalButtonContent = ({
  user, onSubmit, onCancel, loading,
}) => (
  <div className="modal-button-content">
    <h3 className="title-header">
      <Icon type="question-circle" />
      <span>Remover Usuário</span>
    </h3>
    <p>
      Deseja remover <strong>{user.name}</strong>?
    </p>
    <Row type="flex" justify="end" gutter={16}>
      <Col>
        <Button onClick={onCancel}>Cancelar</Button>
      </Col>
      <Col>
        <Button
          onClick={() => onSubmit(user.id)}
          type="danger"
          loading={loading}
        >
          Remover
        </Button>
      </Col>
    </Row>
  </div>
);

ModalButtonContent.propTypes = {
  user: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalButtonContent;
