/**
 *
 * CompanyLogo
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import UploadLogoButtonModal from './components/UploadLogoButtonModal/index';
import { ROOT_ROLE, USER_ROLE } from '../../utils/constants';

class CompanyLogo extends Component {
  renderLogoButton = () => {
    const { company, role } = this.props;
    if (role === USER_ROLE) {
      return null;
    }
    return (
      <div className="upload-button">
        <UploadLogoButtonModal
          company={company}
          buttonType="primary"
          icon="upload"
          size="default"
          buttonLabel="Novo logo"
          title="Veja como ficará seu logo"
        />
      </div>
    );
  };
  render() {
    const { company, role } = this.props;
    if (role === ROOT_ROLE) return null;
    return (
      <div className="company-logo">
        <img alt="logo da empresa" className="logo" src={company.photo} />
        {this.renderLogoButton()}
      </div>
    );
  }
}

CompanyLogo.propTypes = {
  role: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
};

export default CompanyLogo;
