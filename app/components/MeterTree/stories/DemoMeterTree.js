import React, { Component } from 'react';
import MeterTree from '../';

class DemoMeterTree extends Component {
  static propTypes = MeterTree.propTypes;

  state = {
    checkedMeters: [],
  };
  onChange = (checkedMeters) => {
    this.setState({
      checkedMeters,
    });
  };
  render() {
    const meterTree = [
      {
        id: 1,
        tradename: 'Branch 1',
        className: 'branch',
        groupings: [
          {
            id: 2,
            className: 'grouping',
            name: 'Grouping 1',
            eggs: [
              {
                id: 1,
                className: 'egg',
                name: 'Egg 1',
              },
            ],
            groupings: [
              {
                id: 3,
                className: 'grouping',
                name: 'Grouping 1',
                eggs: [
                  {
                    id: 2,
                    className: 'egg',
                    name: 'Egg 1',
                  },
                ],
              },
            ],
          },
        ],
        eggs: [
          {
            id: 3,
            className: 'egg',
            name: 'Egg 1',
          },
        ],
      },
      {
        id: 2,
        tradename: 'Branch 2',
        className: 'branch',
        groupings: [
          {
            id: 4,
            className: 'grouping',
            name: 'Grouping 2',
          },
          {
            id: 5,
            className: 'grouping',
            name: 'Grouping 3',
          },
        ],
      },
    ];
    const { checkedMeters } = this.state;
    return (
      <MeterTree
        meterTree={meterTree}
        onChange={this.onChange}
        checkedMeters={checkedMeters}
      />
    );
  }
}

export default DemoMeterTree;
