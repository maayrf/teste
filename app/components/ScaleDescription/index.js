/**
 *
 * ScaleDescription
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import {
  FIFTEEN_MINUTES,
  FIFTEEN_MINUTES_DESCRIPTION,
  ONE_DAY,
  ONE_DAY_DESCRIPTION,
  ONE_HOUR,
  ONE_HOUR_DESCRIPTION,
  ONE_MONTH,
  ONE_MONTH_DESCRIPTION,
  ONE_WEEK,
  ONE_WEEK_DESCRIPTION,
  RAW_DATA,
  RAW_DATA_DESCRIPTION,
  THIRTY_MINUTES,
  THIRTY_MINUTES_DESCRIPTION,
} from '../../containers/MetersTreeFilter/constants';

class ScaleDescription extends Component {
  state = {
    scaleDescription: '',
  };

  componentDidMount() {
    const { scaleVisualization } = this.props;
    this.renderDescription(scaleVisualization);
  }

  componentDidUpdate(prevProps) {
    const { scaleVisualization } = this.props;
    if (prevProps.scaleVisualization !== scaleVisualization) {
      return this.renderDescription(scaleVisualization);
    }
  }

  handleDescription = (scaleDescription) => {
    this.setState({
      scaleDescription,
    });
  };

  renderDescription(scaleVisualization) {
    const { descriptions } = this.props;
    if (!descriptions.includes(scaleVisualization)) return;
    let scaleDescription = '';
    switch (scaleVisualization) {
      case FIFTEEN_MINUTES:
        scaleDescription = FIFTEEN_MINUTES_DESCRIPTION;
        break;
      case THIRTY_MINUTES:
        scaleDescription = THIRTY_MINUTES_DESCRIPTION;
        break;
      case ONE_HOUR:
        scaleDescription = ONE_HOUR_DESCRIPTION;
        break;
      case ONE_DAY:
        scaleDescription = ONE_DAY_DESCRIPTION;
        break;
      case ONE_WEEK:
        scaleDescription = ONE_WEEK_DESCRIPTION;
        break;
      case ONE_MONTH:
        scaleDescription = ONE_MONTH_DESCRIPTION;
        break;
      case RAW_DATA:
        scaleDescription = RAW_DATA_DESCRIPTION;
        break;
      default:
        break;
    }
    return this.handleDescription(scaleDescription);
  }

  render() {
    const { scaleDescription } = this.state;
    const { scaleVisualization, showDescription } = this.props;

    if (!showDescription || !scaleVisualization) return null;

    return (
      <div className="scale-description">
        <p>{scaleDescription}</p>
      </div>
    );
  }
}

ScaleDescription.propTypes = {
  descriptions: PropTypes.array.isRequired,
  scaleVisualization: PropTypes.string,
  showDescription: PropTypes.bool.isRequired,
};

export default ScaleDescription;
