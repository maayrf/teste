/**
 *
 * Users Page
 *
 */
import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { Helmet } from 'react-helmet';

import UserCreateModalButton from '../../components/UserCreateModalButton';
import UserListContainer from '../UserListContainer';
import UserRemoveModalButton from '../../components/UserRemoveModalButton';
import UserEditModalButton from '../../components/UserEditModalButton/index';

class UsersPage extends Component {
  actionColumn = (myUser) => (
    <Row type="flex" justify="end" gutter={16}>
      <Col>
        <UserEditModalButton user={myUser} />
      </Col>
      <Col>
        <UserRemoveModalButton user={myUser} type="danger" />
      </Col>
    </Row>
  );
  renderHead = () => (
    <Helmet>
      <title>Usuários - CUBi Energia</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    return (
      <div>
        {renderHead()}
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          className="_margin-bottom"
        >
          <h1 className="_page-title">Usuários</h1>
          <UserCreateModalButton />
        </Row>
        <Card>
          <UserListContainer actionColumn={this.actionColumn} />
        </Card>
      </div>
    );
  }
}

export default UsersPage;
