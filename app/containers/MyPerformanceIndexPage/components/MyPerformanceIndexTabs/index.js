/**
 *
 * MyPerformanceIndexTabs
 *
 */

import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import PerformanceConfigurationListContainer from '../../../../containers/PerformanceConfigurationListContainer';
import './style.less';
import PerformanceReportDateListScreen from '../../../PerformanceReportDateListScreen/index';

const { TabPane } = Tabs;

const PERFORMANCE_INDEX = 'indice-de-performance';
const PERFORMANCE_CONFIGURATION = 'configuracao-de-performance';

class MyPerformanceIndexTabs extends Component {
  componentWillMount() {
    if (this.isRootPath()) {
      this.sendToTheMainTab();
    }
  }
  componentDidUpdate() {
    if (this.isRootPath()) {
      this.sendToTheMainTab();
    }
  }
  onChange = (activeKey) => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/${activeKey}`);
  };
  getActiveKey = () => {
    const { history, match } = this.props;
    return history.location.pathname
      .replace(`${match.path}/`, '')
      .split('/')[0];
  };
  isRootPath = () => {
    const { match, history } = this.props;
    return match.path === history.location.pathname;
  };
  sendToTheMainTab = () => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/${PERFORMANCE_INDEX}`);
  };
  renderTabPanes = () => {
    const tabPanes = [
      {
        title: 'Índice de performance',
        key: PERFORMANCE_INDEX,
        component: PerformanceReportDateListScreen,
      },
      {
        title: 'Configuração de performance',
        key: PERFORMANCE_CONFIGURATION,
        component: PerformanceConfigurationListContainer,
      },
    ];
    const { match } = this.props;
    return tabPanes.map((tabPane) => (
      <TabPane tab={tabPane.title} key={tabPane.key}>
        <Route path={`${match.url}/${tabPane.key}`} {...tabPane} />
      </TabPane>
    ));
  };
  render() {
    const activeKey = this.getActiveKey();
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={activeKey}
        className="my-performance-index-tabs"
      >
        {this.renderTabPanes()}
      </Tabs>
    );
  }
}

MyPerformanceIndexTabs.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};
export default withRouter(MyPerformanceIndexTabs);
