/**
 *
 * ButtonMeterTreePopover
 *
 */

import React, { Component } from 'react';
import { Popover, Button, Badge } from 'antd';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import MeterTreeContainer from '../../containers/MeterTreeContainer';
import './style.less';

class ButtonMeterTreePopover extends Component {
  state = {
    showPopover: false,
  };
  handleMeters = (meters, checkedMeter, isMarked) => {
    const checkedMeters = isMarked ? [checkedMeter] : [];
    this.props.onMetersUpdate(checkedMeters, checkedMeter, isMarked);
  };
  toggleVisiblePopover = (showPopover) => this.setState({ showPopover });
  render() {
    const { showPopover } = this.state;
    const { checkedMeters } = this.props;
    return (
      <div className="button-meter-tree-popover">
        <Popover
          content={
            <div style={{ overflow: 'auto', maxHeight: 400 }}>
              <MeterTreeContainer
                checkedMeters={checkedMeters}
                onChange={this.handleMeters}
              />
            </div>
          }
          title="Selecione um medidor/grupo/unidade"
          trigger="click"
          placement="rightTop"
          visible={showPopover}
          onVisibleChange={this.toggleVisiblePopover}
        >
          <Badge count={checkedMeters.length}>
            <Button>Selecione um medidor para ser configurado</Button>
          </Badge>
        </Popover>
      </div>
    );
  }
}

ButtonMeterTreePopover.propTypes = {
  onMetersUpdate: PropTypes.func.isRequired,
  checkedMeters: PropTypes.array.isRequired,
  checkedMeter: PropTypes.object.isRequired,
  isMarked: PropTypes.bool.isRequired,
};

export default ButtonMeterTreePopover;
