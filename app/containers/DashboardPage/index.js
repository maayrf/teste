/**
 *
 * Dashboard Page
 *
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';
import './style.less';
import DashboardFilter from './components/DashboardFilter';
import DashboardContainer from '../../containers/DashboardContainer';
import { withLoginUser } from '../../utils/withLoginUser';

class DashboardPage extends Component {
  state = {
    filter: {
      companyId: null,
      branchId: null,
      monthAndYear: null,
    },
  };
  componentDidMount() {
    const { user } = this.props;
    this.setState({
      filter: {
        ...this.state.filter,
        ...user.dashboardHistory,
        monthAndYear: moment(),
      },
    });
  }
  onFilterUpdate = (filter) => {
    this.setState({
      filter,
    });
  };
  renderHead = () => (
    <Helmet>
      <title>Dashboard - CUBi Energia</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    const { user } = this.props;
    const { monthAndYear, branchId } = this.state.filter;

    const month = monthAndYear ? monthAndYear.month() + 1 : null;
    const year = monthAndYear ? monthAndYear.year() : null;

    return (
      <div className="dashboard-page">
        {renderHead()}
        <Row
          type="flex"
          align="bottom"
          justify="center"
          className="_margin-bottom"
        >
          <h1>DASHBOARD</h1>
          <Col>
            <DashboardFilter
              filter={this.state.filter}
              onFilterUpdate={this.onFilterUpdate}
              currentUser={user}
            />
          </Col>
        </Row>
        <div>
          <DashboardContainer branchId={branchId} month={month} year={year} />
        </div>
      </div>
    );
  }
}
DashboardPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default compose(withLoginUser)(DashboardPage);
