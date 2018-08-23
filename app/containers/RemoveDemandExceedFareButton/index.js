/**
 *
 * RemoveDemandExceedFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeDemandExceedFareForm } from '../DemandExceedFareFormContainer/actions';
import './style.less';
import ModalButton from '../../components/ModalButton';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';
import openNotificationWithIcon from '../../utils/antd-notification';
import { makeSelectDemandExceedFareLoading } from '../DemandExceedFareFormContainer/selectors';
import DatesInterval from '../../components/DatesInterval/index';

class RemoveDemandExceedFareButton extends Component {
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
      .removeDemandExceedFareForm(fare.id)
      .then((id) => {
        onSuccess();
        openNotificationWithIcon(
          'success',
          `Tarifa ${id} de ultrapassagem de demanda deletada com sucesso!`
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
          <span>Remover Tarifa de Ultrapassagem de demanda</span>
        </h3>
        <p>
          Deseja remover a tarifa de ultrapassagem de demanda{' '}
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

RemoveDemandExceedFareButton.defaultProps = {
  onSuccess: () => {},
};
RemoveDemandExceedFareButton.propTypes = {
  fare: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  removeDemandExceedFareForm: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDemandExceedFareLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  removeDemandExceedFareForm: dispatchWithPromise(
    dispatch,
    removeDemandExceedFareForm
  ),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RemoveDemandExceedFareButton);
