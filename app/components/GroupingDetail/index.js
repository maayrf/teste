/**
 *
 * GroupingDetail
 *
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

class GroupingDetail extends Component {
  render() {
    const { grouping } = this.props;
    if (grouping && grouping.id) {
      return (
        <div className="grouping-detail">
          <h1>Grupo: #ID {grouping.id}</h1>
        </div>
      );
    }
    return <h1> Selecione um grupo válido </h1>;
  }
}

GroupingDetail.propTypes = {
  grouping: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default withRouter(GroupingDetail);
