import { Form, Button, Upload, Icon, message, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import {
  ALLOWED_IMAGE_TYPES_LIST,
  FILE_TYPE_ERROR_MESSAGE,
  VALID_HEIGHT,
  VALID_WIDTH,
  WIDHT_AND_HEIGHT_ERROR_MESSAGE,
} from './constants';
const FormItem = Form.Item;

class UploadLogoForm extends React.Component {
  state = {
    previewImage: null,
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const file = values.upload[0].originFileObj;
        const data = new FormData();
        data.append('photo', file);
        this.props.onSubmit(data);
      }
    });
  };

  renderPreviewPic = () => {
    const { previewImage } = this.state;
    if (!previewImage) return null;
    return (
      <img
        alt="logo da empresa"
        className="logo _margin-top-medium"
        src={previewImage}
      />
    );
  };

  handlePreviewImage = (param) => {
    this.setState({ previewImage: param });
  };

  validateImageType = (file) => {
    if (!ALLOWED_IMAGE_TYPES_LIST.includes(file.type)) {
      message.error(FILE_TYPE_ERROR_MESSAGE);
      return false;
    }
    return true;
  };

  validateImageSize = (file) => {
    const isSizeOk = file.size / 1024 / 1024 <= 1;
    if (!isSizeOk) {
      message.error('Imagem deve ter no máximo 1MB!');
      return false;
    }
    return true;
  };

  validateWidthAndHeight = (file, previewImage) => {
    const imageProps = new Image();
    imageProps.src = window.URL.createObjectURL(file);
    imageProps.onload = () => {
      const { width, height } = imageProps;
      if (!(width <= VALID_WIDTH) || !(height <= VALID_HEIGHT)) {
        message.error(WIDHT_AND_HEIGHT_ERROR_MESSAGE);
        return null;
      }
      this.handlePreviewImage(previewImage);
      return null;
    };
  };

  handleFile = (e) => {
    const { file } = e;
    if (!this.validateImageType(file)) return;
    if (!this.validateImageSize(file)) return;
    this.getBase64(e.file.originFileObj, (previewImage) => {
      this.validateWidthAndHeight(e.file.originFileObj, previewImage);
    });

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  customRequest = () => {};

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { previewImage } = this.state;
    const { loading } = this.props;
    const valid = !!previewImage;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          this.handleSubmit();
        }}
      >
        <Row type="flex" align="center" className="_margin-bottom">
          <FormItem {...formItemLayout} label="">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.handleFile,
            })(<Upload
              name="logo"
              action="/upload.do"
              customRequest={this.customRequest}
              showUploadList={false}
            >
              <Row>
                <Button>
                  <Icon type="upload" /> Clique aqui para escolher uma imagem
                </Button>
              </Row>
              <Row>{this.renderPreviewPic()}</Row>
            </Upload>)}
          </FormItem>
        </Row>

        <Row type="flex" justify="end">
          <Button onClick={() => this.handleCancel()}>Cancelar</Button>
          <Button
            loading={loading}
            disabled={!valid}
            onClick={() => this.handleSubmit()}
            type="primary"
          >
            Confirmar
          </Button>
        </Row>
      </Form>
    );
  }
}

const withFormCreate = Form.create();
export default compose(withFormCreate)(UploadLogoForm);

UploadLogoForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
