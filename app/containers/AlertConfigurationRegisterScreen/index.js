import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row } from 'antd';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from '../AlertConfigurationFormContainer/reducer';
import saga from '../AlertConfigurationFormContainer/saga';
import AlertConfigurationFormContainer from '../AlertConfigurationFormContainer';

class AlertConfigurationRegisterScreen extends Component {
  onSuccess = () => {
    const { match } = this.props;
    const url = match.url.replace('cadastrar', '');
    this.props.history.push(url);
  };
  render() {
    const { match } = this.props;
    return (
      <div className="alert-configuration-register-screen">
        <Row type="flex" justify="space-between" gutter={6}>
          <div>
            <h2>Configurações de Alertas - Cadastro</h2>
          </div>
          <div>
            <Link to={`${match.url.replace('cadastrar', '')}`}>
              <Button type="primary">Voltar</Button>
            </Link>
          </div>
        </Row>
        <AlertConfigurationFormContainer onSuccess={this.onSuccess} />
      </div>
    );
  }
}
AlertConfigurationRegisterScreen.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const withReducer = injectReducer({ key: 'alertConfigurationForm', reducer });
const withSaga = injectSaga({ key: 'alertConfigurationForm', saga });
export default compose(withReducer, withSaga)(AlertConfigurationRegisterScreen);
