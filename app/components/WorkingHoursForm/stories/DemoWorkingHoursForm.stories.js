import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import 'antd/dist/antd.css';
import './style.css';
import DemoWorkingHoursForm from './DemoWorkingHoursForm';

const text = `
## Source code

~~~js
class DemoWorkingHoursForm extends Component {
  static propTypes = WorkingHoursForm.propTypes;
  render() {
    const workingHours = {
      endDate: '2018-08-10',
      startDate: '2019-08-10',
      timeZone: 'America/Sao_Paulo',
    };
    return (
      <div>
        <WorkingHoursForm
          onCancel={action('onCancel')}
          onSubmit={action('onSubmit')}
          workingHours={workingHours}
        />
      </div>
    );
  }
}

export default DemoWorkingHoursForm;
~~~

### Props Component

| Propriedade       | Descrição                                                            | Tipo     | Valor Padrão       |
| ----------------- | -------------------------------------------------------------------- | -------- | ------------------ | 
| **workingHours** | Objeto que representa um quadro de horário de funcionamento, neste caso podemos usar para deixar preenchido as datas iniciais | object |          -         |
| **onCancel** | Callback ao clicar no botão cancelar| function  |          -         |
| **onSubmit** | Callback ao clicar no botão Cadastrar |   function  |          -         |

`;

storiesOf('WorkingHoursForm', module).add(
  'Default Usage',
  withInfo({ source: false, text })(() => <DemoWorkingHoursForm />)
);
