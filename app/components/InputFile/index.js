/**
 *
 * InputFile
 *
 */

import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import './style.less';

class InputFile extends Component {
  handleChange = ({ target: { value: path, files } }) => {
    const file = files[0];
    this.props.onChange({
      file,
      path,
    });
  };
  render() {
    return (
      <div className="input-file">
        <Input
          {...this.props}
          value={this.props.value.path}
          type="file"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

InputFile.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.shape({
    path: PropTypes.string,
    file: PropTypes.object,
  }),
};

InputFile.defaultProps = {
  onChange: () => {},
};

export default InputFile;
