const Crypto = require('crypto-js');
const Uri = require('urijs');

function sign(queryString, secret) {
  return Crypto.createHmac('sha256', secret)
    .update(queryString)
    .digest('hex');
}

export default function fetchHistory(key, secret, symbol) {
  const timestamp = Date.now();
  const queryString = `timestamp=${timestamp}&symbol=${symbol}`;
  const signature = sign(queryString, secret);
  const params = {
    timestamp,
    symbol,
    signature,
  };

  const url = new Uri('/api/v3/myTrades')
    .protocol('https')
    .host('api.binance.com')
    .query(params)
    .toString();

  return new Promise((resolve, reject) => {
    window
      .fetch(url, {
        method: 'GET',
        headers: {
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
          'X-MBX-APIKEY': key,
        },
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });
}
