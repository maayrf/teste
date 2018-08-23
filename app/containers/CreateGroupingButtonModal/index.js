/**
 *
 * GroupCreateModal
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroupingFormContainer from '../GroupingFormContainer';
import ModalButton from '../../components/ModalButton/index';
import './style.less';

class CreateGroupingButtonModal extends Component {
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
    const { onCancel, onOpen } = this;
    const { visible } = this.state;
    const { parentMeter, wrapperStyle, ...restProps } = this.props;
    return (
      <div
        style={wrapperStyle}
        className="create-grouping-button-modal -show-on-hover"
      >
        <ModalButton
          {...restProps}
          icon="folder-add"
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type="dashed"
          size="small"
        >
          <h3>Cadastrar Grupo</h3>
          <GroupingFormContainer
            grouping={{ parentMeter }}
            onCancel={onCancel}
          />
        </ModalButton>
      </div>
    );
  }
}

CreateGroupingButtonModal.propTypes = {
  buttonLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  parentMeter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateGroupingButtonModal;
