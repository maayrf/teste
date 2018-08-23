import React, { Component } from 'react';
import './style.less';
import { labelHoursValues } from '../../constants';

export default class DayHour extends Component {
  render() {
    const {
      isSelected,
      dayIndex,
      hourIndex,
      onMouseDown,
      onMouseOver,
      isSelecting,
      isHovered,
      selectionType,
    } = this.props;

    const data = {
      dayIndex,
      hourIndex,
      isSelected,
    };

    return (
      <label
        role="presentation"
        key={hourIndex}
        className="ts-day-hour"
        onMouseDown={() => onMouseDown(data)}
        onMouseOver={() => onMouseOver(data)}
        title={`${labelHoursValues[hourIndex]} ~ ${
          labelHoursValues[hourIndex + 1]
        }`}
      >
        <input
          type="checkbox"
          checked={isSelecting && isHovered ? selectionType : isSelected}
        />
        <span className="ts-day-hour-checkmark" />
      </label>
    );
  }
}
