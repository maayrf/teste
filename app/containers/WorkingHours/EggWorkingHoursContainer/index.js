/**
 *
 * Egg Working Hours Container Page
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
  makeSelectWorkingHoursContainer,
  makeSelectWorkingHoursContainerLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import './style.less';
import { loadPaginatedInfoOfEggWorkingHours } from './actions';
import CurrentEggWorkingHoursContainer from '../CurrentEggWorkingHoursContainer/index';
import { loadCurrentEggWorkingHours } from '../CurrentEggWorkingHoursContainer/actions';
import CreateWorkingHoursButtonModal from '../../WorkingHours/CreateWorkingHoursButtonModal';
import EditWorkingHoursButtonModal from '../EditWorkingHoursButtonModal/';
import DeleteWorkingHoursContainer from '../DeleteWorkingHoursContainer/';
import TimeLineList from '../../../components/TimeLineList/index';
import { EGG_WORKING_HOUR_NOT_FOUND } from '../../../components/FareAndWorkingHoursAlert/constants';
import TimeLineItemNotFound from '../../../components/TimeLineItemNotFound/index';
import WorkingHours from '../../../components/WorkingHours/index';
import LoadingCard from '../../../components/LoadingCard/index';

class EggWorkingHoursContainer extends Component {
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
    const { eggId } = this.props;
    this.props.loadCurrentEggWorkingHours(eggId);
  };

  loadOnCurrentPage = () => {
    const { currentPage, limit } = this.state;
    this.loadWorkingHours(currentPage, limit);
  };

  loadWorkingHours = (page, limit) => {
    const { eggId } = this.props;
    const offset = this.getOffset(page, limit);
    this.props.loadWorkingHours(eggId, {
      paginationStart: offset,
      paginationNumber: limit,
    });
  };

  renderOnHeader = (workingHours) => {
    const { className } = workingHours.belongsTo;
    if (className === 'Branch') return null;
    return (
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
  };

  renderOnErrorBody = (workingHours) => (
    <Row type="flex" justify="end">
      <CreateWorkingHoursButtonModal
        buttonLabel="Cadastrar quadro de horário"
        title="Cadastrar quadro de horário"
        workingHours={{
          ...workingHours,
          belongsTo: { id: this.props.eggId, className: 'Egg' },
        }}
      />
    </Row>
  );

  render() {
    const { currentPage } = this.state;
    const { onChangePage, renderOnErrorBody, renderOnHeader } = this;

    const {
      loading, workingHours, totalCount, limit, eggId,
    } = this.props;
    console.log(workingHours, 'WORKING HOURS');
    return (
      <div className="egg-working-hours-timeline-list-container">
        <h2>Quadro de Horário de funcionamento atual</h2>
        <CurrentEggWorkingHoursContainer
          renderOnHeader={(workingHours) => workingHours.belongsTo.className === 'Egg' ? (
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
          ) : null}
          eggId={eggId}
        />
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
              if (errorType === EGG_WORKING_HOUR_NOT_FOUND) {
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

EggWorkingHoursContainer.propTypes = {
  error: PropTypes.object,
  eggId: PropTypes.number.isRequired,
  workingHours: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadWorkingHours: PropTypes.func.isRequired,
  loadCurrentEggWorkingHours: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};
const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  workingHours: makeSelectWorkingHoursContainer(),
  loading: makeSelectWorkingHoursContainerLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = {
  loadWorkingHours: loadPaginatedInfoOfEggWorkingHours,
  loadCurrentEggWorkingHours,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(compose(withConnect)(EggWorkingHoursContainer));
