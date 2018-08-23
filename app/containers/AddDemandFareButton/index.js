/**
 *
 * AddConsumptionFareButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../components/ModalButton/index';
import DemandFareFormContainer from '../../containers/DemandFareFormContainer';
import './style.less';

class AddDemandFareButton extends Component {
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
      <div>
        <ModalButton
          buttonLabel={title}
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="primary"
          size="small"
        >
          <h3>{title}</h3>
          <DemandFareFormContainer {...this.props} onCancel={onCancel} />
        </ModalButton>
      </div>
    );
  }
}

AddDemandFareButton.defaultProps = {
  onSuccess: () => {},
};

AddDemandFareButton.propTypes = {
  onSuccess: PropTypes.func,
  demandFare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number,
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

export default AddDemandFareButton;
