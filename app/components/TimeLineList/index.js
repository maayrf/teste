/**
 *
 * TimeLineList
 *
 */

import React, { Component } from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import './style.less';
import { separateCurrentPreviousNext } from '../../utils/separateCurrentPreviousNext';

const ListItem = List.Item;

class TimeLineList extends Component {
  renderList = (title, collection, { className = '', ...divProps }) => {
    const { actionColumn, listItemProps, ...restProps } = this.props;
    return (
      <div className={`timeline-list-div ${className}`} {...divProps}>
        <h3 className="_uppercase">{title}</h3>
        <List
          {...restProps}
          dataSource={collection}
          className="time-line-list"
          renderItem={(item) => {
            const { id } = item;
            const newListItemProps =
              typeof listItemProps === 'function'
                ? listItemProps(item)
                : listItemProps;
            return (
              <ListItem
                {...newListItemProps}
                key={id}
                actions={[actionColumn(item)]}
              >
                {this.props.renderItem(item)}
              </ListItem>
            );
          }}
        />
      </div>
    );
  };
  render() {
    const {
      dataSource, currentlabel, previouslabel, nextlabel,
    } = this.props;
    const [
      nextFares,
      currentFares,
      previousFares,
    ] = separateCurrentPreviousNext(dataSource);
    return (
      <div className="timeline-list">
        {!!nextFares.length &&
          this.renderList(nextlabel, nextFares, {
            className: 'next-timeline-list-div',
          })}
        {!!currentFares.length &&
          this.renderList(currentlabel, currentFares, {
            className: 'current-timeline-list-div',
          })}
        {!!previousFares.length &&
          this.renderList(previouslabel, previousFares, {
            className: 'previous-timeline-list-div',
          })}
      </div>
    );
  }
}

TimeLineList.defaultProps = {
  currentlabel: 'atual',
  previouslabel: 'anteriores',
  nextlabel: 'futuros',
  actionColumn: () => {},
  listItemProps: {},
};

TimeLineList.propTypes = {
  listItemProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  currentlabel: PropTypes.string,
  previouslabel: PropTypes.string,
  nextlabel: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  actionColumn: PropTypes.func,
  dataSource: PropTypes.array.isRequired,
};

export default TimeLineList;
