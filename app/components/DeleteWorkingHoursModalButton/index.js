/**
 *
 * DeleteWorkingHoursModalButton
 *
 */

import React, { Component } from 'react';
import { Alert, Button, Row } from 'antd';
import PropTypes from 'prop-types';
import './style.less';
import ModalButton from '../ModalButton/index';

class DeleteWorkingHoursModalButton extends Component {
  state = {
    visible: false,
  };

  componentDidUpdate(prevProps) {
    const { success } = this.props;
    const { onCancel } = this;

    if (prevProps !== this.props) {
      if (success && success.message) {
        onCancel(); // closes modal
      }
    }
    return null;
  }

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

  onDelete = () => {
    const { workingHours, onDelete } = this.props;
    onDelete(workingHours);
  };

  render() {
    const { onCancel, onOpen } = this;
    const { visible } = this.state;
    const { loading } = this.props;
    return (
      <div className="delete-working-hours-button">
        <ModalButton
          icon="delete"
          buttonLabel="Deletar"
          title="Deletar quadro de horário"
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="default"
        >
          <Alert
            message="Atenção"
            type="warning"
            showIcon
            description="Ao excluir este quadro de horário, pode afetar a visualização de alguns valores, tem certeza que deseja excluir este quadro de horários?"
          />

          <Row type="flex" justify="end">
            <Button onClick={() => this.onCancel()}>Cancelar</Button>
            <Button
              onClick={() => this.onDelete()}
              type="primary"
              loading={loading}
            >
              Deletar
            </Button>
          </Row>
        </ModalButton>
      </div>
    );
  }
}

DeleteWorkingHoursModalButton.propTypes = {
  workingHours: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteWorkingHoursModalButton;
