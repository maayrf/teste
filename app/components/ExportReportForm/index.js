/**
 *
 * Export Report Form
 *
 */
import React, { Component } from 'react';
import {
  Row,
  Col,
  Radio,
  Form,
  Input,
  Button,
  Alert,
  Card,
  DatePicker,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import SelectMetersButtonContainer from '../../containers/SelectMetersButtonContainer';

import { DEFAULT_SCALE_VISUALIZATION_OPTIONS } from './constants';
import { RAW_DATA } from '../../containers/MetersTreeFilter/constants';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ExportReportForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  getInitialValue(prop) {
    return this.props.exportReport[prop] || null;
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  handleDisabledDate = (dayValue) => {
    if (
      dayValue.isSameOrAfter(moment()
        .minutes(0)
        .seconds(0)
        .hours(0))
    ) {
      return true;
    }
    return false;
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return false;
    }
    const metersTreeFilterForReportData = this.props.form.getFieldsValue();
    this.props.onSubmit(metersTreeFilterForReportData);
    return false;
  };
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }

  validateFileName = (rule, value, callback) => {
    if (!value) {
      callback('Informe o nome do arquivo!!');
    }
    if (value && !value.trim().length) {
      callback('Informe o nome do arquivo!!');
    }
    callback();
  };
  render() {
    const { scaleVisualizationOptions, loading } = this.props;
    const { scaleVisualization } = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;
    const nameError = this.getError('name');

    return (
      <Card className="_margin-bottom">
        <Form>
          <Row type="flex" gutter={30} align="middle">
            <Col>
              {getFieldDecorator('selectMetersButton', {
                initialValue: this.getInitialValue('selectMetersButton'),
                rules: [
                  {
                    validator: (rule, { checkedMeters }, cb) => {
                      if (!checkedMeters.length) {
                        cb('Deve selecionar pelo menos um medidor');
                      } else {
                        cb();
                      }
                    },
                  },
                ],
              })(<SelectMetersButtonContainer />)}
            </Col>
            <Col>
              <Row type="flex" gutter={20}>
                <Col>
                  <h3>Escala</h3>
                  {getFieldDecorator('scaleVisualization', {
                    initialValue: this.getInitialValue('scaleVisualization'),
                    rules: [{ required: true, message: 'Informe uma escala!' }],
                  })(<RadioGroup options={scaleVisualizationOptions} />)}
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Row
                        type="flex"
                        justify="start"
                        align="middle"
                        gutter={80}
                      >
                        <h4>Data de Início</h4>
                        <h4>Data de Fim</h4>
                      </Row>
                      {getFieldDecorator('rangeDates', {
                        initialValue: this.getInitialValue('rangeDates'),
                        rules: [
                          {
                            validator: (rule, [startDate, endDate], cb) => {
                              if (!startDate || !endDate) {
                                cb('Deve ser preenchido a data inicial e a data final');
                              } else {
                                cb();
                              }
                            },
                          },
                        ],
                      })(<RangePicker
                        onCalendarChange={this.onCalendarChange}
                        disabledDate={this.handleDisabledDate}
                        onChange={this.onChangeRangePicker}
                        format="DD/MM/YYYY"
                      />)}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ margin: 0 }} type="flex" align="bottom">
            <Col md={20}>
              <FormItem
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
                label="Nome do Arquivo"
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      validator: this.validateFileName,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={4}>
              <FormItem>
                <Button
                  loading={loading}
                  disabled={this.hasErrors()}
                  onClick={() => this.handleSubmit()}
                  type="primary"
                >
                  Exportar
                </Button>
              </FormItem>
            </Col>
          </Row>
          {scaleVisualization === RAW_DATA && (
            <Alert
              message="Atenção"
              description="Antes de criar uma exportação de dados brutos, lembre-se que os sensores da CUBi geram uma grande quantidade de dados diariamente. Arquivos brutos usualmente são arquivos grandes que não podem ser abertos e explorados em Excel e, portanto, requerem ferramentas específicas de análise de dados de alto volume. Caso necessite de ajuda, entre em contato com nossa equipe de Suporte."
              type="info"
              closeText="Fechar"
            />
          )}
        </Form>
      </Card>
    );
  }
}

ExportReportForm.defaultProps = {
  exportReport: {
    scaleVisualization: null,
    selectMetersButton: {
      companyId: null,
      checkedMeters: [],
    },
    rangeDates: [null, null],
  },
  scaleVisualizationOptions: DEFAULT_SCALE_VISUALIZATION_OPTIONS,
};

ExportReportForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  exportReport: PropTypes.shape({
    scaleVisualization: PropTypes.string,
    selectMetersButton: PropTypes.shape({
      companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      checkedMeters: PropTypes.array,
    }),
    rangeDates: PropTypes.array,
  }),
  scaleVisualizationOptions: PropTypes.array,
};

const withFormCreate = Form.create();
export default withFormCreate(ExportReportForm);
