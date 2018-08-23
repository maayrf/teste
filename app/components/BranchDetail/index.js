/**
 *
 * BranchDetail
 *
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

class BranchDetail extends Component {
  render() {
    const { branch } = this.props;
    if (branch && branch.id) {
      return (
        <div className="branch-detail">
          <h1> Unidade: {branch.tradename}</h1>
        </div>
      );
    }
    return <h1> Selecione uma unidade válida </h1>;
  }
}

BranchDetail.propTypes = {
  branch: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.object,
    }),
  }),
};

export default withRouter(BranchDetail);
