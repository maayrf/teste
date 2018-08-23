/**
 *
 * Branch Meters Container Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import './style.less';
import BranchMeterSortableTreeContainerWithLoad from '../BranchMeterSortableTreeContainerWithLoad';
import MeterDetailWithRouter from '../MeterDetailWithRouter';
const { Sider, Content } = Layout;
class BranchMetersManager extends Component {
  handleChange = () => {};
  handleClick = (selectedMeter) => {
    const { history, match } = this.props;
    let urlToPush = '';
    switch (selectedMeter.className) {
      case 'grouping':
        urlToPush = 'grupo';
        break;
      case 'branch':
        urlToPush = 'unidade';
        break;
      case 'egg':
        urlToPush = 'egg';
        break;
      default:
    }
    history.push(`${match.url}/${urlToPush}/${selectedMeter.id}`);
  };
  render() {
    const { branch } = this.props;
    return (
      <Layout className="branch-meters-manager">
        <Sider width={400} className="sidebar-white">
          <BranchMeterSortableTreeContainerWithLoad
            onClick={this.handleClick}
            onChange={this.handleChange}
            branchId={branch.id}
            filter={{ withEggs: 1 }}
          />
        </Sider>
        <Content>
          <MeterDetailWithRouter />
        </Content>
      </Layout>
    );
  }
}

BranchMetersManager.propTypes = {
  branch: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(BranchMetersManager);
