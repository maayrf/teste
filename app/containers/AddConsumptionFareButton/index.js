/**
 *
 * AddConsumptionFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import ConsumptionFareFormContainer from '../../containers/ConsumptionFareFormContainer';
import './style.less';

class AddConsumptionFareButton extends Component {
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
    const title = 'Cadastrar Nova Tarifa';
    return (
      <div className="add-consumption-fare-button">
        <ModalButton
          buttonLabel={title}
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="primary"
          size="small"
        >
          <h3>{title}</h3>
          <ConsumptionFareFormContainer {...this.props} onCancel={onCancel} />
        </ModalButton>
      </div>
    );
  }
}

AddConsumptionFareButton.propTypes = {
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
  }),
};

export default AddConsumptionFareButton;
