import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import moment from 'moment';
import 'moment/locale/pt-br';
import App from './containers/App';
import configureStore from './store';

ptBR.DatePicker.timeSelect = 'Selecionar Horas';
ptBR.DatePicker.lang.timeSelect = 'Selecionar Horas';

moment.locale('pt-br');

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
const history = createHistory();
const initialState = {};

const store = configureStore(initialState, history);
render(
  <LocaleProvider locale={ptBR}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </LocaleProvider>,
  document.getElementById('app')
);
