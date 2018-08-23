/**
 *
 * AlertsEmittedTab
 *
 */

import React, { Component } from 'react';
import './style.less';
import AlertsEmittedListContainer from '../../containers/AlertsEmittedListContainer';
import AlertEmittedFilterForm from '../../components/AlertsEmittedList/components/AlertEmittedFilterForm/index';

class AlertsEmittedTab extends Component {
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
      <div className="alerts-emitted-tab">
        <h2>Alertas Emitidos</h2>
        <AlertEmittedFilterForm onSubmit={this.handleSubmit} />
        <AlertsEmittedListContainer
          filter={filter}
          handleSelectedRows={this.handleSelectedRows}
        />
      </div>
    );
  }
}

AlertsEmittedTab.propTypes = {};

export default AlertsEmittedTab;
