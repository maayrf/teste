/**
 *
 * EditDemandFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import DemandFareFormContainerWithLoad from '../../containers/DemandFareFormContainerWithLoad';
import './style.less';
import moment from 'moment/moment';

const FORMART_DATE = 'DD/MM/YYYY';

class EditDemandFareButton extends Component {
  state = {
    visible: false,
  };
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
  render() {
    const { onCancel, onOpen } = this;
    const { visible } = this.state;
    const { demandFare } = this.props;

    const startDate = moment(demandFare.startDate).format(FORMART_DATE);
    const endDate = moment(demandFare.endDate).format(FORMART_DATE);
    const title = (
      <span>
        Editar a Tarifa de demanda contratada no período de:{' '}
        <strong>{startDate}</strong> á <strong>{endDate}</strong>
      </span>
    );
    return (
      <div>
        <ModalButton
          buttonLabel="Editar"
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="default"
          size="small"
        >
          <h3>{title}</h3>
          <DemandFareFormContainerWithLoad
            demandFareId={demandFare.id}
            {...this.props}
            onCancel={onCancel}
          />
        </ModalButton>
      </div>
    );
  }
}

EditDemandFareButton.propTypes = {
  // consumptionFareId: PropTypes.number.isRequired,
  registerOnlyPreviousRates: PropTypes.bool,
  onSuccess: PropTypes.func,
  demandFare: PropTypes.object.isRequired,
};

export default EditDemandFareButton;
