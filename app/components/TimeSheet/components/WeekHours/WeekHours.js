import React, { Component } from 'react';
import './style.css';
import DayHour from '../DayHour/DayHour';
import { LABELS_WEEK_DAYS_NAMES } from '../../constants';

export default class WeekHours extends Component {
  state = {};

  render() {
    const {
      weekHours,
      dayIndex,
      selectedHours,
      onMouseDown,
      onMouseOver,
      isSelecting,
      hoverSelectedArea,
      selectionType,
    } = this.props;
    return (
      <div className="ts-week-hours">
        <h4>{LABELS_WEEK_DAYS_NAMES[dayIndex]}</h4>
        {weekHours.hours.map((hour, i) => (
          <DayHour
            key={i}
            dayIndex={dayIndex}
            hourIndex={i}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            isSelected={selectedHours.indexOf(i) > -1}
            isHovered={hoverSelectedArea.indexOf(i) > -1}
            isSelecting={isSelecting}
            selectionType={selectionType}
          />
        ))}
      </div>
    );
  }
}
