/**
 *
 * EditDemandExceedFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import DemandExceedFareFormContainerWithLoad from '../../containers/DemandExceedFareFormContainerWithLoad';
import './style.less';
import DatesInterval from '../../components/DatesInterval/index';

class EditDemandExceedFareButton extends Component {
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
    const { demandExceedFare } = this.props;
    const { startDate, endDate } = demandExceedFare;

    const title = (
      <span>
        Editar a Tarifa de Ultrapassagem de demanda
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
          <DemandExceedFareFormContainerWithLoad
            demandExceedFare={demandExceedFare}
            demandExceedFareId={demandExceedFare.id}
            onSuccess={this.onSuccess}
            onCancel={toggleModal}
          />
        </ModalButton>
      </div>
    );
  }
}

EditDemandExceedFareButton.defaultProps = {
  onSuccess: () => {},
};

EditDemandExceedFareButton.propTypes = {
  onSuccess: PropTypes.func,
  demandExceedFare: PropTypes.shape({
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

export default EditDemandExceedFareButton;
