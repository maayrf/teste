/**
 *
 * EditConsumptionFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import ConsumptionFareFormContainerWithLoad from '../../containers/ConsumptionFareFormContainerWithLoad';
import './style.less';
import DatesInterval from '../../components/DatesInterval/index';

class EditConsumptionFareButton extends Component {
  state = {
    visible: false,
  };

  onSuccess = () => {
    this.toggleModal();
    this.props.onSuccess();
  };

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { toggleModal } = this;
    const { visible } = this.state;
    const { consumptionFare } = this.props;

    const { startDate, endDate } = consumptionFare;

    const title = (
      <span>
        Editar a Tarifa de Consumo{' '}
        <DatesInterval startDate={startDate} endDate={endDate} />
      </span>
    );
    return (
      <div>
        <ModalButton
          buttonLabel="Editar"
          visible={visible}
          onCancel={toggleModal}
          onOpen={toggleModal}
          type="default"
          size="small"
        >
          <h3>{title}</h3>
          <ConsumptionFareFormContainerWithLoad
            consumptionFareId={consumptionFare.id}
            onSuccess={this.onSuccess}
            onCancel={toggleModal}
            {...this.props}
          />
        </ModalButton>
      </div>
    );
  }
}

EditConsumptionFareButton.defaultProps = {
  onSuccess: () => {},
};

EditConsumptionFareButton.propTypes = {
  onSuccess: PropTypes.func,
  consumptionFare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number,
      tradeName: PropTypes.string,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    className: PropTypes.string,
    consumptionUnit: PropTypes.string,
    timeZone: PropTypes.string,
    rushStartTime: PropTypes.object,
    rushEndTime: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
  }).isRequired,
};

export default EditConsumptionFareButton;
