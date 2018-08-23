import { compose } from 'redux';

import { withBranch } from '../BranchDetailHOC';
import reducer from '../BranchDetailHOC/reducer';
import saga from '../BranchDetailHOC/saga';
import BranchMeterSortableTreeContainer from '../BranchMeterSortableTreeContainer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

const REDUCER_KEY = 'branchMeters';
const withReducer = injectReducer({ key: REDUCER_KEY, reducer });
const withSaga = injectSaga({ key: REDUCER_KEY, saga });

export default compose(withReducer, withSaga, withBranch(REDUCER_KEY))(BranchMeterSortableTreeContainer);
