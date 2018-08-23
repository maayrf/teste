import React, { Component } from 'react';
import WorkingHours from '../';

class DemoWorkingHours extends Component {
  static propTypes = WorkingHours.propTypes;
  render() {
    const workingHours = {
      endDate: '2018-08-10',
      startDate: '2019-08-10',
      timeZone: 'America/Sao_Paulo',
      belongsTo: {
        id: 2,
        className: 'branch',
        name: 'Uma Branch Exemplo',
      },
      workingHours: [
        {
          day: 'Sunday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
        {
          day: 'Monday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
        {
          day: 'Tuesday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
        {
          day: 'Wednesday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
        {
          day: 'Thursday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
        {
          day: 'Friday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
        {
          day: 'Saturday',
          hours: Array(48)
            .fill('')
            .map(() => Math.random() < 0.5),
        },
      ],
    };
    return (
      <div>
        <WorkingHours workingHours={workingHours} />
      </div>
    );
  }
}

export default DemoWorkingHours;
