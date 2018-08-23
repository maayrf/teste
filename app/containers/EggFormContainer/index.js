/**
 *
 * Egg Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';

import EggForm from '../../components/EggForm';

import {
  makeSelectError,
  makeSelectEggLoading,
  makeSelectSuccess,
} from './selectors';
import { createEgg, editEgg } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

class EggFormContainer extends Component {
  componentDidUpdate() {
    const { error, success } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (success) {
      openNotificationWithIcon('success', success.message);
    }
  }
  onSubmit = (eggValues) => {
    const { egg } = this.props;
    if (egg) {
      return this.props.editEgg(eggValues);
    }
    return this.props.createEgg(eggValues);
  };
  render() {
    const { onSubmit } = this;
    const { loading, egg } = this.props;
    const props = {
      loading,
      onSubmit,
    };
    if (egg) {
      props.egg = egg;
    }
    return <EggForm {...props} />;
  }
}

EggFormContainer.propTypes = {
  editEgg: PropTypes.func.isRequired,
  createEgg: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  egg: PropTypes.shape({
    name: PropTypes.string,
    load: PropTypes.number,
    numberOfSensors: PropTypes.number,
    type: PropTypes.string,
    factor: PropTypes.number,
    currentTransformer: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectEggLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editEgg: (egg) => dispatch(editEgg(egg)),
  createEgg: (egg) => dispatch(createEgg(egg)),
});

const withReducer = injectReducer({ key: 'eggForm', reducer });
const withSaga = injectSaga({ key: 'eggForm', saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(EggFormContainer);
