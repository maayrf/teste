/**
 *
 * Alerts Emitted Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Pagination, Row, Col, Button } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectCompanies,
  makeSelectCompanysLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors/selectors';
import { loadCompanies } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import CompanyList from '../../components/CompanyList';
import { METERS_URL } from '../../utils/constants';

class CompanyListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadCompanies(currentPage, limit);
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadCompanies(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadCompanies = (page, limit) => {
    const offset = this.getOffset(page, limit);
    this.props.loadCompanies({
      paginationStart: offset,
      paginationNumber: limit,
    });
  };
  actionColumn = (company) => (
    <Row type="flex" justify="end" align="middle" gutter={15}>
      <Col>
        <Button href={`/${METERS_URL}?comapanyId=${company.id}`}>
          Ver Medidores
        </Button>
      </Col>
      <Col>
        <Button>Ver Detalhes</Button>
      </Col>
    </Row>
  );
  render() {
    const {
      loading, companies, totalCount, limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="company">
        <LoadingCard loading={loading}>
          <CompanyList companies={companies} actionColumn={this.actionColumn} />
        </LoadingCard>
        <Row type="flex" justify="end">
          <Pagination
            onChange={this.onChangePage}
            pageSize={limit}
            current={currentPage}
            total={totalCount}
          />
        </Row>
      </div>
    );
  }
}

CompanyListContainer.propTypes = {
  error: PropTypes.object,
  companies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  companies: makeSelectCompanies(),
  loading: makeSelectCompanysLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadCompanies: (params) => dispatch(loadCompanies(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'companies', reducer });
const withSaga = injectSaga({ key: 'companies', saga });
export default compose(withReducer, withSaga, withConnect)(CompanyListContainer);
