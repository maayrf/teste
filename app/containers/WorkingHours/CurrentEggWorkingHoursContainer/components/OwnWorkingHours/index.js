import React, { Component } from 'react';
import { Checkbox, Modal } from 'antd';
import PropTypes from 'prop-types';
import ModalButton from '../../../../../components/ModalButton/index';
import WorkingHoursFormContainer from '../../../WorkingHoursFormContainer';
export default class OwnWorkingHours extends Component {
  state = {
    modalVisible: false,
  };

  onChangeCheckBox = () => {
    const { workingHours } = this.props;
    const { followBranchWorkingHours } = workingHours;
    if (followBranchWorkingHours) {
      this.toggleModal();
    }
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  renderCreateWorkingHoursModal = () => {
    const { workingHours } = this.props;
    const { modalVisible } = this.state;
    return (
      <Modal
        visible={modalVisible}
        footer={null}
        width="90%"
        onCancel={this.toggleModal}
      >
        <WorkingHoursFormContainer
          meterType="egg"
          onCancel={this.toggleModal}
          workingHours={workingHours}
        />
      </Modal>
    );
  };

  render() {
    const { workingHours } = this.props;
    const { followBranchWorkingHours } = workingHours;
    return (
      <div>
        <Checkbox
          checked={!followBranchWorkingHours}
          onChange={() => this.onChangeCheckBox()}
        >
          Usar horário diferente da unidade
        </Checkbox>
        {this.renderCreateWorkingHoursModal()}
      </div>
    );
  }
}

OwnWorkingHours.propTypes = {
  workingHours: PropTypes.object.isRequired,
};
