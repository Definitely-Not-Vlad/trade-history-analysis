export function getKey(state) {
  return state.credentials.key;
}

export function getRememberCredentials(state) {
  return state.credentials.rememberCredentials;
}

export function getSecret(state) {
  return state.credentials.secret;
}

export function getSymbolHistory(tradeHistory, symbol) {
  return tradeHistory[symbol] || [];
}

export function getSymbols(state) {
  return state.tradeHistory.symbols;
}

export function getTradeHistory(state) {
  return state.tradeHistory;
}

export function getTradeHistoryStatus(state) {
  return state.tradeHistory.loading;
}
