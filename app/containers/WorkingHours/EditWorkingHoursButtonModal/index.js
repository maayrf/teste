/**
 *
 * EditWorkingHoursButtonModal
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../../components/ModalButton/index';
import WorkingHoursFormContainer from '../WorkingHoursFormContainer/index';
class EditWorkingHoursButtonModal extends Component {
  state = {
    visible: false,
  };
  onOpen = () => {
    this.setState({
      visible: true,
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const {
      buttonType, workingHours, meterId, ...restProps
    } = this.props;
    const { onCancel, onOpen } = this;
    const { visible } = this.state;
    return (
      <div>
        <ModalButton
          width="90%"
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type={buttonType}
          {...restProps}
        >
          <WorkingHoursFormContainer
            onCancel={onCancel}
            workingHours={workingHours}
          />
        </ModalButton>
      </div>
    );
  }
}

EditWorkingHoursButtonModal.propTypes = {
  buttonType: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
  workingHours: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    workingHours: PropTypes.array.isRequired,
  }),
};

export default EditWorkingHoursButtonModal;
