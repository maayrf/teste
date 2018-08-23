/**
 *
 * Alerts Configuration Page
 *
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AlertConfigurationEditScreen from '../AlertConfigurationEditScreen/index';
import AlertConfigurationRegisterScreen from '../AlertConfigurationRegisterScreen/index';
import AlertConfigurationListScreen from '../AlertConfigurationScreen/index';

class AlertsConfigurationTab extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="alerts-configuration-page">
        <Route
          path={`${match.url}/cadastrar`}
          component={AlertConfigurationRegisterScreen}
        />
        <Route
          exact
          path={`${match.url}/`}
          component={AlertConfigurationListScreen}
        />
        <Route
          exact
          path={`${match.url}/:id/editar`}
          component={AlertConfigurationEditScreen}
        />
      </div>
    );
  }
}

export default AlertsConfigurationTab;
