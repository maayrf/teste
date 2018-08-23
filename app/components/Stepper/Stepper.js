/**
 *
 * Stepper
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import Step from './Step';
import StepTitle from './StepTitle';
import StepContent from './StepContent';
import StepButtons from './StepButtons';
import StepPlaceholder from './StepPlaceholder';

class Stepper extends Component {
  static Step = Step;
  static StepButtons = StepButtons;

  state = {
    currentStep: this.props.currentStep,
  };

  getActiveContentList = () => {
    const { currentStep } = this.state;
    const { onFinish, stepsLoaded } = this.props;

    const contentList = [];

    this.steps.contentList.forEach((child = { props: {} }, i) => {
      const {
        title, children, isValid, ...stepProps
      } = child.props;

      const isActive = currentStep === i;
      // Create the content list
      const isLastStep = i === this.steps.contentList.length - 1 && stepsLoaded;
      if (isValid || isActive) {
        contentList.push(<StepContent
          {...stepProps}
          key={title}
          bulletNumber={i + 1}
          active={isActive}
          isLastStep={isLastStep}
          isValid={isValid}
          onClick={() => this.goToStep(i)}
          onNext={() => this.nextStep()}
          onPrev={() => this.prevStep()}
          onFinish={onFinish}
        >
          {children}
        </StepContent>);
      }
    });
    return contentList;
  };

  getSteps = () => {
    const { children: steps } = this.props;
    const flattenSteps = (stepsToBeFlatten) => {
      let newSteps = [];
      for (let i = 0; i < stepsToBeFlatten.length; i += 1) {
        const child = stepsToBeFlatten[i];
        if (React.isValidElement(child)) {
          newSteps.push(child);
        } else if (Array.isArray(child)) {
          newSteps = [...newSteps, ...flattenSteps(child)];
        }
      }
      return newSteps;
    };
    return flattenSteps(steps);
  };

  /**
   * Organize the stepper data, separating the stepper titles and content
   * @returns void
   */
  mapSteps() {
    const { currentStep } = this.state;
    const { stepsLoaded } = this.props;

    const titleList = [];
    const steps = this.getSteps();
    React.Children.forEach(steps, (child = { props: {} }, i) => {
      const { title, isValid, ...stepProps } = child.props;

      const isActive = currentStep === i;
      // Create the title list
      titleList.push(<StepTitle
        {...stepProps}
        key={title}
        title={title}
        bulletNumber={i + 1}
        active={isActive}
        isValid={isValid}
        onClick={() => this.goToStep(i)}
      />);
    });

    if (!stepsLoaded) {
      titleList.push(<StepPlaceholder key="placeholder" />);
    }

    this.steps = {
      titleList,
      contentList: steps,
    };
  }

  handleStepChange = (index) => {
    this.props.onStepChange(index);
  };
  previousStepsAreValid = (index) =>
    this.steps.contentList
      .slice(0, index)
      .every(({ props: { isValid, optional } }) => isValid || optional);
  goToStep(index) {
    this.setState(({ currentStep }) => {
      // Get the properties from the steps
      const { props: currentStepProps } = this.steps.contentList[currentStep];

      // If the target step is previous one
      // and the step is valid or optional
      const isPreviousStep = currentStep > index;
      const previousStepsAreValid = this.previousStepsAreValid(index);

      if (
        // If the current step is NOT valid
        (!(currentStepProps.isValid || currentStepProps.optional) &&
          // And is NOT a previous step
          !isPreviousStep) ||
        // OR Previous Steps are NOT valid
        !previousStepsAreValid
      ) {
        // Block the target step
        return null;
      }

      return {
        currentStep: index,
      };
    });
    this.handleStepChange(index);
  }

  nextStep = () => {
    const { currentStep } = this.state;
    const nextStep = currentStep + 1;

    const steps = this.getSteps();
    if (nextStep >= steps.length) {
      return;
    }
    this.props.onNextStep(nextStep);
    this.goToStep(nextStep);
  };

  prevStep = () => {
    const { currentStep } = this.state;
    const previousStep = currentStep - 1;
    if (previousStep < 0) return;
    this.props.onPrevStep(previousStep);
    this.goToStep(previousStep);
  };

  render() {
    this.mapSteps();
    const { titleList } = this.steps;
    const contentList = this.getActiveContentList();
    return (
      <div className="Stepper">
        <div className="title-wrapper">{titleList}</div>
        <div className="content-wrapper">{contentList}</div>
      </div>
    );
  }
}

Stepper.defaultProps = {
  currentStep: 0,
  stepsLoaded: true,
  onNextStep: () => {},
  onPrevStep: () => {},
  onStepChange: () => {},
};

Stepper.propTypes = {
  /** Event triggered after finishing the last step */
  onFinish: PropTypes.func.isRequired,
  /** Event triggered after change a step */
  onStepChange: PropTypes.func,
  /** Event triggered on the next step through the button */
  onNextStep: PropTypes.func,
  /** Event triggered on the previous step through the button */
  onPrevStep: PropTypes.func,
  /** Index of the active step */
  currentStep: PropTypes.number,
  stepsLoaded: PropTypes.bool,
  children: PropTypes.node,
};

export default Stepper;
