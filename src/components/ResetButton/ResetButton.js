import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  clearCredentials,
  clearTradeHistory,
  getKey,
  getSecret,
} from '../../redux';
import './style.css';

export function ResetButton({
  apiKey,
  clearCredentials,
  clearTradeHistory,
  secret,
}) {
  const reset = useCallback(() => {
    clearCredentials();
    clearTradeHistory();
  }, [clearCredentials, clearTradeHistory]);

  if (apiKey && secret) {
    return (
      <button id="resetButton" onClick={reset} type="button">
        Reset API credentials and trades
      </button>
    );
  }

  return null;
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

function mapStateToProps(state) {
  return {
    apiKey: getKey(state),
    secret: getSecret(state),
  };
}

const mapDispatchToProps = { clearCredentials, clearTradeHistory };

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton);
