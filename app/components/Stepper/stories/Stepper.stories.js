import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import 'antd/dist/antd.css';
import DemoStepper from './DemoStepper';

const text = `
## Source code

~~~js
class DemoStepper extends Component {
  state = { step1: false };

  render() {
    return (
      <Stepper>
        <Stepper.Step title="Step 1" isValid={this.state.step1 === true}>
          <h1>Step title</h1>
          <Input
            placeholder="Fill this field to continue"
            onChange={() => this.setState({ step1: true })}
          />
          <Input.TextArea rows={5} placeholder="Just some optional textarea" />
        </Stepper.Step>
        
        <Stepper.Step title="Step 2" optional>
          <h1>Step title 2 (Optional)</h1>
          <Input placeholder="Basic usage" />
          <Input placeholder="Basic usage" />
          <Input placeholder="Basic usage" />
          <Input.TextArea rows={5} />
        </Stepper.Step>

        <Stepper.Step title="Step 3">
          <h1>Step title 3</h1>
          <Input placeholder="Basic usage" />
          <Input placeholder="Basic usage" />
          <Input.TextArea rows={5} />
          <Input placeholder="Basic usage" />
          <Input.TextArea rows={5} />
        </Stepper.Step>
      </Stepper>
    );
  }
}
~~~
`;

storiesOf('Stepper', module).add(
  'Default usage',
  withInfo({ source: false, text })(() => <DemoStepper />)
);
