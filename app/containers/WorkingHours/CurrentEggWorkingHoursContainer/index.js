import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { loadCurrentEggWorkingHours } from './actions';
import { loadPaginatedInfoOfEggWorkingHours } from '../EggWorkingHoursContainer/actions';
import WorkingHours from '../../../components/WorkingHours/index';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
  makeSelectCurrentEggWorkingHours,
} from './selectors';
import './style.less';
import LoadingCard from '../../../components/LoadingCard/index';
import CreateWorkingHoursButtonModal from '../CreateWorkingHoursButtonModal/index';

class CurrentEggWorkingHoursContainer extends Component {
  componentDidMount() {
    this.loadCurrentEggWorkingHours();
  }

  loadCurrentEggWorkingHours = () => {
    const { eggId } = this.props;
    this.props.loadCurrentEggWorkingHours(eggId);
  };

  render() {
    const { loading, currentEggWorkingHours, ...restProps } = this.props;

    return (
      <LoadingCard loading={loading}>
        <CreateWorkingHoursButtonModal
          buttonLabel="Cadastrar quadro de horário"
          title="Cadastrar quadro de horário"
          workingHours={{
            belongsTo: { id: this.props.eggId, className: 'Egg' },
          }}
        />
        <WorkingHours {...restProps} workingHours={currentEggWorkingHours} />
      </LoadingCard>
    );
  }
}

CurrentEggWorkingHoursContainer.propTypes = {
  eggId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  currentEggWorkingHours: PropTypes.object,
  loadCurrentEggWorkingHours: PropTypes.func.isRequired,
  loadPaginatedInfoOfEggWorkingHours: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
  success: makeSelectSuccess(),
  currentEggWorkingHours: makeSelectCurrentEggWorkingHours(),
});

const mapDispatchToProps = {
  loadCurrentEggWorkingHours,
  loadPaginatedInfoOfEggWorkingHours,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(compose(withConnect(CurrentEggWorkingHoursContainer)));
