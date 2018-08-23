/**
 *
 * Branch Working Hours Container Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Col, Pagination, Row } from 'antd';
import {
  makeSelectError,
  makeSelectWorkingHours,
  makeSelectWorkingHoursContainerLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadPaginatedInfoOfBranchOrMeterWorkingHours } from './actions';
import './style.less';
import CurrentBranchWorkingHoursContainer from '../CurrentBranchWorkingHoursContainer';
import DeleteWorkingHoursContainer from '../DeleteWorkingHoursContainer';
import { loadCurrentBranchWorkingHours } from '../CurrentBranchWorkingHoursContainer/actions';
import EditWorkingHoursButtonModal from '../EditWorkingHoursButtonModal';
import CreateWorkingHoursButtonModal from '../../WorkingHours/CreateWorkingHoursButtonModal';
import TimeLineList from '../../../components/TimeLineList/index';
import { BRANCH_WORKING_HOUR_NOT_FOUND } from '../../../components/FareAndWorkingHoursAlert/constants';
import TimeLineItemNotFound from '../../../components/TimeLineItemNotFound/index';
import WorkingHours from '../../../components/WorkingHours/index';
import LoadingCard from '../../../components/LoadingCard/index';

class BranchWorkingHoursContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };

  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadWorkingHours(currentPage, limit);
  }

  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadWorkingHours(currentPage, limit);
  };

  onDeleteSuccess = () => {
    this.loadOnCurrentPage();
    this.loadCurrentWorkingHours();
  };

  getOffset = (page, limit) => (page - 1) * limit;

  loadCurrentWorkingHours = () => {
    this.props.loadCurrentBranchWorkingHours(this.props.branchId);
  };

  loadOnCurrentPage = () => {
    const { currentPage, limit } = this.state;
    this.loadWorkingHours(currentPage, limit);
  };

  loadWorkingHours = (page, limit) => {
    const {
      params: { id },
    } = this.props.match;
    const offset = this.getOffset(page, limit);

    this.props.loadWorkingHours(id, {
      paginationStart: offset,
      paginationNumber: limit,
    });
  };

  renderOnHeader = (workingHours) => (
    <Row gutter={10} type="flex">
      <Col>
        <EditWorkingHoursButtonModal
          icon="edit"
          buttonLabel="Editar"
          title="Editar quadro de horário"
          workingHours={workingHours}
        />
      </Col>
      <Col>
        <DeleteWorkingHoursContainer
          workingHours={workingHours}
          onDeleteSuccess={this.onDeleteSuccess}
        />
      </Col>
    </Row>
  );

  renderOnErrorBody = (workingHours) => (
    <Row type="flex" justify="end">
      <CreateWorkingHoursButtonModal
        buttonLabel="Cadastrar quadro de horário"
        title="Cadastrar quadro de horário"
        workingHours={workingHours}
      />
    </Row>
  );

  render() {
    const { currentPage } = this.state;
    const { onChangePage, renderOnHeader, renderOnErrorBody } = this;

    const {
      loading, workingHours, totalCount, limit, branchId,
    } = this.props;
    return (
      <div className="branch-working-hours-timeline-list-container">
        <CurrentBranchWorkingHoursContainer branchId={branchId} />
        <h2> Todos os quadros de horários </h2>
        <LoadingCard loading={loading}>
          <TimeLineList
            currentlabel="quadro de horário atual"
            previouslabel="quadros de horários passados"
            nextlabel="quadros de horários futuros"
            itemLayout="horizontal"
            size="large"
            dataSource={workingHours}
            listItemProps={(fare) =>
              fare.errorType
                ? {
                  className: '_margin-top ant-alert ant-alert-warning',
                  style: { marginTop: '20px' },
                }
                : { style: { display: 'block' } }
            }
            renderItem={(workingHoursItem) => {
              const { errorType } = workingHoursItem;
              if (errorType === BRANCH_WORKING_HOUR_NOT_FOUND) {
                return (
                  <div>
                    <TimeLineItemNotFound
                      noStyle
                      startDate={workingHoursItem.startDate}
                      endDate={workingHoursItem.endDate}
                    >
                      <h3>
                        Não há quadro de horário cadastrado para este período
                      </h3>
                    </TimeLineItemNotFound>
                    {this.renderOnErrorBody(workingHoursItem)}
                  </div>
                );
              }
              return (
                <WorkingHours
                  renderOnErrorBody={renderOnErrorBody}
                  renderOnHeader={renderOnHeader}
                  workingHours={workingHoursItem}
                />
              );
            }}
          />
        </LoadingCard>
        <Pagination
          current={currentPage}
          onChange={onChangePage}
          pageSize={limit}
          total={totalCount}
        />
      </div>
    );
  }
}

BranchWorkingHoursContainer.propTypes = {
  error: PropTypes.object,
  branchId: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  loadWorkingHours: PropTypes.func.isRequired,
  loadCurrentBranchWorkingHours: PropTypes.func.isRequired,
  workingHours: PropTypes.array.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  workingHours: makeSelectWorkingHours(),
  loading: makeSelectWorkingHoursContainerLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = {
  loadWorkingHours: loadPaginatedInfoOfBranchOrMeterWorkingHours,
  loadCurrentBranchWorkingHours,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(compose(withConnect)(BranchWorkingHoursContainer));
