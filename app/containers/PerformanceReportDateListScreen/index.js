import React, { Component } from 'react';
import KpiReportDateListContainer from '../KpiReportDateListContainer';
import KpiReportFilterForm from '../../components/KpiReportList/components/KpiReportFilterForm';

class PerformanceReportDateListScreen extends Component {
  state = {
    filter: {},
  };
  handleSubmit = (values) => {
    this.setState({
      filter: values,
    });
  };
  render() {
    const { filter } = this.state;
    return (
      <div className="alert-configuration-list-screen">
        <h2>Relatórios de Performance</h2>
        <KpiReportFilterForm onSubmit={this.handleSubmit} />
        <KpiReportDateListContainer filter={filter} />
      </div>
    );
  }
}
export default PerformanceReportDateListScreen;
