import React, { Component } from 'react';
import { Input } from 'antd';

import Stepper from '..';

class DemoStepper extends Component {
  static propTypes = Stepper.propTypes;

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

export default DemoStepper;
