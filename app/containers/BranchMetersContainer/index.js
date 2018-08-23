/**
 *
 * Branch Meters Container Page
 *
 */
import React, { Component } from 'react';
import { Row, Radio, Icon } from 'antd';
import PropTypes from 'prop-types';
import MeterListContainer from '../../containers/MeterListContainer';
import MetersListFilterForm from '../../components/MeterList/components/MetersListFilterForm';
import BranchMetersManager from '../BranchMetersManager/index';
import './style.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class BranchMetersContainer extends Component {
  state = {
    meterType: 'table',
  };
  getFilter = () => ({
    ...this.state.filter,
    searchBranchId: this.props.branch.id,
  });
  handleRadio = (event) => this.setState({ meterType: event.target.value });
  handleSubmit = (filter) => {
    this.setState({ filter });
  };
  renderMeters() {
    const { meterType } = this.state;
    const { branch } = this.props;
    switch (meterType) {
      case 'table':
        return this.renderTable();
      case 'tree':
        return <BranchMetersManager branch={branch} />;
      default:
        return <div />;
    }
  }
  renderTable = () => (
    <div>
      <MetersListFilterForm
        onSubmit={this.handleSubmit}
        showSelectCompanies={false}
      />
      <MeterListContainer filter={this.getFilter()} />
    </div>
  );
  render() {
    return (
      <div className="branch-meters-container-page">
        <Row type="flex" justify="end" gutter={15} className="_margin-bottom">
          <RadioGroup
            defaultValue={this.state.meterType}
            onChange={this.handleRadio}
          >
            <RadioButton value="tree">
              <Icon type="bars" />
            </RadioButton>
            <RadioButton value="table">
              <Icon type="table" />
            </RadioButton>
          </RadioGroup>
        </Row>
        {this.renderMeters()}
      </div>
    );
  }
}

BranchMetersContainer.propTypes = {
  branch: PropTypes.object.isRequired,
};

export default BranchMetersContainer;
