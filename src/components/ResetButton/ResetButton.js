import React, { PureComponent } from 'react';
import autoBindReact from 'auto-bind/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';
import {
  clearCredentials,
  clearTradeHistory,
  getKey,
  getSecret,
} from '../../redux';

export class ResetButton extends PureComponent {
  static propTypes = {
    apiKey: PropTypes.string,
    clearCredentials: PropTypes.func,
    clearTradeHistory: PropTypes.func,
    secret: PropTypes.string,
  };

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
        <button id="resetButton" onClick={this.reset}>
          Reset API credentials and trades
        </button>
      );
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    apiKey: getKey(state),
    secret: getSecret(state),
  };
};

const mapDispatchToProps = { clearCredentials, clearTradeHistory };

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton);
