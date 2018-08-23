/**
 *
 * UseCustomWorkingHourOnEggCheckbox
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row } from 'antd';
import './style.less';
import Loading from '../Loading';

class UseCustomWorkingHourOnEggCheckbox extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };
  static defaultProps = {
    onChange: () => {},
  };
  handleUseCustomWorkingHour = ({ target: { checked } }) => {
    this.props.onChange(checked);
  };
  render() {
    const { children, loading } = this.props;
    return (
      <Row type="flex">
        <Checkbox
          disabled={loading}
          {...this.props}
          onChange={this.handleUseCustomWorkingHour}
        >
          {children}
        </Checkbox>
        {loading && <Loading> </Loading>}
      </Row>
    );
  }
}

export default UseCustomWorkingHourOnEggCheckbox;
