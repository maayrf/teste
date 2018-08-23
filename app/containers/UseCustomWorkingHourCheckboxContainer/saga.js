import { takeLatest, all } from 'redux-saga/effects';
import { EDIT_EGG_CUSTOM_WORKING_HOUR } from './constants';
import { editEggForm } from '../EggFormContainer/saga';

export default function* eggData() {
  yield all([takeLatest(EDIT_EGG_CUSTOM_WORKING_HOUR, editEggForm)]);
}
