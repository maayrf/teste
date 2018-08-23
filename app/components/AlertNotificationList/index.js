/**
 *
 * AlertNotificationList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const AlertNotificationList = ({ alertNotifications }) => (
  <div className="alert-notification-list">
    <List
      itemLayout="horizontal"
      dataSource={alertNotifications}
      renderItem={(alert) => (
        <ListItem>
          <ListItemMeta
            style={{ paddingLeft: 15, paddingRight: 15 }}
            title={<Link to={`/alertas/${alert.id}`}>{alert.message}</Link>}
            description={`${moment(alert.date).fromNow()} - ${
              alert.branch.tradename
            }`}
          />
        </ListItem>
      )}
    />
  </div>
);

AlertNotificationList.propTypes = {
  alertNotifications: PropTypes.array.isRequired,
};

export default AlertNotificationList;
