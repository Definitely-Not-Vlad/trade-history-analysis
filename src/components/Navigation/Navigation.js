import React, { useEffect } from 'react';
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

export function Navigation({
  apiKey,
  clearCredentials,
  clearTradeHistory,
  rememberCredentials,
  secret,
}) {
  useEffect(() => {
    if (!rememberCredentials) {
      clearCredentials();
      clearTradeHistory();
    }
  }, [clearCredentials, clearTradeHistory, rememberCredentials]);

  return (
    <div id="navigationRoot" className="md-padding">
      {apiKey && secret && <Analyzer />}
      {(!apiKey || !secret) && <ApiCredentialsInput />}
    </div>
  );
}

Navigation.propTypes = {
  clearCredentials: PropTypes.func.isRequired,
  clearTradeHistory: PropTypes.func.isRequired,
  apiKey: PropTypes.string,
  rememberCredentials: PropTypes.bool,
  secret: PropTypes.string,
};

Navigation.defaultProps = {
  apiKey: '',
  rememberCredentials: false,
  secret: '',
};

function mapStateToProps(state) {
  return {
    apiKey: getKey(state),
    rememberCredentials: getRememberCredentials(state),
    secret: getSecret(state),
  };
}

const mapDispatchToProps = { clearCredentials, clearTradeHistory };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
