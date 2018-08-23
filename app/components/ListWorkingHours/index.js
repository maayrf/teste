/**
 *
 * ListWorkingHours
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Pagination, Row, Col } from 'antd';
import './style.less';
import WorkingHours from '../WorkingHours/index';
import {
  CURRENT_INDEX,
  NEXT_INDEX,
  PREVIOUS_INDEX,
  separateCurrentPreviousNext,
} from '../../utils/separateCurrentPreviousNext';

class ListWorkingHours extends Component {
  getDataSourceWorkingHours() {
    const { workingHours } = this.props;
    const workingHoursSeparated = separateCurrentPreviousNext(workingHours);
    return workingHoursSeparated.reduce((before, current, index) => {
      let title = '';
      if (current.length) {
        switch (index) {
          case NEXT_INDEX:
            title = 'Quadro de Horários Futuros';
            break;
          case PREVIOUS_INDEX:
            title = 'Quadro de Horários Anteriores';
            break;
          case CURRENT_INDEX:
            title = 'Quadro de Horários Atual';
        }
      }
      return [...before, { type: 'title', title }, ...current];
    }, []);
  }

  render() {
    const dataSource = this.getDataSourceWorkingHours();
    const { loading, renderOnHeader, renderOnErrorBody } = this.props;
    return (
      <div className="list-working-hours">
        <Row type="flex" align="middle" justify="space-between">
          <Col>
            <h2 className="_page-title">Todos os Quadros de Horários</h2>
          </Col>
        </Row>
        <List
          loading={loading}
          dataSource={dataSource}
          renderItem={(titleOrWorkingHours) => {
            switch (titleOrWorkingHours.type) {
              case 'title':
                return (
                  <h3 className="_uppercase _margin-top-big">
                    {titleOrWorkingHours.title}
                  </h3>
                );
              default:
                return (
                  <WorkingHours
                    renderOnErrorBody={renderOnErrorBody}
                    renderOnHeader={renderOnHeader}
                    workingHours={titleOrWorkingHours}
                  />
                );
            }
          }}
        />
      </div>
    );
  }
}

ListWorkingHours.propTypes = {
  loading: PropTypes.bool.isRequired,
  workingHours: PropTypes.array.isRequired,
  renderOnHeader: PropTypes.func,
  renderOnErrorBody: PropTypes.func,
};
ListWorkingHours.defaultProps = {
  renderOnHeader: () => {},
  renderOnErrorBody: () => {},
};

export default ListWorkingHours;
