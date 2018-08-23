/**
 *
 * AddConsumptionFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import DemandExceedFareFormContainer from '../../containers/DemandExceedFareFormContainer';
import './style.less';

class AddDemandExceedFareButton extends Component {
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
      <div className="add-demand-exceed-fare-button">
        <ModalButton
          buttonLabel={title}
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="primary"
          size="small"
        >
          <h3>{title}</h3>
          <DemandExceedFareFormContainer {...this.props} onCancel={onCancel} />
        </ModalButton>
      </div>
    );
  }
}

AddDemandExceedFareButton.defaultProps = {
  onSuccess: () => {},
};

AddDemandExceedFareButton.propTypes = {
  onSuccess: PropTypes.func,
  demandExceedFare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number.isRequired,
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

export default AddDemandExceedFareButton;
