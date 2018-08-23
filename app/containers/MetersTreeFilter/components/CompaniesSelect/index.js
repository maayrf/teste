import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
import {
  getCompanyById,
  hasCompanyAtList,
  isSelectedCompany,
} from '../../utils';
const { Option, OptGroup } = Select;

export default class CompaniesSelect extends Component {
  componentDidMount() {
    const { loadCompanies } = this.props;
    loadCompanies();
  }
  handleChange = (companyId) => {
    const { selectCompany, companies } = this.props;
    const selectedCompany = getCompanyById(companyId, companies);
    selectCompany(selectedCompany);
  };

  renderCompaniesList = () => {
    const { companies } = this.props;
    return companies.map((company) => (
      <Option value={company.id} key={company.id}>
        {company.tradename}
      </Option>
    ));
  };

  render() {
    const { companies, selectedCompany } = this.props;
    if (!hasCompanyAtList(companies)) {
      return (
        <div className="_margin-bottom">
          <h2> Não há empresas cadastradas. </h2>
        </div>
      );
    }

    return (
      <div>
        <p />
        <div className="_margin-bottom">
          <h2>Selecione uma empresa: </h2>
        </div>
        <Select
          defaultValue={
            isSelectedCompany(selectedCompany) ? selectedCompany.id : null
          }
          style={{ width: 300 }}
          onChange={this.handleChange}
        >
          {this.renderCompaniesList(companies)}
        </Select>
      </div>
    );
  }
}

CompaniesSelect.propTypes = {
  onLoadMeters: PropTypes.func.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  selectCompany: PropTypes.func.isRequired,
  companies: PropTypes.array,
  selectedCompany: PropTypes.object,
};
