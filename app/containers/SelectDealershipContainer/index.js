/**
 *
 * Select Dealership Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectSelectDealerships,
  makeSelectSelectDealershipsLoading,
} from './selectors';
import { loadSelectDealerships } from './actions';
import reducer from './reducer';
import saga from './saga';
import SelectDropdown from '../../components/SelectDropdown/index';
import openNotificationWithIcon from '../../utils/antd-notification';

class SelectDealershipContainer extends Component {
  componentDidMount() {
    this.props.loadSelectDealerships();
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon(
        'error',
        'Seleção de Concessionária',
        error.message.toString()
      );
    }
  }
  render() {
    const { selectDealerships, ...restProps } = this.props;
    return <SelectDropdown dataSource={selectDealerships} {...restProps} />;
  }
}

SelectDealershipContainer.propTypes = {
  error: PropTypes.object,
  selectDealerships: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  loadSelectDealerships: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  selectDealerships: makeSelectSelectDealerships(),
  loading: makeSelectSelectDealershipsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadSelectDealerships: () => dispatch(loadSelectDealerships()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'selectDealerships', reducer });
const withSaga = injectSaga({ key: 'selectDealerships', saga });
export default compose(withReducer, withSaga, withConnect)(SelectDealershipContainer);
