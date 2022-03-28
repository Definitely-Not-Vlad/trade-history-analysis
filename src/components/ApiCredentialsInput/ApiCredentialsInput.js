import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getRememberCredentials,
  setCredentials,
  setRememberCredentials,
} from '../../redux';
import './style.css';

function ApiCredentialsInput({
  rememberCredentials,
  setCredentials,
  setRememberCredentials,
}) {
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');

  const handleRememberToggle = useCallback(
    event => setRememberCredentials(event?.target?.checked),
    [setRememberCredentials],
  );

  function handleKeyChange(event) {
    event.preventDefault();
    setApiKey(event?.target?.value || '');
  }

  function handleSetCredentials() {
    setCredentials(apiKey, secret);
  }

  function handleSecretChange(event) {
    event.preventDefault();
    setSecret(event?.target?.value || '');
  }

  const continueDisabled = !(apiKey.length === 64 && secret.length === 64);

  return (
    <div id="credentialsRoot">
      <p className="instructions">
        A guide on how to create an API key can be found here:
      </p>
      <p className="instructions-link lg-margin-vertical">
        https://www.binance.com/en/support/faq/360002502072
      </p>
      <p className="instructions">
        The key requires <span className="note">Can Read</span> and{' '}
        <span className="note">Enable Spot & Margin Trading</span>
        <span className="disclaimer-color">*</span> access.
      </p>
      <input
        className="long-input big-margin-top"
        onChange={handleKeyChange}
        placeholder="API key"
        type="password"
        value={apiKey}
      />
      <input
        className="long-input lg-margin-top"
        onChange={handleSecretChange}
        placeholder="API secret"
        type="password"
        value={secret}
      />
      <div className="row md-margin-top">
        <label>
          Remember my key and secret{' '}
          <span style={{ color: 'red' }}>(not recommended)</span>
        </label>
        <input
          checked={rememberCredentials}
          onChange={handleRememberToggle}
          type="checkbox"
        />
      </div>
      <button
        disabled={continueDisabled}
        id="continueButton"
        className={
          continueDisabled
            ? 'inactive-credentials-button lg-margin-top'
            : 'active-credentials-button lg-margin-top'
        }
        onClick={handleSetCredentials}
        type="button"
      >
        Continue
      </button>
      <p id="disclaimer">
        *Trade History Analysis (THA), as written and distributed by
        Definitely-Not-Vlad, does not perform trades or send any user
        information via network requests. The only network request THA sends is
        a GET request for the user&apos;s trade history for a given trade pair
        (e.g. BTC/USDT). Before using THA the user should enable IP restrictions
        for their API key so only they can utilize it.
      </p>
    </div>
  );
}

ApiCredentialsInput.propTypes = {
  rememberCredentials: PropTypes.bool.isRequired,
  setCredentials: PropTypes.func.isRequired,
  setRememberCredentials: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    rememberCredentials: getRememberCredentials(state),
  };
}

const mapDispatchToProps = {
  setCredentials,
  setRememberCredentials,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApiCredentialsInput);
