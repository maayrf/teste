import { fromJS } from 'immutable';
import { LOGOUT_USER } from '../LoginPage/constants';
import { LOAD_CONSUMPTIONS } from '../ConsumptionPage/constants';
import { LOAD_POWER_DEMAND } from '../PowerDemandPage/constants';
import { LOAD_APPORTIONMENTS } from '../ApportionmentPage/constants';
import { LOAD_PRODUCTIVE_HOURS } from '../ProductiveHoursPage/constants';
import { LOAD_RUSH_HOURS } from '../RushHoursPage/constants';

const initialState = fromJS({
  filter: {
    scaleVisualization: null,
    selectMetersButton: {
      companyId: null,
      checkedMeters: [],
    },
    rangeDates: [null, null],
  },
});

function metersTreeFilterReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_CONSUMPTIONS:
    case LOAD_POWER_DEMAND:
    case LOAD_APPORTIONMENTS:
    case LOAD_PRODUCTIVE_HOURS:
    case LOAD_RUSH_HOURS:
      return state.set('filter', fromJS(action.params));
    default:
      return state;
  }
}

export default metersTreeFilterReducer;
