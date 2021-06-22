import React, { PureComponent } from 'react';
import autoBindReact from 'auto-bind/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';
import {
  clearTradeHistory,
  fetchTradeHistory,
  forgetSymbol,
  getKey,
  getSecret,
  getSymbolHistory,
  getSymbols,
  getTradeHistory,
  getTradeHistoryStatus,
} from '../../redux';
import { analyzeTrades } from '../../services';
import { AnalysisDisplay, AnalyzedPairs } from '../';

export class Analyzer extends PureComponent {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    clearTradeHistory: PropTypes.func,
    fetchTradeHistory: PropTypes.func,
    forgetSymbol: PropTypes.func,
    secret: PropTypes.string.isRequired,
    symbols: PropTypes.array,
    tradeHistory: PropTypes.object,
  };

  constructor(props) {
    super(props);

    autoBindReact(this);

    this.state = {
      fetchedPair: '',
      hasChanges: false,
      pair: '',
    };
  }

  purgeSymbol(symbol) {
    return symbol.replace('/', '');
  }

  fetchHistoryForSymbol() {
    const { apiKey, fetchTradeHistory, secret } = this.props;
    const { pair } = this.state;

    fetchTradeHistory(apiKey, secret, this.purgeSymbol(pair));
    this.setState({ fetchedPair: pair, hasChanges: false });
  }

  removeSymbol(symbol) {
    const { forgetSymbol } = this.props;

    forgetSymbol(symbol);
  }

  selectSymbol(symbol) {
    this.setState({ fetchedPair: symbol, pair: symbol, hasChanges: false });
  }

  handlePairChange(event) {
    event.preventDefault();
    this.setState({
      pair: event?.target?.value.toUpperCase(),
      hasChanges: true,
    });
  }

  handleEnterKeyPress(event) {
    const { hasChanges, pair } = this.state;

    if (event.key === 'Enter' && hasChanges && pair) {
      this.fetchHistoryForSymbol();
    }
  }

  render() {
    const {
      fetchInProgress,
      tradeHistory,
      tradeHistory: { error },
      symbols,
    } = this.props;
    const { fetchedPair, hasChanges, pair } = this.state;

    const history = fetchedPair
      ? getSymbolHistory(tradeHistory, this.purgeSymbol(fetchedPair))
      : [];

    const showTrades = !error && fetchedPair && history && !!symbols.length;
    const analysis =
      showTrades && !!history.length ? analyzeTrades(history) : {};
    const analyzeDisabled = !pair || !hasChanges;
    const refreshDisabled = !fetchedPair || hasChanges;

    return (
      <div id="analyzerRoot">
        <div id="analyzerLeft">
          <div class="space-between row">
            <input
              class="short-input"
              onChange={this.handlePairChange}
              onKeyDown={this.handleEnterKeyPress}
              placeholder="Pair (e.g. BTC/USDT)"
              value={pair}
            />
            <button
              class={
                analyzeDisabled
                  ? 'inactiveAnalyzerButton'
                  : 'activeAnalyzerButton'
              }
              disabled={analyzeDisabled}
              id="analyzeButton"
              onClick={this.fetchHistoryForSymbol}
            >
              Analyze
            </button>
            <button
              class={
                refreshDisabled
                  ? 'inactiveAnalyzerButton'
                  : 'activeAnalyzerButton'
              }
              disabled={refreshDisabled}
              id="refreshButton"
              onClick={this.fetchHistoryForSymbol}
            >
              Refresh
            </button>
          </div>
          <br />
          {fetchInProgress && (
            <p>Loading trade history for '{fetchedPair}'...</p>
          )}
          {!fetchInProgress && showTrades && (
            <div>
              {!!history.length && <AnalysisDisplay analysis={analysis} />}
              {!history.length && (
                <p>Could not find any trades for '{fetchedPair}'.</p>
              )}
            </div>
          )}
          {!fetchInProgress && !!error && (
            <p>
              Failed to fetch trading history for '{fetchedPair}'.
              <br />
              <br />
              API error: {error}
            </p>
          )}
        </div>
        <div id="analyzerRight">
          <AnalyzedPairs
            onForget={this.removeSymbol}
            onSelect={this.selectSymbol}
            symbols={{ pairs: symbols }}
          />
        </div>
        <p id="liteAppNote">
          Trades made on the Binance Lite app will not be part of the analysis
          because this information is not stored in the account's trade history.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiKey: getKey(state),
    fetchInProgress: getTradeHistoryStatus(state),
    secret: getSecret(state),
    symbols: getSymbols(state),
    tradeHistory: getTradeHistory(state),
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearTradeHistory,
      fetchTradeHistory,
      forgetSymbol,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer);
