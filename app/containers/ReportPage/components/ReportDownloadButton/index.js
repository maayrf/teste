/* eslint-disable no-shadow */
/**
 *
 * ReportCreateButton
 *
 */

import React, { Component } from 'react';
import { Button, Icon, notification } from 'antd';
import PropTypes from 'prop-types';

class ReportDownloadButton extends Component {
  showNotification = () => {
    const { report } = this.props;
    notification.open({
      message: (
        <span>
          Baixando o arquivo: <strong>{report.name}</strong>
        </span>
      ),
      description: 'Em instantes o download será iniciado',
      icon: <Icon type="download" style={{ color: '#0f0' }} />,
      duration: 0,
      placement: 'bottomLeft',
    });
  };
  render() {
    const { report } = this.props;
    return (
      <span className="report-create-button">
        <Button
          type="primary"
          href={report.download}
          onClick={this.showNotification}
        >
          Baixar
        </Button>
      </span>
    );
  }
}
ReportDownloadButton.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportDownloadButton;
