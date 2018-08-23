/**
 *
 * ReportFormFilterMessage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMetersFilter } from '../MetersTreeFilter/selectors';
import { RAW_DATA } from '../MetersTreeFilter/constants';
import './style.less';

class ReportFormFilterMessage extends Component {
  render() {
    const {
      filter: { scaleVisualization },
    } = this.props;
    if (scaleVisualization !== RAW_DATA) return null;
    return (
      <div className="report-form-filter-message">
        <Alert
          message="Atenção"
          description="Antes de criar uma exportação de dados brutos, lembre-se que os sensores da CUBi geram uma grande quantidade de dados diariamente. Arquivos brutos usualmente são arquivos grandes que não podem ser abertos e explorados em Excel e, portanto, requerem ferramentas específicas de análise de dados de alto volume. Caso necessite de ajuda, entre em contato com nossa equipe de Suporte."
          type="info"
          closeText="Fechar"
        />
      </div>
    );
  }
}

ReportFormFilterMessage.propTypes = {
  filter: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  filter: makeSelectMetersFilter(),
});

const mapDispatchToProps = {};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ReportFormFilterMessage);
