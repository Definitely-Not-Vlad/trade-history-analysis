import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
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
import { AnalysisDisplay, AnalyzedPairs } from '..';
import './style.css';

export function Analyzer({
  apiKey,
  fetchInProgress,
  fetchTradeHistory,
  forgetSymbol,
  secret,
  symbols,
  tradeHistory,
}) {
  const { error } = tradeHistory;

  const [fetchedPair, setFetchedPair] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [pair, setPair] = useState('');

  const purgeSymbol = useCallback(symbol => {
    return symbol.replace('/', '');
  }, []);

  const fetchHistoryForSymbol = useCallback(() => {
    fetchTradeHistory(apiKey, secret, purgeSymbol(pair));
    setFetchedPair(pair);
    setHasChanges(false);
  }, [
    apiKey,
    fetchTradeHistory,
    pair,
    purgeSymbol,
    secret,
    setFetchedPair,
    setHasChanges,
  ]);

  const removeSymbol = useCallback(symbol => forgetSymbol(symbol), [
    forgetSymbol,
  ]);

  const selectSymbol = useCallback(
    symbol => {
      setFetchedPair(symbol);
      setPair(symbol);
      setHasChanges(false);
    },
    [setFetchedPair, setHasChanges, setPair],
  );

  const handleEnterKeyPress = useCallback(
    event => {
      if (event.key === 'Enter' && hasChanges && pair) {
        fetchHistoryForSymbol();
      }
    },
    [fetchHistoryForSymbol, hasChanges, pair],
  );

  function handlePairChange(event) {
    event.preventDefault();
    setPair(event?.target?.value.toUpperCase());
    setHasChanges(true);
  }

  const history = fetchedPair
    ? getSymbolHistory(tradeHistory, purgeSymbol(fetchedPair))
    : [];

  const showTrades = !error && fetchedPair && history && !!symbols.length;
  const analysis = showTrades && !!history.length ? analyzeTrades(history) : {};
  const analyzeDisabled = !pair || !hasChanges;
  const refreshDisabled = !fetchedPair || hasChanges;

  return (
    <div id="analyzerRoot">
      <div id="analyzerLeft">
        <div className="space-between row">
          <input
            className="short-input"
            onChange={handlePairChange}
            onKeyDown={handleEnterKeyPress}
            placeholder="Pair (e.g. BTC/USDT)"
            value={pair}
          />
          <button
            className={
              analyzeDisabled
                ? 'inactiveAnalyzerButton'
                : 'activeAnalyzerButton'
            }
            disabled={analyzeDisabled}
            id="analyzeButton"
            onClick={fetchHistoryForSymbol}
            type="button"
          >
            Analyze
          </button>
          <button
            className={
              refreshDisabled
                ? 'inactiveAnalyzerButton'
                : 'activeAnalyzerButton'
            }
            disabled={refreshDisabled}
            id="refreshButton"
            onClick={fetchHistoryForSymbol}
            type="button"
          >
            Refresh
          </button>
        </div>
        <br />
        {fetchInProgress && (
          <p>Loading trade history for &apos;{fetchedPair}&apos;...</p>
        )}
        {!fetchInProgress && showTrades && (
          <div>
            {!!history.length && <AnalysisDisplay analysis={analysis} />}
            {!history.length && (
              <p>Could not find any trades for &apos;{fetchedPair}&apos;.</p>
            )}
          </div>
        )}
        {!fetchInProgress && !!error && (
          <p>
            Failed to fetch trading history for &apos;{fetchedPair}&apos;.
            <br />
            <br />
            API error: {error}
          </p>
        )}
      </div>
      <div id="analyzerRight">
        <AnalyzedPairs
          onForget={removeSymbol}
          onSelect={selectSymbol}
          symbols={{ pairs: symbols }}
        />
      </div>
      <p id="liteAppNote">
        Trades made on the Binance Lite app will not be part of the analysis
        because this information is not stored in the account&apos;s trade
        history.
      </p>
    </div>
  );
}

Analyzer.propTypes = {
  apiKey: PropTypes.string.isRequired,
  fetchTradeHistory: PropTypes.func.isRequired,
  forgetSymbol: PropTypes.func.isRequired,
  secret: PropTypes.string.isRequired,
  fetchInProgress: PropTypes.bool,
  symbols: PropTypes.array,
  tradeHistory: PropTypes.object,
};

Analyzer.defaultProps = {
  fetchInProgress: false,
  symbols: [],
  tradeHistory: {},
};

function mapStateToProps(state) {
  return {
    apiKey: getKey(state),
    fetchInProgress: getTradeHistoryStatus(state),
    secret: getSecret(state),
    symbols: getSymbols(state),
    tradeHistory: getTradeHistory(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchTradeHistory,
      forgetSymbol,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer);
