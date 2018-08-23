import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import WorkingHoursForm from '../';

class DemoWorkingHoursForm extends Component {
  static propTypes = WorkingHoursForm.propTypes;
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
    };
    return (
      <div>
        <WorkingHoursForm
          onCancel={action('onCancel')}
          onSubmit={action('onSubmit')}
          workingHours={workingHours}
        />
      </div>
    );
  }
}

export default DemoWorkingHoursForm;
