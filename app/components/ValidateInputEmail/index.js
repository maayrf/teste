/**
 *
 * ValidateInputEmail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'antd';
import './style.less';

const showMessage = (availableEmail) => {
  if (!availableEmail.success) {
    return (
      <span className="message-email -invalid">{availableEmail.error}</span>
    );
  }
  return <span className="message-email -valid">E-mail válido!</span>;
};

const ValidateInputEmail = ({
  availableEmail,
  loading,
  verified,
  ...restProps
}) => (
  <div className="validate-input-email">
    <Input {...restProps} />
    {loading && <Icon type="loading" />}
    {!loading && verified && showMessage(availableEmail)}
  </div>
);

ValidateInputEmail.propTypes = {
  availableEmail: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  verified: PropTypes.bool,
};

export default ValidateInputEmail;
