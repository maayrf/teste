/* eslint-disable no-shadow */
/**
 *
 * Remove Grouping Container
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Button, Modal } from 'antd';
import { removeGroupingForm } from '../GroupingFormContainer/actions';
import { loadMeters } from '../MetersTreeFilter/actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import './style.less';

const { confirm } = Modal;

class RemoveGroupingContainer extends Component {
  showRemoveConfirm = () => {
    const { grouping, removeGrouping, loadMeters } = this.props;
    const groupingNameStrong = <strong>{grouping.name}</strong>;
    const title = <span>Deseja remover o grupo: {groupingNameStrong} ?</span>;
    confirm({
      title,
      okText: 'Sim',
      cancelText: 'Cancelar',
      onOk() {
        removeGrouping(grouping.id).then(() => {
          openNotificationWithIcon(
            'success',
            <span>Grupo {groupingNameStrong} removido</span>
          );
          loadMeters();
        });
      },
    });
  };
  render() {
    const {
      grouping,
      removeGrouping,
      loadMeters,
      wrapperStyle,
      ...restProps
    } = this.props;
    return (
      <div style={wrapperStyle} className="remove-grouping-page">
        <Button icon="delete" onClick={this.showRemoveConfirm} {...restProps}>
          Excluir
        </Button>
      </div>
    );
  }
}

RemoveGroupingContainer.propTypes = {
  removeGrouping: PropTypes.func.isRequired,
  grouping: PropTypes.object,
  wrapperStyle: PropTypes.object,
  loadMeters: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  removeGrouping: (groupingId) =>
    new Promise((resolve, eject) =>
      dispatch(removeGroupingForm(groupingId, resolve, eject))),
  loadMeters: () => dispatch(loadMeters()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RemoveGroupingContainer);
