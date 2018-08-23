import PropTypes from 'prop-types';
import StepTitle from './StepTitle';

const Step = ({ children = null }) => children;

Step.defaultProps = {
  isValid: true,
  isLastStep: false,
  optional: false,
  visible: true,
};

Step.propTypes = {
  /** Title displayed on the right side */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.node,
  /** If the step is valid, the user can advance to the next step */
  isValid: PropTypes.bool,
  /** Indicate if the user can skip this step */
  optional: PropTypes.bool,
  /** Indicate if this is the last step */
  isLastStep: PropTypes.bool,
  /** Indicate if the step should be visible (including the title) */
  visible: PropTypes.bool,
};

export default Step;
