/**
 *
 * MeterNetworkCreateModalButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../ModalButton';
import MeterNetworkFormContainer from '../../containers/MeterNetworkFormContainer';
import './style.less';

class MeterNetworkCreateModalButton extends Component {
  state = {
    visible: false,
  };
  onCancel = () => this.setState({ visible: false });
  openModal = () => this.setState({ visible: true });
  render() {
    const { visible } = this.state;
    const { meterId, ...restProps } = this.props;
    return (
      <div className="meter-network-create-modal-button">
        <ModalButton
          visible={visible}
          onCancel={this.onCancel}
          onOpen={this.openModal}
          size="small"
          type="primary"
          buttonLabel="Adicionar Configuração de Rede"
          {...restProps}
        >
          <MeterNetworkFormContainer
            meterId={meterId}
            onCancel={this.onCancel}
            onSuccess={this.onCancel}
          />
        </ModalButton>
      </div>
    );
  }
}

MeterNetworkCreateModalButton.propTypes = {
  meterId: PropTypes.number.isRequired,
};

export default MeterNetworkCreateModalButton;
