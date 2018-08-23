/**
 *
 * SelectMetersButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'antd';

import './style.less';
import Sidebar from '../../components/Sidebar';
import CompaniesSelectContainer from '../CompaniesSelectContainer';
import MeterTreeContainer from '../MeterTreeContainer';
import { withLoginUser } from '../../utils/withLoginUser';

class SelectMetersButtonContainer extends Component {
  state = {
    shownSidebar: false,
  };
  toggleSidebar = () => {
    this.setState({
      shownSidebar: !this.state.shownSidebar,
    });
  };
  handleCompanyChange = (companyId) => {
    let { checkedMeters } = this.props.value;
    checkedMeters = !companyId ? [] : checkedMeters;
    this.props.onChange({
      ...this.props.value,
      companyId,
      checkedMeters,
    });
  };
  handleMeterTree = (checkedMeters) => {
    this.props.onChange({
      ...this.props.value,
      checkedMeters,
    });
  };
  renderMeterTree = () => {
    if (
      (this.props.isRoot() && this.props.value.companyId !== null) ||
      !this.props.isRoot()
    ) {
      const filter = this.props.isRoot()
        ? { searchCompanyId: this.props.value.companyId }
        : {};
      return (
        <div>
          <h3>Selecione os medidores ou grupos a serem medidos:</h3>
          <MeterTreeContainer
            filter={filter}
            checkedMeters={this.props.value.checkedMeters}
            onChange={this.handleMeterTree}
          />
        </div>
      );
    }
    return '';
  };
  renderSideBarContent = () => {
    const {
      value: { companyId },
      isRoot,
    } = this.props;

    return (
      <div>
        {isRoot() && (
          <div className="_margin-bottom">
            <h3>Selecione uma Empresa:</h3>
            <CompaniesSelectContainer
              value={companyId}
              onChange={this.handleCompanyChange}
            />
          </div>
        )}
        {this.renderMeterTree()}
      </div>
    );
  };

  render() {
    const { shownSidebar } = this.state;
    const {
      value: { checkedMeters },
    } = this.props;
    const checkedMetersLength = checkedMeters.length;
    return (
      <div className="select-meters-button">
        <Badge count={checkedMetersLength}>
          <Button onClick={() => this.toggleSidebar()}>
            Selecionar Medidores
          </Button>
        </Badge>
        <Sidebar onClose={() => this.toggleSidebar()} shown={shownSidebar}>
          {this.renderSideBarContent()}
        </Sidebar>
      </div>
    );
  }
}

SelectMetersButtonContainer.propTypes = {
  value: PropTypes.shape({
    companyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checkedMeters: PropTypes.array,
  }),
  isRoot: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};
SelectMetersButtonContainer.defaultProps = {
  onChange: () => {},
  value: {
    companyId: null,
    checkedMeters: [],
  },
};

export default withLoginUser(SelectMetersButtonContainer);
