import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './styles/StepButtons.less';

const StepButtons = ({
  showPreviousButton,
  showNextButton,
  showFinishButton,
  onNext,
  onPrev,
  onFinish,
  isValid,
}) => (
  <div className="step-buttons">
    {showPreviousButton && <Button onClick={onPrev}>Anterior</Button>}
    {showNextButton && (
      <Button type="primary" disabled={!isValid} onClick={onNext}>
        Próximo
      </Button>
    )}
    {showFinishButton && (
      <Button type="primary" disabled={!isValid} onClick={onFinish}>
        Finalizar
      </Button>
    )}
  </div>
);

StepButtons.defaultProps = {
  showPreviousButton: true,
  showNextButton: true,
  showFinishButton: true,
};

StepButtons.propTypes = {
  showPreviousButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showFinishButton: PropTypes.bool,
  isValid: PropTypes.bool,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onFinish: PropTypes.func,
  // onFinish: PropTypes.func.isRequired,
};

export default StepButtons;
