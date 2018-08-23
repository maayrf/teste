/**
 *
 * RemoveFareModalButton
 *
 */

import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.less';
import { removeConsumptionFareForm } from '../ConsumptionFareFormContainer/actions';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';
import openNotificationWithIcon from '../../utils/antd-notification';

class RemoveFareModalButton extends Component {
  onDelete = () => {
    const { fare, onSuccess } = this.props;
    this.props
      .removeConsumptionFareForm(fare.id)
      .then((id) => {
        openNotificationWithIcon(
          'success',
          `Tarifa ${id} deletada com sucesso!`
        );
        onSuccess();
      })
      .catch((error) => {
        openNotificationWithIcon('error', error);
      });
  };
  confirmRemove = () => {
    Modal.confirm({
      title: 'Atenção',
      content: 'Tem certeza que deseja remover a tarifa?',
      okText: 'Remover',
      cancelText: 'Cancelar',
      onOk: () => this.onDelete(),
      onCancel: () => {},
    });
  };
  render() {
    return (
      <div>
        <Button size="small" onClick={() => this.confirmRemove()}>
          Remover
        </Button>
      </div>
    );
  }
}

RemoveFareModalButton.defaultProps = {
  onSuccess: () => {},
};

RemoveFareModalButton.propTypes = {
  fare: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  removeConsumptionFareForm: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  removeConsumptionFareForm: dispatchWithPromise(
    dispatch,
    removeConsumptionFareForm
  ),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RemoveFareModalButton);
