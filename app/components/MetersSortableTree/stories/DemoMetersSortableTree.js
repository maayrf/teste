import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { action } from '@storybook/addon-actions';
import MetersSortableTree from '../';

const history = createBrowserHistory();

class DemoMetersSortableTree extends Component {
  render() {
    const meters = [
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
    return (
      <Router history={history}>
        <Route
          render={(props) => (
            <MetersSortableTree
              {...props}
              meters={meters}
              onChange={action('onChange')}
              onClick={action('onClick')}
            />
          )}
        />
      </Router>
    );
  }
}

export default DemoMetersSortableTree;
