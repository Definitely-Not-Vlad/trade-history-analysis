import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import autoBindReact from 'auto-bind/react';
import PropTypes from 'prop-types';
import {
  clearCredentials,
  clearTradeHistory,
  getKey,
  getSecret,
} from '../../redux';
import './style.css';

export class ResetButton extends PureComponent {
  constructor(props) {
    super(props);

    autoBindReact(this);
  }

  reset() {
    const { clearCredentials, clearTradeHistory } = this.props;

    clearCredentials();
    clearTradeHistory();
  }

  render() {
    const { apiKey, secret } = this.props;

    if (apiKey || secret) {
      return (
        <button id="resetButton" onClick={this.reset} type="button">
          Reset API credentials and trades
        </button>
      );
    }

    return null;
  }
}

ResetButton.propTypes = {
  clearCredentials: PropTypes.func.isRequired,
  clearTradeHistory: PropTypes.func.isRequired,
  apiKey: PropTypes.string,
  secret: PropTypes.string,
};

ResetButton.defaultProps = {
  apiKey: '',
  secret: '',
};

const mapStateToProps = state => {
  return {
    apiKey: getKey(state),
    secret: getSecret(state),
  };
};

const mapDispatchToProps = { clearCredentials, clearTradeHistory };

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton);
