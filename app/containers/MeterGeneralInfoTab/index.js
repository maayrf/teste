/**
 *
 * MeterGeneralInfoTab
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './style.less';
import EggDetailGeneralInformation from '../../components/EggDetail/components/EggDetailGeneralInformation/index';
import WorkingHours from '../../components/WorkingHours';
import MachineListManagement from '../../components/MachineListManagement';
import UseCustomWorkingHourOnEggCheckboxContainer from '../UseCustomWorkingHourCheckboxContainer';
import MeterNetworkConfiguration from '../../components/MeterNetworkConfiguration';

class MeterGeneralInfoTab extends Component {
  getWorkingHoursData = () =>
    this.props.egg.followBranchWorkingHours
      ? this.props.egg.currentBranchWorkingHours
      : this.props.egg.currentEggWorkingHours;
  render() {
    const { egg } = this.props;
    return (
      <div>
        <div style={{ marginBottom: '70px' }}>
          <EggDetailGeneralInformation className="_margin-bottom" egg={egg} />
          <MeterNetworkConfiguration egg={egg} />
          <MachineListManagement eggId={egg.id} machines={egg.machines} />
        </div>
        <Row type="flex" justify="space-between">
          <h2 className="_page-title _margin-bottom">
            Quadro de Horário de funcionamento atual
          </h2>
          <UseCustomWorkingHourOnEggCheckboxContainer egg={this.props.egg}>
            Utilizar um horário customizado
          </UseCustomWorkingHourOnEggCheckboxContainer>
        </Row>
        <WorkingHours workingHours={this.getWorkingHoursData()} />
      </div>
    );
  }
}

MeterGeneralInfoTab.propTypes = {
  egg: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    followBranchWorkingHours: PropTypes.bool,
    currentBranchWorkingHours: PropTypes.object,
    currentEggWorkingHours: PropTypes.object,
  }).isRequired,
};

export default MeterGeneralInfoTab;
