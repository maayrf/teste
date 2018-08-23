/**
 *
 * MeterDetailWithRouter
 *
 */

import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import './style.less';
import EggDetailContainerWithLoad from '../EggDetailContainerWithLoad';

const MeterDetailWithRouter = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/unidade/:id`} render={() => <div />} />
    <Route
      path={`${match.url}/egg/:id`}
      render={({ match: { params } }) => (
        <EggDetailContainerWithLoad eggId={params.id} />
      )}
    />
    <Route path={`${match.url}/grupo/:id`} render={() => <div />} />
    <Route
      render={() => (
        <Row type="flex" justify="center" align="middle">
          <h3>Selecione um medidor</h3>
        </Row>
      )}
    />
  </Switch>
);

MeterDetailWithRouter.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(MeterDetailWithRouter);
