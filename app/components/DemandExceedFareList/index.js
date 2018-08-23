/**
 *
 * DemandExceedFareList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import './style.less';
import DemandExceedFareDetail from '../DemandExceedFareDetail/index';
const ListItem = List.Item;

const DemandExceedFareList = ({ demandExceedFares, actionColumn }) => ({
  render() {
    return (
      <div className="demand-fare-list">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              // console.log(page);
            },
          }}
          dataSource={demandExceedFares}
          renderItem={(demandExceedFare) => (
            <ListItem key={demandExceedFare.id} actions={[]}>
              <DemandExceedFareDetail
                fare={demandExceedFare}
                actionColumn={actionColumn}
              />
            </ListItem>
          )}
        />
      </div>
    );
  },
});

DemandExceedFareList.propTypes = {
  actionColumn: PropTypes.func,
  demandExceedFares: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    rushValue: PropTypes.number.isRequired,
    outRushValue: PropTypes.number.isRequired,
    consumptionUnit: PropTypes.string.isRequired,
  })).isRequired,
};

export default DemandExceedFareList;
