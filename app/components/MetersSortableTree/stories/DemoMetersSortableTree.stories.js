import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import 'antd/dist/antd.css';
import './style.css';
import DemoMetersSortableTree from './DemoMetersSortableTree';

const text = `
## Source code

~~~js
const history = createBrowserHistory();

class DemoMetersSortableTree extends Component {
  static propTypes = MetersSortableTree.propTypes;
  render() {
    const meters = [
      {
        id: 1,
        tradename: 'Branch 1',
        className: 'branch',
        groupings: [{
          id: 2,
          className: 'grouping',
          name: 'Grouping 1',
          eggs: [{
            id: 1,
            className: 'egg',
            name: 'Egg 1',
          }],
          groupings: [{
            id: 3,
            className: 'grouping',
            name: 'Grouping 1',
            eggs: [{
              id: 2,
              className: 'egg',
              name: 'Egg 1',
            }],
          }],
        }],
        eggs: [{
          id: 3,
          className: 'egg',
          name: 'Egg 1',
        }],
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
          }],
      },
    ];
    return (
      <Router history={history}>
        <Route
          render={(props) => (<MetersSortableTree
            {...props}
            meters={meters}
            onChange={action('onChange')}
            onClick={action('onClick')}
          />)}
        />
      </Router>
    );
  }
}

export default DemoMetersSortableTree;
~~~

### Props Component

| Propriedade       | Descrição                                                                              | Tipo                                        | Valor Padrão       |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------ | 
| meters            | Array de Branch ou groupings ou eggs que formarão a árvore                             | array                                       |          -         |
| onChange          | Função de callback toda vez que arrastar uma Grouping ou Egg em uma Branch ou Grouping | function(draggedElement, receivedElement)   |          -         |
| onClick           | Função de callback toda vez que clicar sobre uma Branch/Grouping/Egg                   | function(clickedElement)                    |          -         |

`;

storiesOf('MeterTreeSortable', module).add(
  'Default usage',
  withInfo({ source: false, text })(() => <DemoMetersSortableTree />)
);
