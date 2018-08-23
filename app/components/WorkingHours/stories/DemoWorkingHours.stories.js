import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import 'antd/dist/antd.css';
import './style.css';
import DemoWorkingHours from './DemoWorkingHours';

const text = `
## Source code

~~~js
class DemoWorkingHours extends Component {
  static propTypes = WorkingHours.propTypes;
  render() {
    const workingHours = {
      endDate: '2018-08-10',
      startDate: '2019-08-10',
      timeZone: 'America/Sao_Paulo',
      belongsTo: {
        id: 2,
        className: 'branch',
        name: 'Uma Branch Exemplo',
      },
      workingHours: [
        {
          day: 'Sunday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
        {
          day: 'Monday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
        {
          day: 'Tuesday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
        {
          day: 'Wednesday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
        {
          day: 'Thursday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
        {
          day: 'Friday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
        {
          day: 'Saturday',
          hours: Array(48).fill('').map(() => Math.random() < 0.5),
        },
      ],
    };
    return (
      <div>
        <WorkingHours
          workingHours={workingHours}
        />
      </div>
    );
  }
}

export default DemoWorkingHours;
~~~

### Props Component

| Propriedade       | Descrição                                                            | Tipo     | Valor Padrão       |
| ----------------- | -------------------------------------------------------------------- | -------- | ------------------ | 
| **workingHours** | Objeto que representa um quadro de horário de funcionamento | object |          -         |
| **renderOnHeader** | Função que espera como retorno um componente react que será renderizado no cabeçalho do Working Hour  | function  |          -         |
| **renderOnErrorBody** | Função que espera como retorno um componente react que será renderizado no corpo de um erro caso o working Hour houver um erro  |   function  |          -         |

`;

storiesOf('WorkingHours', module).add(
  'Default usage',
  withInfo({ source: false, text })(() => <DemoWorkingHours />)
);
