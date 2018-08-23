import { fromJS } from 'immutable';
import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
  email: null,
});

function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case FORGET_PASSWORD:
      return state
        .set('loading', true)
        .set('error', null)
        .set('email', action.email); // TODO: Check if is it really needed
    case FORGET_PASSWORD_SUCCESS:
      return state
        .set('success', {
          messageTitle: 'Solicitação recebida',
          message:
            'Caso o endereço informado esteja cadastrado na plataforma, um e-mail será enviado em breve.',
        })
        .set('loading', false);
    case FORGET_PASSWORD_ERROR:
      return state.set('loading', false).set('error', {
        messageTitle: 'Falha',
        message: 'Falha na comunicação com o servidor.',
      });
    default:
      return state;
  }
}

export default forgetPasswordReducer;
