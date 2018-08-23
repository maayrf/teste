/**
 *
 * Meter Page
 *
 */
import React, { Component } from 'react';
import { Card, Icon, notification, Layout } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './style.less';
import reducer from './reducer';
import saga from './saga';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectMoveMeterLoading,
  makeSelectPendingMeters,
  selectLoadingPendingMetersAndMeters,
} from './selectors';
import { loadPendingMeters, moveMeter } from './actions';
import MetersSortableTree from '../../components/MetersSortableTree/index';
import CompaniesSelectContainer from '../CompaniesSelectContainer';
import MeterDetailWithRouter from '../MeterDetailWithRouter';
import BranchListContainer from '../BranchListContainer';
import { withLoginUser } from '../../utils/withLoginUser';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';
import { removeConsumptionFareForm } from '../ConsumptionFareFormContainer/actions';
import LoadingCard from '../../components/LoadingCard';

const { Content, Sider } = Layout;

class MeterManager extends Component {
  state = {
    filter: {},
  };

  componentDidMount() {
    if (!this.isUserRoot()) {
      this.props.loadPendingMeters();
    }
  }

  componentDidUpdate() {
    if (!this.props.error) {
      return;
    }
    const style = { color: '#FF0000' };
    notification.open({
      message: 'Error',
      description: this.props.error.toString(),
      icon: <Icon type="frown-o" style={style} />,
    });
  }
  onClick = (selectedMeter) => {
    const { history, match } = this.props;
    let urlToPush = '';
    switch (selectedMeter.className) {
      case 'Grouping':
        urlToPush = `grupo/${selectedMeter.id}`;
        break;
      case 'Branch':
        urlToPush = `unidade/${selectedMeter.id}`;
        break;
      case 'Egg':
        urlToPush = `egg/${selectedMeter.id}/informacoes-gerais`;
        break;
      default:
    }
    history.push(`${match.url}/${urlToPush}`);
  };
  onChange = (meter, parent) => {
    this.props.moveMeter(meter.data, parent.data);
  };
  getFilter = () => ({
    ...this.state.filter,
    withEggs: 1,
  });
  handleChangeCompany = (value) => {
    const { history, match } = this.props;
    history.push(match.url);
    if (value === '') {
      return;
    }
    const newFilter = {
      ...this.state.filter,
      SearchCompanyId: value,
    };
    this.setState({
      filter: newFilter,
    });
    this.props.loadPendingMeters(newFilter);
  };
  isUserRoot = () => this.props.user.role === 'root';
  renderMeterSortableTree = () => {
    const { pendingMeters, moveMeterLoading } = this.props;
    const filter = this.getFilter();

    if (this.isUserRoot()) {
      const { SearchCompanyId } = this.state.filter;
      return (
        <div>
          <div style={{ width: '200px' }}>
            <h3>Selecione uma empresa</h3>
            <CompaniesSelectContainer
              value={SearchCompanyId}
              onChange={this.handleChangeCompany}
            />
          </div>
          {SearchCompanyId && (
            <LoadingCard loading={moveMeterLoading}>
              <BranchListContainer
                limit={null}
                onClick={this.onClick}
                onChange={this.onChange}
                pendingMeters={pendingMeters}
                valuePropName="meters"
                component={MetersSortableTree}
                filter={filter}
              />
            </LoadingCard>
          )}
        </div>
      );
    }
    return (
      <LoadingCard loading={moveMeterLoading}>
        <BranchListContainer
          pagination={false}
          onClick={this.onClick}
          onChange={this.onChange}
          pendingMeters={pendingMeters}
          valuePropName="meters"
          component={MetersSortableTree}
          filter={filter}
          limit={null}
        />
      </LoadingCard>
    );
  };
  render() {
    const { loading } = this.props;
    return (
      <Card className="card-no-padding card-no-border" loading={loading}>
        <Layout>
          <Sider width={400} className="sidebar-white">
            {this.renderMeterSortableTree()}
          </Sider>
          <Content>
            <MeterDetailWithRouter />
          </Content>
        </Layout>
      </Card>
    );
  }
}

MeterManager.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  moveMeterLoading: PropTypes.bool.isRequired,
  moveMeter: PropTypes.func.isRequired,
  loadPendingMeters: PropTypes.func.isRequired,
  pendingMeters: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: selectLoadingPendingMetersAndMeters,
  pendingMeters: makeSelectPendingMeters(),
  moveMeterLoading: makeSelectMoveMeterLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadPendingMeters: (params) => dispatch(loadPendingMeters(params)),
  moveMeter: dispatchWithPromise(dispatch, moveMeter),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'pendingMeters', reducer });
const withSaga = injectSaga({ key: 'pendingMeters', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
  withLoginUser
)(MeterManager);
