/**
 *
 * CurrentHoursClock
 *
 */

import React, { Component } from 'react';
import moment from 'moment';
import './style.less';

class CurrentHoursClock extends Component {
  state = {
    moment: moment(),
  };
  componentDidMount() {
    this.interval = setInterval(() => this.setNewMoment(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setNewMoment() {
    this.setState({
      moment: moment(),
    });
  }
  render() {
    return (
      <div className="current-hours-clock">
        {moment(this.state.moment).format('DD/MM/YYYY HH:mm:ss')}
      </div>
    );
  }
}

export default CurrentHoursClock;
