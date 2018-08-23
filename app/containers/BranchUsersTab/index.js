/**
 *
 * BranchUsersTab
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { compose } from 'redux';
import UserListContainer from '../UserListContainer';
import UserRemoveModalButton from '../../components/UserRemoveModalButton';
import './style.less';
import UserEditModalButton from '../../components/UserEditModalButton/index';
import { withLoginUser } from '../../utils/withLoginUser';

class BranchUsersTab extends Component {
  actionColumn = (user) => {
    const currentUser = this.props.user;
    if (currentUser.role !== 'user') {
      return (
        <Row type="flex" justify="end" gutter={16}>
          <Col>
            <UserEditModalButton user={user} />
          </Col>
          <Col>
            <UserRemoveModalButton user={user} type="danger" />
          </Col>
        </Row>
      );
    }
  };
  render() {
    const { branch } = this.props;
    return (
      <div className="branch-users-tab">
        <h3>Usuários reponsáveis</h3>
        <UserListContainer
          filter={{ searchBranchId: branch.id }}
          actionColumn={this.actionColumn}
        />
      </div>
    );
  }
}

BranchUsersTab.propTypes = {
  branch: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default compose(withLoginUser)(BranchUsersTab);
