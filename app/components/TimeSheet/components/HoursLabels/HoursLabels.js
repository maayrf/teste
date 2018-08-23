import React, { Component } from 'react';
import { labelHoursValues, TIME_RECTANGLES_PER_DAY } from '../../constants';
import './style.css';

export default class HoursLabels extends Component {
  renderHoursLabels() {
    const labelsElements = [];
    const stepPercentage = 100 / TIME_RECTANGLES_PER_DAY;

    for (let i = 0; i < labelHoursValues.length; i++) {
      const percentage = i * stepPercentage;
      const style = { left: `${percentage}%` };
      labelsElements.push(<span key={i} style={style} className="ts-hours-labels">
        {labelHoursValues[i]}
      </span>);
    }
    return labelsElements;
  }
  render() {
    return (
      <div className="ts-hours-labels-container">
        {this.renderHoursLabels()}
      </div>
    );
  }
}
