import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Step from '../Step';

const condition = true;

storiesOf('Stepper>Step', module)
  .add(
    'Default usage',
    withInfo('Step component is the responsible for be the external API layer')(() => <Step title="Test">...</Step>)
  )
  .add(
    'Optional step',
    withInfo('Indicate if the user can skip the step, by default this is disabled')(() => (
      <Step title="Test" optional>
        ...
      </Step>
    ))
  )
  .add(
    'Validate a step',
    withInfo('The isValid property, Indicates if the user can advance the next step')(() => (
      <Step title="Test" isValid={condition}>
        ...
      </Step>
    ))
  );
