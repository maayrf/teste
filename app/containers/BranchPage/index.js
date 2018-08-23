/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Branch Page
 *
 */
import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import CreateBranchModalButton from './components/CreateBranchModalButton';
import BranchListContainer from '../BranchListContainer';
import { BRANCHES_URL } from '../../utils/constants';

class BranchPage extends Component {
  actionColumn = (branch) => (
    <Row type="flex" justify="end">
      <Link to={`${BRANCHES_URL}/${branch.id}/informacoes-gerais`}>
        <Button>Ver Detalhes</Button>
      </Link>
    </Row>
  );
  renderHead = () => (
    <Helmet>
      <title>Unidades - CUBi Energia</title>
    </Helmet>
  );
  render() {
    const { renderHead, actionColumn } = this;
    return (
      <div>
        {renderHead()}
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <h1 className="_page-title">Unidades</h1>
          </Col>
          <Col>
            <CreateBranchModalButton onSubmit={this.onSubmit} />
          </Col>
        </Row>
        <div className="_margin-top">
          <Card className="_margin-top">
            <BranchListContainer actionColumn={actionColumn} />
          </Card>
        </div>
      </div>
    );
  }
}

export default BranchPage;
