import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WeekHours from './components/WeekHours/WeekHours';
import HoursLabels from './components/HoursLabels/HoursLabels';
import { fillArray } from './utils';
import './style.css';
import {
  defaultWeekHours,
  TIME_RECTANGLES_PER_DAY,
  API_WEEK_DAYS_NAMES,
} from './constants';
export default class TimeSheet extends Component {
  state = {
    selectedHours: [],
    hoverSelectedArea: [],
    isSelecting: false,
    selectionType: false,
  };

  componentDidMount() {
    const { weekHours } = this.props;
    document.addEventListener('mouseup', this.onMouseUp);
    const selectedHours = weekHours.map((day) => ({
      ...day,
      hours: day.hours.reduce((prev, cur, index) => {
        if (!cur) return prev;
        return prev.concat(index);
      }, []),
    }));
    this.setState({ selectedHours });
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (hour) => {
    if (!this.isEditable()) return;
    this.setState(
      {
        isSelecting: true,
        selectionType: !hour.isSelected,
        selectionFirstHour: hour,
        selectionLastHour: hour,
      },
      () => {
        const areaSelected = this.getAreaSelected();
        this.selectRangeArea(areaSelected.daysRange, areaSelected.hoursRange);
      }
    );
  };

  onMouseOver = (hour) => {
    if (!this.isEditable()) return;
    if (!this.state.isSelecting) return;
    this.setState(
      {
        selectionLastHour: hour,
      },
      () => {
        const areaSelected = this.getAreaSelected();
        this.selectRangeArea(areaSelected.daysRange, areaSelected.hoursRange);
      }
    );
  };

  onMouseUp = async () => {
    if (!this.isEditable()) return;
    if (!this.state.isSelecting) return;
    this.commitSelectedHours();
    this.setState({
      isSelecting: false,
      hoverSelectedArea: [],
    });
  };

  getSelectedHourByDay(dayIndex) {
    return this.state.selectedHours[dayIndex]
      ? this.state.selectedHours[dayIndex].hours
      : [];
  }

  getHoveredHourByDay(dayIndex) {
    const weekDay = this.state.hoverSelectedArea.find(({ day }) => day === dayIndex);
    return weekDay ? weekDay.hours : [];
  }

  commitSelectedHours() {
    const { onSelect } = this.props;
    this.setState(({ selectionType, selectedHours, hoverSelectedArea }) => {
      hoverSelectedArea.forEach(({ day, hours }) => {
        if (!selectionType) {
          selectedHours[day].hours = selectedHours[day].hours.filter((hour) => hours.indexOf(hour) < 0);
          onSelect(this.fillWeekHours(selectedHours));
          return {
            selectedHours,
          };
        }
        const mergeSelectedHoveredHours = [
          ...hours,
          ...selectedHours[day].hours,
        ];
        selectedHours[day].hours = [...new Set(mergeSelectedHoveredHours)];
      });
      onSelect(this.fillWeekHours(selectedHours));
      return {
        selectedHours,
      };
    });
  }

  getAreaSelected() {
    const { selectionFirstHour, selectionLastHour } = this.state;

    const firstDay = Math.min(
      selectionFirstHour.dayIndex,
      selectionLastHour.dayIndex
    );
    const lastDay = Math.max(
      selectionFirstHour.dayIndex,
      selectionLastHour.dayIndex
    );

    const firstHour = Math.min(
      selectionFirstHour.hourIndex,
      selectionLastHour.hourIndex
    );
    const lastHour = Math.max(
      selectionFirstHour.hourIndex,
      selectionLastHour.hourIndex
    );

    const hoursRange = fillArray(lastHour, firstHour);
    const daysRange = fillArray(lastDay, firstDay);

    return {
      daysRange,
      hoursRange,
    };
  }

  isEditable = () => {
    const { editable } = this.props;
    if (editable) return true;
    return false;
  };

  fillWeekHours = (selectedHours) => {
    const newSelection = selectedHours.map(({ day, hours }, dayIndex) => {
      const newHours = [];
      for (
        let hourIndex = 0;
        hourIndex < TIME_RECTANGLES_PER_DAY;
        hourIndex += 1
      ) {
        if (!hours.includes(hourIndex)) {
          newHours[hourIndex] = false;
        } else {
          newHours[hourIndex] = true;
        }
      }
      return {
        day: API_WEEK_DAYS_NAMES[dayIndex],
        hours: newHours,
      };
    });
    return newSelection;
  };

  selectRangeArea(days, hours) {
    this.setState(() => ({
      hoverSelectedArea: days.map((day) => ({
        day,
        hours,
      })),
    }));
  }

  render() {
    const { isSelecting, selectionType } = this.state;
    const { weekHours } = this.props;
    return (
      <div className="ts-week-time-range">
        <HoursLabels />
        {weekHours.map((week, i) => (
          <WeekHours
            key={i}
            dayIndex={i}
            weekHours={week}
            onMouseDown={this.onMouseDown}
            // onMouseUp={this.onMouseUp}
            onMouseOver={this.onMouseOver}
            selectedHours={this.getSelectedHourByDay(i)}
            hoverSelectedArea={this.getHoveredHourByDay(i)}
            isSelecting={isSelecting}
            selectionType={selectionType}
          />
        ))}
      </div>
    );
  }
}

TimeSheet.defaultProps = {
  onSelect: () => {},
  editable: false,
  weekHours: defaultWeekHours,
};

TimeSheet.propTypes = {
  weekHours: PropTypes.array,
  editable: PropTypes.bool,
  onSelect: PropTypes.func,
};
