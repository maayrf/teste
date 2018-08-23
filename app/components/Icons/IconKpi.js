import React from 'react';
import PropTypes from 'prop-types';

const IconKpi = ({
  width = 14,
  height = 14,
  fill = '#fff',
  className,
  ...props
}) => (
  <svg
    className={`custom-icon ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M18 2H9L4 7v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm1 18c0 .551-.449 1-1 1H6c-.551 0-1-.449-1-1V8h5V3h8c.551 0 1 .449 1 1v16zm-1-10a1 1 0 0 1-1 1c-.049 0-.09-.021-.137-.028l-2.935 3.67A.99.99 0 0 1 14 15a1 1 0 0 1-2 0c0-.02.01-.038.012-.058l-1.577-1.051A.98.98 0 0 1 10 14c-.039 0-.071-.018-.109-.022l-1.972 2.63A1 1 0 1 1 7 16c.04-.001.072.017.11.021l1.972-2.63A1 1 0 1 1 11 13c-.001.022-.011.039-.013.059l1.577 1.051A.98.98 0 0 1 13 14c.049 0 .09.02.137.028l2.935-3.67A.99.99 0 0 1 16 10a1 1 0 1 1 2 0z" />
  </svg>
);

IconKpi.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default IconKpi;
