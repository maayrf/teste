/**
 *
 * CreateWorkingHoursButtonModal
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../../components/ModalButton/index';
import WorkingHoursFormContainer from '../WorkingHoursFormContainer';
class CreateWorkingHoursButtonModal extends Component {
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
    const { buttonType, workingHours, ...restProps } = this.props;
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

CreateWorkingHoursButtonModal.propTypes = {
  workingHours: PropTypes.object.isRequired, // egg or branch
  buttonType: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
};

export default CreateWorkingHoursButtonModal;
