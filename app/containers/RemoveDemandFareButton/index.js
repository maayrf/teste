/**
 *
 * RemoveDemandFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeDemandFareForm } from '../DemandFareFormContainer/actions';
import './style.less';
import ModalButton from '../../components/ModalButton/index';
import DatesInterval from '../../components/DatesInterval/index';
import { makeSelectDemandFareLoading } from '../DemandFareFormContainer/selectors';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';
import openNotificationWithIcon from '../../utils/antd-notification';

class RemoveDemandFareButton extends Component {
  state = {
    visible: false,
  };

  onSuccess = () => {
    this.props.onSuccess();
  };

  onSubmit = () => {
    const { fare } = this.props;
    const { onSuccess } = this;
    this.props
      .removeDemandFareForm(fare.id)
      .then((id) => {
        onSuccess();
        openNotificationWithIcon(
          'success',
          `Tarifa ${id} de demanda contratada deletada com sucesso!`
        );
      })
      .catch((error) => {
        openNotificationWithIcon('error', error);
      });
  };

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { visible } = this.state;
    const { fare } = this.props;
    const { toggleModal } = this;

    return (
      <ModalButton
        buttonLabel="Remover"
        visible={visible}
        onCancel={toggleModal}
        onOpen={toggleModal}
        width={400}
        type="default"
        size="small"
      >
        <h3 className="title-header">
          <span>Remover Tarifa de Demanda Contratada</span>
        </h3>
        <p>
          Deseja remover a tarifa de Demanda Contratada{' '}
          <DatesInterval startDate={fare.startDate} endDate={fare.endDate} />?
        </p>
        <Row type="flex" justify="end" gutter={16}>
          <Col>
            <Button onClick={toggleModal}>Cancelar</Button>
          </Col>
          <Col>
            <Button
              onClick={() => this.onSubmit()}
              type="danger"
              loading={this.props.loading}
            >
              Remover
            </Button>
          </Col>
        </Row>
      </ModalButton>
    );
  }
}

RemoveDemandFareButton.defaultProps = {
  onSuccess: () => {},
};

RemoveDemandFareButton.propTypes = {
  fare: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  removeDemandFareForm: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDemandFareLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  removeDemandFareForm: dispatchWithPromise(dispatch, removeDemandFareForm),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RemoveDemandFareButton);
