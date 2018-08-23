/**
 *
 * Machine Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MachineForm from '../../components/MachineForm';
import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import {
  makeSelectError,
  makeSelectMachineLoading,
  makeSelectSuccess,
} from './selectors';
import { createMachine, editMachine } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class MachineFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error !== prevProps.error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (success !== prevProps.success) {
      openNotificationWithIcon('success', success.message);
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (machineValues) => {
    const { machine } = this.props;
    if (machine) {
      return this.props.editMachine(machineValues);
    }
    return this.props.createMachine(machineValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { error, success, ...restProps } = this.props;
    return (
      <MachineForm
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

MachineFormContainer.propTypes = {
  editMachine: PropTypes.func.isRequired,
  createMachine: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  error: PropTypes.object,
  eggId: PropTypes.number,
  machine: PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    maker: PropTypes.string,
    nominalVoltage: PropTypes.number,
    ratedCurrent: PropTypes.number,
    comments: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectMachineLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editMachine: (machine) => dispatch(editMachine(machine)),
  createMachine: (machine) => dispatch(createMachine(machine)),
});

const withReducer = injectReducer({
  key: 'machineForm',
  reducer,
});
const withSaga = injectSaga({ key: 'machineForm', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(MachineFormContainer);
