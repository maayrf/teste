/**
 *
 * Company Page
 *
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Card } from 'antd';
import CompanyListContainer from '../CompanyListContainer';
import './style.less';

class CompanyPage extends Component {
  renderHead = () => (
    <Helmet>
      <title>Empresas - CUBi Energia</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    return (
      <div className="company-page">
        {renderHead()}
        <h1 className="_page-title">Empresas</h1>
        <Card>
          <CompanyListContainer />
        </Card>
      </div>
    );
  }
}
export default CompanyPage;
