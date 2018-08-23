/**
 *
 * UploadLogoButtonModal
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalButton from '../../../ModalButton/index';
import UploadLogoForm from '../UploadLogoForm/index';
import CompanyInfoFormContainer from '../../../../containers/CompanyInfoFormContainer/index';
class UploadLogoButtonModal extends Component {
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
    const { buttonType, company, ...restProps } = this.props;
    const { onCancel, onOpen } = this;
    const { visible } = this.state;
    return (
      <div>
        <ModalButton
          visible={visible}
          onCancel={onCancel}
          onOpen={onOpen}
          type={buttonType}
          {...restProps}
        >
          <CompanyInfoFormContainer
            companyInfo={company}
            onCancel={onCancel}
            formToRender={UploadLogoForm}
          />
        </ModalButton>
      </div>
    );
  }
}

UploadLogoButtonModal.propTypes = {
  company: PropTypes.object,
  buttonType: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
};

export default UploadLogoButtonModal;
