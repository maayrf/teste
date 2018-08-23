/**
 *
 * FareTimeLineList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TimeLineList from '../TimeLineList/index';
import { FARE_NOT_FOUND } from '../../utils/constants';
import TimeLineItemNotFound from '../TimeLineItemNotFound/index';
import FareDetail from '../FareDetail/index';

class FareTimeLineList extends React.Component {
  render() {
    const { fares, notFoundMessage, ...restProps } = this.props;

    return (
      <div className="demand-fare-list">
        <TimeLineList
          {...restProps}
          dataSource={fares}
          listItemProps={(fare) =>
            fare.errorType
              ? {
                className: '_margin-top ant-alert ant-alert-warning',
                style: { marginTop: '20px' },
              }
              : {}
          }
          renderItem={(fare) => {
            const { errorType } = fare;
            if (errorType === FARE_NOT_FOUND) {
              return (
                <TimeLineItemNotFound
                  noStyle
                  startDate={fare.startDate}
                  endDate={fare.endDate}
                >
                  <h3>{notFoundMessage}</h3>
                </TimeLineItemNotFound>
              );
            }
            return <FareDetail fare={fare} />;
          }}
        />
      </div>
    );
  }
}

FareTimeLineList.defaultProps = {
  currentlabel: 'tarifa atual',
  previouslabel: 'tarifas passadas',
  nextlabel: 'tarifas futuras',
  notFoundMessage: 'Não há tarifa cadastrada para este período',
};

FareTimeLineList.propTypes = {
  notFoundMessage: PropTypes.string,
  currentlabel: PropTypes.string,
  previouslabel: PropTypes.string,
  nextlabel: PropTypes.string,
  actionColumn: PropTypes.func,
  fares: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
    consumptionUnit: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
};

export default FareTimeLineList;
