/**
 *
 * Meter Page
 *
 */
import React, { Component } from 'react';
import { Card, Row, Radio, Icon } from 'antd';
import { Helmet } from 'react-helmet';

import './style.less';
import MeterManager from '../MeterManager';
import MeterListContainer from '../MeterListContainer';
import MetersListFilterForm from '../../components/MeterList/components/MetersListFilterForm';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class MeterPage extends Component {
  state = {
    meterType: 'tree',
    filter: {},
  };
  handleSubmit = (filter) => {
    this.setState({
      filter,
    });
  };
  handleRadio = (event) => {
    this.setState({ meterType: event.target.value });
  };
  renderHead = () => (
    <Helmet>
      <title>Medidores - CUBI Energia</title>
    </Helmet>
  );
  renderTabPanel = () => {
    const { meterType } = this.state;
    switch (meterType) {
      case 'tree':
        return <MeterManager />;
      case 'table':
        return this.renderTable();
    }
  };
  renderTable = () => (
    <div>
      <MetersListFilterForm onSubmit={this.handleSubmit} />
      <MeterListContainer filter={this.state.filter} />
    </div>
  );
  render() {
    const { renderHead } = this;
    return (
      <div>
        {renderHead()}
        <h1 className="_uppercase _page-title">Medidores</h1>
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
        <Card>{this.renderTabPanel()}</Card>
      </div>
    );
  }
}

MeterPage.propTypes = {};
export default MeterPage;
