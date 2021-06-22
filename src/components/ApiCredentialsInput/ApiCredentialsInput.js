import React, { PureComponent } from 'react';
import autoBindReact from 'auto-bind/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';
import { setCredentials, setRememberCredentials } from '../../redux';

class ApiCredentialsInput extends PureComponent {
  static propTypes = {
    setCredentials: PropTypes.func,
    setRememberCredentials: PropTypes.func,
  };

  constructor(props) {
    super(props);

    autoBindReact(this);

    this.state = {
      apiKey: '',
      secret: '',
      rememberCredentials: false,
    };
  }

  handleKeyChange(event) {
    event.preventDefault();
    this.setState({ apiKey: event?.target?.value || '' });
  }

  handleRememberToggle(event) {
    const { setRememberCredentials } = this.props;

    const rememberCredentials = event?.target?.checked;

    this.setState({ rememberCredentials });
    setRememberCredentials(rememberCredentials);
  }

  handleSecretChange(event) {
    event.preventDefault();
    this.setState({ secret: event?.target?.value || '' });
  }

  handleSetCredentials() {
    const { setCredentials } = this.props;
    const { apiKey, secret } = this.state;

    setCredentials(apiKey, secret);
  }

  isContinueDisabled() {
    const { apiKey, secret } = this.state;

    if (apiKey.length === 64 && secret.length === 64) {
      return false;
    }

    return true;
  }

  render() {
    const { apiKey, secret, rememberCredentials } = this.state;

    const continueDisabled = this.isContinueDisabled();

    return (
      <div id="credentialsRoot">
        <p class="instructions">
          A guide on how to create an API key can be found here:
        </p>
        <p class="instructions-link lg-margin-vertical">
          https://www.binance.com/en/support/faq/360002502072
        </p>
        <p class="instructions">
          The key requires <span class="note">Can Read</span> and{' '}
          <span class="note">Enable Spot & Margin Trading</span>
          <span class="disclaimer-color">*</span> access.
        </p>
        <input
          class="long-input big-margin-top"
          onChange={this.handleKeyChange}
          placeholder="API key"
          type="password"
          value={apiKey}
        />
        <input
          class="long-input lg-margin-top"
          onChange={this.handleSecretChange}
          placeholder="API secret"
          type="password"
          value={secret}
        />
        <div class="row md-margin-top">
          <label>
            Remember my key and secret{' '}
            <span style={{ color: 'red' }}>(not recommended)</span>
          </label>
          <input
            checked={rememberCredentials}
            onChange={this.handleRememberToggle}
            type="checkbox"
          />
        </div>
        <button
          disabled={continueDisabled}
          id="continueButton"
          class={
            continueDisabled
              ? 'inactive-credentials-button lg-margin-top'
              : 'active-credentials-button lg-margin-top'
          }
          onClick={this.handleSetCredentials}
        >
          Continue
        </button>
        <p id="disclaimer">
          *Trade History Analysis (THA), as written and distributed by
          Definitely-Not-Vlad, does not perform trades or send any user
          information via network requests. The only network request THA sends
          is a GET request for the user's trade history for a given trade pair
          (e.g. BTC/USDT). Before using THA the user should enable IP
          restrictions for their API key so only they can utilize it.
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCredentials,
  setRememberCredentials,
};

export default connect(null, mapDispatchToProps)(ApiCredentialsInput);
