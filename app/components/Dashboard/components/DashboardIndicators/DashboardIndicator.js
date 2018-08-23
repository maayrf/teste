import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Card } from 'antd';
import './styles/dashboard-indicator.less';

const DashboardIndicator = ({
  title,
  content,
  icon,
  inverseTitle = false,
  style,
  className,
  gutter,
  ...restProps
}) => {
  let newIcon = null;
  if (icon && typeof icon === 'string') {
    newIcon = <Icon type={icon} />;
  }
  if (icon && typeof icon !== 'string') {
    newIcon = icon;
  }
  return (
    <Card
      className={`dashboard-card ${className}`}
      style={style}
      {...restProps}
    >
      <Row
        className="dashboard-indicator"
        type="flex"
        gutter={gutter}
        align="middle"
      >
        <div>{newIcon && newIcon}</div>
        <div style={{ flex: 1 }}>
          <Fragment>
            <div
              className={
                inverseTitle
                  ? 'dashboard-content -reverse'
                  : 'dashboard-content'
              }
            >
              <h3 className="indicator-title">{title}</h3>
              <div className="indicator-value">{content}</div>
            </div>
          </Fragment>
        </div>
      </Row>
    </Card>
  );
};

DashboardIndicator.defaultProps = {
  gutter: 13,
};
DashboardIndicator.propTypes = {
  gutter: PropTypes.number,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  inverseTitle: PropTypes.bool,
  icon: PropTypes.element,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default DashboardIndicator;
