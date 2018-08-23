/**
 *
 * DisableFareModalButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../ModalButton';
import DisableFareForm from '../DisableFareForm';
import './style.less';

class DisableFareModalButton extends Component {
  render() {
    const {
      fareData,
      title,
      onSubmit,
      onOpen,
      onCancel,
      visible,
      ...restProps
    } = this.props;
    const disabled = !!fareData;
    return (
      <div className="disable-demand-exceed-fare-button">
        <ModalButton
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          title={title}
          buttonLabel={title}
          size="small"
          disabled={!disabled}
        >
          <DisableFareForm
            fareData={fareData}
            onCancel={onCancel}
            onSubmit={onSubmit}
            {...restProps}
          />
        </ModalButton>
      </div>
    );
  }
}

DisableFareModalButton.propTypes = {
  fareData: PropTypes.object,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DisableFareModalButton;
