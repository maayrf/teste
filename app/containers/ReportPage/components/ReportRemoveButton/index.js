/* eslint-disable no-shadow */
/**
 *
 * ReportRemoveButtonContainer
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeReport } from '../../actions';
import openNotificationWithIcon from '../../../../utils/antd-notification';
import {
  makeSelectLimit,
  makeSelectOffset,
} from '../../../ReportListContainer/selectors';
import ModalButtonConfirm from '../../../../components/ModalButtonConfirm';

class ReportRemoveButtonContainer extends Component {
  state = {
    loading: false,
  };
  submit = (report) => {
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
    const { limit, offset } = this.props;
    this.props.removeReport(report.id).then((id) => {
      openNotificationWithIcon('success', `Exportação #${id} foi removida`);
      this.props.loadReports(offset, limit);
    });
  };
  render() {
    const { loading } = this.state;
    const { report } = this.props;
    const titleModal = (
      <span>
        Você deseja deletar -{' '}
        <strong>
          #{report.id} {report.name}
        </strong>
      </span>
    );
    return (
      <span className="report-edit-button">
        <ModalButtonConfirm
          loading={loading}
          buttonLabel="Excluir"
          onSubmit={() => this.submit(report)}
          buttonProps={{ type: 'danger' }}
          modalProps={{
            title: titleModal,
            okType: 'danger',
          }}
        />
      </span>
    );
  }
}
ReportRemoveButtonContainer.propTypes = {
  report: PropTypes.object.isRequired,
  removeReport: PropTypes.func.isRequired,
  loadReports: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  limit: makeSelectLimit(),
  offset: makeSelectOffset(),
});
const mapDispatchToProps = (dispatch) => ({
  removeReport: (id) =>
    new Promise((resolve, reject) =>
      dispatch(removeReport(id, resolve, reject))),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ReportRemoveButtonContainer);
