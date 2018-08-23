import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row } from 'antd';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from '../AlertConfigurationFormContainer/reducer';
import saga from '../AlertConfigurationFormContainer/saga';
import alertConfigurationDetailReducer from '../AlertConfigurationDetailHOC/reducer';
import alertConfigurationDetailSaga from '../AlertConfigurationDetailHOC/saga';
import AlertConfigurationFormContainerWithLoad from '../AlertConfigurationFormContainerWithLoad';

class AlertConfigurationEditScreen extends Component {
  onSuccess = () => {
    const { match } = this.props;
    const url = match.url.replace(/\d+\/editar/gi, '');
    this.props.history.push(url);
  };
  render() {
    const { match } = this.props;
    const alertConfigurationId = parseInt(match.params.id);
    return (
      <div className="alert-configuration-register-screen">
        <Row type="flex" justify="space-between" gutter={6}>
          <div />
          <div>
            <Link to={`${match.url.replace(/\d+\/editar/gi, '')}`}>
              <Button type="primary">Voltar</Button>
            </Link>
          </div>
        </Row>
        <AlertConfigurationFormContainerWithLoad
          alertConfigurationId={alertConfigurationId}
          onSuccess={this.onSuccess}
        />
      </div>
    );
  }
}
AlertConfigurationEditScreen.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
const withAlertConfigurationDetailReducer = injectReducer({
  key: 'alertConfiguration',
  reducer: alertConfigurationDetailReducer,
});
const withAlertConfigurationDetailSaga = injectSaga({
  key: 'alertConfiguration',
  saga: alertConfigurationDetailSaga,
});
const withReducer = injectReducer({ key: 'alertConfigurationForm', reducer });
const withSaga = injectSaga({ key: 'alertConfigurationForm', saga });

export default compose(
  withReducer,
  withSaga,
  withAlertConfigurationDetailReducer,
  withAlertConfigurationDetailSaga
)(AlertConfigurationEditScreen);
