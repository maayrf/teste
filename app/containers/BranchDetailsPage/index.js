/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Branch Details Page
 *
 */
import React, { Component } from 'react';
import { Row, Button, Card } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectBranchDetails,
  makeSelectBranchDetailsLoading,
} from './selectors';
import { loadBranchDetails } from './actions';
import BranchTabs from './components/BranchTabs/index';
import LoadingCard from '../../components/LoadingCard/index';
import openNotificationWithIcon from '../../utils/antd-notification';
import { BRANCHES_URL } from '../../utils/constants';

class BranchDetailsPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadBranchDetails(id);
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', 'Error', error.message.toString());
    }
  }
  renderHead = () => (
    <Helmet>
      <title>Unidades - CUBi Energia</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    const { loading, branchDetails } = this.props;
    return (
      <div>
        {renderHead()}
        <Row type="flex" justify="space-between" align="middle">
          <h1 className="_page-title">
            <Link to={`/${BRANCHES_URL}`}>Unidades</Link>
            <small>{branchDetails.tradename}</small>
          </h1>
          <Button icon="delete">Remover Unidade</Button>
        </Row>
        <div className="_margin-top">
          <Card>
            <LoadingCard loading={loading}>
              {!!branchDetails && !!branchDetails.id ? (
                <BranchTabs branchDetails={branchDetails} />
              ) : null}
            </LoadingCard>
          </Card>
        </div>
      </div>
    );
  }
}

BranchDetailsPage.propTypes = {
  error: PropTypes.object,
  branchDetails: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  loadBranchDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  branchDetails: makeSelectBranchDetails(),
  loading: makeSelectBranchDetailsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadBranchDetails: (id) => dispatch(loadBranchDetails(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'branchDetails', reducer });
const withSaga = injectSaga({ key: 'branchDetails', saga });
export default compose(withReducer, withSaga, withConnect)(BranchDetailsPage);
