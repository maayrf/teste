/**
 *
 * MeterDetail
 *
 */

import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';
import BranchDetail from '../../components/BranchDetail';
import EggDetailContainerWithLoad from '../../containers/EggDetailContainerWithLoad';
import GroupingDetail from '../../components/GroupingDetail';

// TODO: Check if its being used
class MeterDetail extends Component {
  render() {
    const { meter, match } = this.props;
    return (
      <div className="meter-detail">
        <Switch>
          <Route
            path={`${match.url}/unidade/:id`}
            render={() => <BranchDetail branch={meter} />}
          />
          <Route
            path={`${match.url}/egg/:id`}
            render={({ match: { params } }) => (
              <EggDetailContainerWithLoad eggId={params.id} />
            )}
          />
          <Route
            path={`${match.url}/grupo/:id`}
            render={() => <GroupingDetail grouping={meter} />}
          />
          <Route render={() => <div> Selecione um medidor </div>} />
        </Switch>
      </div>
    );
  }
}

MeterDetail.propTypes = {
  match: PropTypes.object.isRequired,
  meter: PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default withRouter(MeterDetail);
