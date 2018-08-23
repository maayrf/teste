import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import 'antd/dist/antd.css';
import './style.css';
import DemoMeterTree from './DemoMeterTree';

const text = `
## Source code

~~~js
class DemoMeterTree extends Component {
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
~~~

### Props Component

| Propriedade       | Descrição                                                  | Tipo       | Valor Padrão       |
| ----------------- | ---------------------------------------------------------- | ---------- | ------------------ | 
| checkedMeters     | Array de Branch ou Grouping ou Egg que foi selecionado     | array      |          -         |
| meterTree         | Array de Branch ou groupings ou eggs que formarão a árvore | array      |          -         |
| onChange          | Função de callback toda vez que o valor de seleção da árvore for mudada, onde o primeiro parâmetro representa o valor do estado atual | function | - |


`;

storiesOf('MeterTree', module).add(
  'Default usage',
  withInfo({ source: false, text })(() => <DemoMeterTree />)
);
