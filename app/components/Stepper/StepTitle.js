import React from 'react';
import PropTypes from 'prop-types';
import StepBullet from './StepBullet';
import './StepTitle.less';

const StepTitle = ({
  active, title, bulletNumber, onClick, isValid,
}) => {
  let titleElement = title;
  if (typeof title === 'string') {
    titleElement = <h4 className="heading">{title}</h4>;
  }
  return (
    <div
      role="button"
      className={`StepTitle ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <StepBullet value={bulletNumber} showValidIcon={isValid} />
      {titleElement}
    </div>
  );
};

StepTitle.defaultProps = {
  active: false,
  onClick: () => {},
};

StepTitle.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  bulletNumber: PropTypes.number.isRequired,
  isValid: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default StepTitle;
