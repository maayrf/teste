import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import StepBullet from './StepBullet';
import './styles/StepContent.less';
import StepButtons from './StepButtons';

class StepContent extends Component {
  constructor() {
    super();
    this.elementRef = React.createRef();
  }

  state = {
    hasError: false,
  };

  componentDidMount() {
    if (this.props.active) {
      this.scrollToStep();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) {
      this.scrollToStep();
    }
  }

  onNext = () => {
    if (!this.props.isValid) {
      this.setState({
        hasError: true,
      });

      // TODO: Refactor timeout
      setTimeout(() => {
        this.setState({
          hasError: false,
        });
      }, 900);
    }
    this.props.onNext();
  };

  scrollToStep() {
    this.elementRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }

  render() {
    const {
      active,
      children,
      bulletNumber,
      onClick,
      onFinish,
      onPrev,
      isLastStep,
      optional,
      isValid,
    } = this.props;
    const { hasError } = this.state;

    let classNames = 'StepContent ';
    classNames += active ? 'active ' : '';
    classNames += optional ? 'optional ' : '';
    classNames += hasError ? 'has-error ' : '';

    return (
      <Fragment>
        <div
          className={classNames}
          onClick={active ? null : onClick}
          ref={this.elementRef}
        >
          <StepBullet value={bulletNumber} />
          <div>{children}</div>
        </div>
        {active && (
          <StepButtons
            onNext={this.onNext}
            onFinish={onFinish}
            onPrev={onPrev}
            isValid={isValid}
            showPreviousButton={bulletNumber > 1}
            showNextButton={!isLastStep}
            showFinishButton={isLastStep}
          />
        )}
      </Fragment>
    );
  }
}

StepContent.defaultProps = {
  active: false,
  optional: false,
  isLastStep: false,
};

StepContent.propTypes = {
  optional: PropTypes.bool,
  /** INTERNAL: Indicate if the step is active */
  active: PropTypes.bool,
  /** INTERNAL: Indicate the last step */
  isLastStep: PropTypes.bool,
  /** INTERNAL: Step number */
  bulletNumber: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  /** INTERNAL: Change the currentStep clicking the step, you can add you callback on the ≤Stepper onChangeStep={...} />   */
  onClick: PropTypes.func.isRequired,
  /** INTERNAL: Advance one step, you can add you callback on the ≤Stepper onNextStep={...} /> */
  onNext: PropTypes.func.isRequired,
  /** INTERNAL: Return one step, you can add you callback on the ≤Stepper onPrevStep={...} />  */
  onPrev: PropTypes.func.isRequired,
  onFinish: PropTypes.func,
};

export default StepContent;
