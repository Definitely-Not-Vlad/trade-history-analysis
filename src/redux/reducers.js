import { combineReducers } from 'redux';
import {
  CLEAR_CREDENTIALS,
  CLEAR_TRADE_HISTORY,
  FORGET_SYMBOL,
  SET_CREDENTIALS,
  SET_REMEMBER_CREDENTIALS,
  SET_TRADE_HISTORY_LOADING,
  UPDATE_TRADE_HISTORY,
} from './actionTypes';

const defaultCredentialsState = {
  key: undefined,
  secret: undefined,
  rememberCredentials: false,
};
function credentials(state = defaultCredentialsState, action) {
  switch (action.type) {
    case CLEAR_CREDENTIALS:
      return defaultCredentialsState;
    case SET_CREDENTIALS:
      return {
        ...state,
        key: action.payload.key,
        secret: action.payload.secret,
      };
    case SET_REMEMBER_CREDENTIALS:
      return {
        ...state,
        rememberCredentials: action.payload.rememberCredentials,
      };
    default:
      return state;
  }
}

const defaultTradeHistoryState = { error: null, loading: false, symbols: [] };
function tradeHistory(state = defaultTradeHistoryState, action) {
  switch (action.type) {
    case CLEAR_TRADE_HISTORY:
      return defaultTradeHistoryState;
    case FORGET_SYMBOL: {
      const {
        [action.payload.symbol]: removedSymbol,
        symbols,
        ...withoutSymbol
      } = state;

      const symbolIndex = symbols.indexOf(removedSymbol);
      const newSymbols = [...symbols];
      newSymbols.splice(symbolIndex, 1);

      return { ...withoutSymbol, symbols: newSymbols };
    }
    case SET_TRADE_HISTORY_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case UPDATE_TRADE_HISTORY: {
      const newSymbols = state.symbols || [];

      if (
        !action.payload.error &&
        action.payload.symbol &&
        newSymbols.indexOf(action.payload.symbol) === -1
      ) {
        newSymbols.push(action.payload.symbol);
      }

      return {
        ...state,
        error: action.payload.error,
        [action.payload.symbol]: action.payload.trades,
        loading: !!action.payload.loading,
        symbols: newSymbols,
      };
    }
    default:
      return state;
  }
}

const tradeHistoryAnalysis = combineReducers({ credentials, tradeHistory });

export default tradeHistoryAnalysis;
