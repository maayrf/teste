/**
 *
 * MyPerformanceIndexCreateButton
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MyPerformanceIndexForm from '../MyPerformanceIndexForm';
import { createMyPerformanceIndex } from '../../actions';
import openNotificationWithIcon from '../../../../utils/antd-notification';
import ModalButton from '../../../../components/ModalButton';

class MyPerformanceIndexCreateButton extends Component {
  state = {
    loading: false,
    modalVisible: false,
  };
  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  submit = (myPerformanceIndexData) => {
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
    this.props.createMyPerformanceIndex(myPerformanceIndexData).then(() => {
      this.setState({
        loading: false,
        modalVisible: false,
      });
      openNotificationWithIcon(
        'success',
        'Configuração de performance criada!'
      );
    });
  };
  render() {
    const { loading, modalVisible } = this.state;
    const title = 'Criar uma configuração de performance';
    return (
      <div className="my-performance-index-create-button">
        <ModalButton
          buttonLabel={title}
          title={title}
          visible={this.state.modalVisible}
          onCancel={this.toggleModal}
          onOpen={this.toggleModal}
          type="primary"
        >
          <MyPerformanceIndexForm
            loading={loading}
            visible={modalVisible}
            onCancel={() => this.toggleModal()}
            onSubmit={(myPerformanceIndexData) =>
              this.submit(myPerformanceIndexData)
            }
          />
        </ModalButton>
      </div>
    );
  }
}
MyPerformanceIndexCreateButton.propTypes = {
  createMyPerformanceIndex: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  createMyPerformanceIndex: (myPerformanceIndex) =>
    new Promise((resolve, reject) =>
      dispatch(createMyPerformanceIndex(myPerformanceIndex, resolve, reject))),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyPerformanceIndexCreateButton);
