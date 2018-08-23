/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * BranchTags
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Tag } from 'antd';
import { Link } from 'react-router-dom';
import './style.less';
import { BRANCHES_URL } from '../../utils/constants';

const MenuItem = Menu.Item;

class BranchTags extends Component {
  showMenuBranches = (branches) => (
    <Menu>
      {branches.map((branch) => (
        <MenuItem key={branch.id}>
          <Link to={`${BRANCHES_URL}/${branch.id}`}>{branch.tradename}</Link>
        </MenuItem>
      ))}
    </Menu>
  );

  branchesDropdown = (branches) => (
    <Dropdown
      overlay={this.showMenuBranches(branches)}
      placement="bottomCenter"
    >
      <Tag className="tag-branch">{`+${branches.length}`}</Tag>
    </Dropdown>
  );

  branchesDisplay = (branches) =>
    branches.map((branch) => (
      <Tag className="tag-branch" key={branch.id}>
        <Link to={`${BRANCHES_URL}/${branch.id}`}>{branch.tradename}</Link>
      </Tag>
    ));

  renderTags = (branches, maxDisplayTags) => {
    const branchesDisplay = branches.slice(0, maxDisplayTags);
    const branchesDropdown = branches.slice(maxDisplayTags);
    return (
      <span>
        {this.branchesDisplay(branchesDisplay)}
        {branchesDropdown.length >= 1 &&
          this.branchesDropdown(branches.slice(2))}
      </span>
    );
  };
  render() {
    const { branches, maxDisplayTags } = this.props;
    return (
      <div className="branch-tags">
        {branches.length >= 1 && this.renderTags(branches, maxDisplayTags)}
      </div>
    );
  }
}

BranchTags.defaultProps = {
  maxDisplayTags: 2,
};

BranchTags.propTypes = {
  branches: PropTypes.array.isRequired,
  maxDisplayTags: PropTypes.number,
};

export default BranchTags;
