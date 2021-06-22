import {
  CLEAR_CREDENTIALS,
  CLEAR_TRADE_HISTORY,
  FORGET_SYMBOL,
  SET_CREDENTIALS,
  SET_REMEMBER_CREDENTIALS,
  SET_TRADE_HISTORY_LOADING,
  UPDATE_TRADE_HISTORY,
} from './actionTypes';
import { fetchHistory } from '../services';

export function clearCredentials() {
  return { type: CLEAR_CREDENTIALS };
}

export function clearTradeHistory() {
  return { type: CLEAR_TRADE_HISTORY };
}

export function fetchTradeHistory(apiKey, secret, symbol) {
  return dispatch => {
    dispatch({ type: SET_TRADE_HISTORY_LOADING, payload: { loading: true } });

    fetchHistory(apiKey, secret, symbol)
      .then(response => {
        if (Math.sign(response.code) === -1) {
          return dispatch({
            type: UPDATE_TRADE_HISTORY,
            payload: {
              trades: [],
              error: response.msg,
              loading: false,
              symbol,
            },
          });
        }

        return dispatch({
          type: UPDATE_TRADE_HISTORY,
          payload: { trades: response, error: null, loading: false, symbol },
        });
      })
      .catch(error => {
        console.error('Failed to fetch trade history:', error);
        return dispatch({
          type: UPDATE_TRADE_HISTORY,
          payload: { trades: [], error, loading: false },
        });
      });
  };
}

export function forgetSymbol(symbol) {
  return {
    type: FORGET_SYMBOL,
    payload: { symbol },
  };
}

export function setCredentials(key, secret) {
  return {
    type: SET_CREDENTIALS,
    payload: { key, secret },
  };
}

export function setRememberCredentials(rememberCredentials) {
  return {
    type: SET_REMEMBER_CREDENTIALS,
    payload: { rememberCredentials },
  };
}
