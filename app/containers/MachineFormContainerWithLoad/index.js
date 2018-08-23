import { compose } from 'redux';
import MachineFormContainer from '../MachineFormContainer';
import saga from '../DetailMachineHOC/saga';
import reducer from '../DetailMachineHOC/reducer';
import { withDetailMachine } from '../DetailMachineHOC';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

const REDUCER_KEY = 'machineDetailUpdateForm';
const withReducer = injectReducer({
  key: REDUCER_KEY,
  reducer,
});
const withSaga = injectSaga({
  key: REDUCER_KEY,
  saga,
});

export default compose(withReducer, withSaga, withDetailMachine(REDUCER_KEY))(MachineFormContainer);
