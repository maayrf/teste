import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { loadCurrentBranchWorkingHours } from './actions';
import { loadPaginatedInfoOfBranchOrMeterWorkingHours } from '../BranchWorkingHoursContainer/actions';
import WorkingHours from '../../../components/WorkingHours/index';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
  makeSelectCurrentBranchWorkingHours,
} from './selectors';
import './style.less';
import LoadingCard from '../../../components/LoadingCard/index';
import CreateWorkingHoursButtonModal from '../CreateWorkingHoursButtonModal/index';
import EditWorkingHoursButtonModal from '../EditWorkingHoursButtonModal/index';
import DeleteWorkingHoursContainer from '../DeleteWorkingHoursContainer/index';

class CurrentBranchWorkingHoursContainer extends Component {
  componentDidMount() {
    this.loadCurrentBranchWorkingHours();
  }

  onDeleteSuccess = () => {
    this.loadCurrentBranchWorkingHours();
    this.loadBranchWorkingHours();
  };

  loadCurrentBranchWorkingHours() {
    const {
      params: { id },
    } = this.props.match;
    this.props.loadCurrentBranchWorkingHours(id);
  }

  loadBranchWorkingHours() {
    const { branchId } = this.props;

    const params = {
      paginationStart: 0,
      paginationNumber: 15,
    };
    this.props.loadPaginatedInfoOfBranchOrMeterWorkingHours(branchId, params);
  }

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

  render() {
    const { currentBranchWorkingHours, loading, branchId } = this.props;
    const { renderOnHeader } = this;
    return (
      <div className="current-working-hours">
        <Row type="flex" align="middle" justify="space-between">
          <Col>
            <h2>Quadro de Horário de funcionamento atual</h2>
          </Col>
          <Col offset={2}>
            <CreateWorkingHoursButtonModal
              buttonType="primary"
              icon="plus"
              size="default"
              workingHours={{
                belongsTo: { id: branchId, className: 'Branch' },
              }}
              buttonLabel="Cadastrar um quadro de horário"
              title="Cadastrar quadro de horário"
            />
          </Col>
        </Row>
        <LoadingCard loading={loading}>
          <WorkingHours
            renderOnHeader={renderOnHeader}
            workingHours={currentBranchWorkingHours}
          />
        </LoadingCard>
      </div>
    );
  }
}

CurrentBranchWorkingHoursContainer.propTypes = {
  match: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  currentBranchWorkingHours: PropTypes.object,
  loadCurrentBranchWorkingHours: PropTypes.func.isRequired,
  loadPaginatedInfoOfBranchOrMeterWorkingHours: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
  success: makeSelectSuccess(),
  currentBranchWorkingHours: makeSelectCurrentBranchWorkingHours(),
});

const mapDispatchToProps = {
  loadCurrentBranchWorkingHours,
  loadPaginatedInfoOfBranchOrMeterWorkingHours,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withRouter, withConnect)(CurrentBranchWorkingHoursContainer);
