import React, { Component } from 'react';
import { Button, Row } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlertConfigurationListContainer from '../../containers/AlertConfigurationListContainer';
import RemoveAlertConfigurationButton from '../RemoveAlertConfigurationButton/index';
import AlertConfigurationFilterForm from '../../components/AlertConfigurationList/components/AlertConfigurationFilterForm';

class AlertConfigurationListScreen extends Component {
  state = {
    filter: {},
  };
  handleSubmit = (values) => {
    this.setState({
      filter: values,
    });
  };
  render() {
    const { match } = this.props;
    const { filter } = this.state;
    const baseUrl = match.path.replace('//', '/');
    return (
      <div className="alert-configuration-list-screen">
        <Row type="flex" justify="space-between" gutter={6}>
          <div>
            <h2>Configurações de Alertas</h2>
          </div>
          <div>
            <Link to={`${baseUrl}cadastrar`}>
              <Button type="primary">Cadastrar Novo Alerta</Button>
            </Link>
          </div>
        </Row>
        <AlertConfigurationFilterForm onSubmit={this.handleSubmit} />
        <AlertConfigurationListContainer
          filter={filter}
          actionColumn={(actionConfiguration) => (
            <Row type="flex" gutter={6}>
              <div>
                <Link to={`${baseUrl}${actionConfiguration.id}/editar`}>
                  <Button size="small">Editar</Button>
                </Link>
              </div>
              <div>
                <RemoveAlertConfigurationButton
                  alertConfiguration={actionConfiguration}
                />
              </div>
            </Row>
          )}
        />
      </div>
    );
  }
}
AlertConfigurationListScreen.propTypes = {
  match: PropTypes.object.isRequired,
};
export default AlertConfigurationListScreen;
