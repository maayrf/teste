/**
 *
 * MachineListManagement
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import './style.less';
import MachineList from '../MachineList';
import EditMachineButton from '../EditMachineButton';
import MachineCreateModalButton from './components/MachineCreateModalButton';

class MachineListManagement extends Component {
  actionColumn = (text, machine) => (
    <span>
      <EditMachineButton machineId={machine.id} />
    </span>
  );
  render() {
    const { actionColumn } = this;
    const { machines, eggId } = this.props;
    return (
      <div className="machine-list-management _margin-bottom _padding-bottom _border-bottom">
        <Row type="flex" justify="space-between" className="_margin-bottom">
          <Col>
            <h2 className="_page-title">Máquinas</h2>
          </Col>
          <Col>
            <MachineCreateModalButton eggId={eggId} />
          </Col>
        </Row>
        <MachineList actionColumn={actionColumn} machines={machines} />
      </div>
    );
  }
}

MachineListManagement.propTypes = {
  machines: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    maker: PropTypes.string,
    nominalVoltage: PropTypes.number,
    ratedCurrent: PropTypes.number,
    comments: PropTypes.string,
  })),
  eggId: PropTypes.number.isRequired,
};

export default MachineListManagement;
