/**
 *
 * MyPerformanceIndexEditButton
 *
 */

import React, { Component } from 'react';
import { Button, Form, Modal } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MyPerformanceIndexForm from '../MyPerformanceIndexForm';
import { editMyPerformanceIndex } from '../../actions';

class MyPerformanceIndexEditButton extends Component {
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
    this.props.editMyPerformanceIndex(myPerformanceIndexData);
  };
  render() {
    const { loading } = this.state;
    const { myPerformanceIndex } = this.props;
    return (
      <span className="myPerformanceIndex-edit-button">
        <Button onClick={() => this.toggleModal()}>
          Edit MyPerformanceIndex
        </Button>
        <Modal
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => this.toggleModal()}
        >
          <h2>
            Edit MyPerformanceIndex <strong>#{myPerformanceIndex.id}</strong>
          </h2>
          <MyPerformanceIndexForm
            myPerformanceIndex={myPerformanceIndex}
            ref={(myperformanceindexform) =>
              (this.myperformanceindexform = myperformanceindexform)
            }
            loading={loading}
            onCancel={() => this.toggleModal()}
            onSubmit={(myPerformanceIndexData) =>
              this.submit(myPerformanceIndexData)
            }
          />
        </Modal>
      </span>
    );
  }
}
MyPerformanceIndexEditButton.propTypes = {
  editMyPerformanceIndex: PropTypes.func.isRequired,
  myPerformanceIndex: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  editMyPerformanceIndex: (myPerformanceIndex) =>
    new Promise((resolve, reject) =>
      dispatch(editMyPerformanceIndex(myPerformanceIndex, resolve, reject))),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyPerformanceIndexEditButton);
