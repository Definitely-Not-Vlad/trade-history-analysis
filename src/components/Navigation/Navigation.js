import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  clearCredentials,
  clearTradeHistory,
  getKey,
  getRememberCredentials,
  getSecret,
} from '../../redux';
import { Analyzer, ApiCredentialsInput } from '..';
import './style.css';

export class Navigation extends PureComponent {
  static propTypes = {
    apiKey: PropTypes.string,
    clearCredentials: PropTypes.func,
    clearTradeHistory: PropTypes.func,
    rememberCredentials: PropTypes.bool,
    secret: PropTypes.string,
  };

  componentDidMount() {
    const { rememberCredentials } = this.props;

    if (!rememberCredentials) {
      const { clearCredentials, clearTradeHistory } = this.props;

      clearCredentials();
      clearTradeHistory();
    }
  }

  componentWillUnmount() {
    const { rememberCredentials } = this.props;

    if (!rememberCredentials) {
      const { clearCredentials, clearTradeHistory } = this.props;

      clearCredentials();
      clearTradeHistory();
    }
  }

  render() {
    const { apiKey, secret } = this.props;

    return (
      <div id="navigationRoot" className="md-padding">
        {apiKey && secret && <Analyzer />}
        {(!apiKey || !secret) && <ApiCredentialsInput />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiKey: getKey(state),
    rememberCredentials: getRememberCredentials(state),
    secret: getSecret(state),
  };
};

const mapDispatchToProps = { clearCredentials, clearTradeHistory };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
