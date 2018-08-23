/**
 *
 * UseCustomWorkingHourOnEggCheckboxContainer
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import WorkingHoursFormContainer from '../WorkingHours/WorkingHoursFormContainer';
import UseCustomWorkingHourOnEggCheckbox from '../../components/UseCustomWorkingHourCheckbox';
import './style.less';
import {
  makeSelectEggLoading,
  makeSelectError,
  makeSelectSuccess,
} from '../EggFormContainer/selectors';
import { editEgg } from './actions';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import moment from 'moment';

class UseCustomWorkingHourOnEggCheckboxContainer extends Component {
  static propTypes = {
    editEgg: PropTypes.func,
    onSubmit: PropTypes.func,
    egg: PropTypes.shape({
      followBranchWorkingHours: PropTypes.bool,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      currentEggWorkingHour: PropTypes.shape({
        errorType: PropTypes.string,
      }),
    }),
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };
  static defaultProps = {
    onSubmit: () => {},
  };
  state = {
    modalVisible: false,
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };
  handleUseCustomWorkingHour = (followEggWorkingHours) => {
    if (followEggWorkingHours && !this.props.egg.currentEggWorkingHour) {
      this.setState({
        modalVisible: true,
      });
    } else {
      this.props.editEgg({
        id: this.props.egg.id,
        followBranchWorkingHours: !followEggWorkingHours,
      });
    }
  };
  handleWorkingHoursSuccess = () => {
    this.props.editEgg({
      id: this.props.egg.id,
      followBranchWorkingHours: false,
    });
  };
  render() {
    const { children } = this.props;
    const { modalVisible } = this.state;
    return (
      <div>
        <Modal
          wrapClassName="vertical-center-modal"
          visible={modalVisible}
          title="Cadastre um novo Quadro de Horário"
          footer={null}
          onCancel={this.handleCancel}
          width="90%"
        >
          {modalVisible && (
            <WorkingHoursFormContainer
              customValidation={{
                startDate: {
                  validator: (rule, value, cb) => {
                    if (!value) {
                      return cb('Por favor preencher a data de hoje!');
                    }
                    const isBeforeToday = value
                      .startOf('day')
                      .isSameOrBefore(moment().startOf('day'));
                    if (!isBeforeToday) {
                      cb('Por favor colocar um valor anterior ou igual a de hoje!');
                    } else {
                      cb();
                    }
                  },
                },
                range: {
                  validator: (rule, value, cb) => {
                    if (!value) {
                      return cb('Por favor preencher a data final!');
                    }
                    const [startDate, endDate] = value;
                    if (!startDate || !endDate) {
                      return cb('Por favor preencher a data final!');
                    }
                    const startDateIsSameOrBefore = startDate
                      .startOf('day')
                      .isSameOrBefore(moment().startOf('day'));
                    const endDateIsSameOrAfter = endDate
                      .startOf('day')
                      .isSameOrAfter(moment().startOf('day'));
                    if (!(startDateIsSameOrBefore && endDateIsSameOrAfter)) {
                      return cb('Por favor preencher um range que contemple o dia de hoje');
                    }
                    cb();
                  },
                },
              }}
              onSuccess={this.handleWorkingHoursSuccess}
              onCancel={this.handleCancel}
              workingHours={{
                belongsTo: { id: this.props.egg.id, className: 'Egg' },
              }}
            />
          )}
        </Modal>
        <UseCustomWorkingHourOnEggCheckbox
          {...this.props}
          checked={!this.props.egg.followBranchWorkingHours}
          onChange={this.handleUseCustomWorkingHour}
        >
          {children}
        </UseCustomWorkingHourOnEggCheckbox>
      </div>
    );
  }
}

const REDUCER_KEY = 'useCustomWorkingHourForEgg';
const mapStateToProps = createStructuredSelector({
  error: makeSelectError(REDUCER_KEY),
  loading: makeSelectEggLoading(REDUCER_KEY),
  success: makeSelectSuccess(REDUCER_KEY),
});

const mapDispatchToProps = (dispatch) => ({
  editEgg: (egg) => dispatch(editEgg(egg)),
});

const withReducer = injectReducer({ key: REDUCER_KEY, reducer });
const withSaga = injectSaga({ key: REDUCER_KEY, saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(UseCustomWorkingHourOnEggCheckboxContainer);
