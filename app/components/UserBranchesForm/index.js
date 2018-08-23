/**
 *
 * MyUsersBranchesForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Row, Col } from 'antd';
import AutocompleteBranches from '../../containers/AutocompleteBranches';

const FormItem = Form.Item;

class UserBranchesForm extends Component {
  async componentDidMount() {
    const {
      form,
      user: { branches },
    } = this.props;

    const newBranches = branches.map((branch) => ({
      key: branch.id,
      label: branch.tradename,
    }));
    form.setFieldsValue({ id: this.props.user.id, branches: newBranches });
    form.validateFields();
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const myUserBranches = this.props.user
      ? {
        id: this.props.user.id,
        ...this.props.form.getFieldsValue(),
      }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(myUserBranches);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, form } = this.props;
    const valid = !this.hasErrors();
    const branchesError = this.getError('branches');
    const branches = form.getFieldValue('branches');
    const myBranchesIds = branches ? branches.map((branch) => branch.key) : [];

    return (
      <div className="my-users-branches">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="usersBranches-form"
        >
          <FormItem
            validateStatus={branchesError ? 'error' : ''}
            help={branchesError || ''}
            label="Selecione as unidades"
          >
            {getFieldDecorator('branches', {
              rules: [{ required: true, message: 'Please insert a Branches!' }],
            })(<AutocompleteBranches myBranchesIds={myBranchesIds} />)}
          </FormItem>
          <Row type="flex" justify="end" gutter={20}>
            <Col>
              <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            </Col>
            <Col>
              <Button
                loading={loading}
                disabled={!valid}
                onClick={() => this.handleSubmit()}
                type="primary"
              >
                {this.props.user ? 'Confirmar' : 'Adicionar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

UserBranchesForm.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default withFormCreate(UserBranchesForm);
