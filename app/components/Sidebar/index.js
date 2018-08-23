/**
 *
 * Sidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './style.less';

const Sidebar = ({ children, shown, onClose = () => {} }) => {
  const isShownClass = shown ? '-shown' : '';

  return (
    <div className={`sidebar-wrapper ${isShownClass}`}>
      <div className="sidebar">
        <Button
          className="sidebar-button-close"
          onClick={() => onClose()}
          icon="close"
          ghost
        />
        {children}
      </div>
      <div
        className="sidebar-overlay"
        // role="presentation" hide from assistive technologies
        // Stoping the user to focus with the keyboard
        // The user navigating via keyboard can use the close button
        role="presentation"
        onClick={() => onClose()}
      />
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  shown: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
