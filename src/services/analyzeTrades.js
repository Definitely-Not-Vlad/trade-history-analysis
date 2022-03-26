export default function analyzeTrades(history) {
  let amountPurchased = 0;
  let amountSold = 0;
  let bnbBuyFees = 0;
  let bnbSellFees = 0;
  let buyAsset;
  let buyFees = 0;
  let purchases = 0;
  let sales = 0;
  let sellAsset;
  let sellFees = 0;

  history.forEach(trade => {
    const {
      commission,
      commissionAsset,
      isBuyer,
      symbol,
      qty,
      quoteQty,
    } = trade;

    if (isBuyer) {
      let buyFee = 0;

      if (commissionAsset === 'BNB') {
        bnbBuyFees += parseFloat(commission);
      } else {
        buyFee = parseFloat(commission);
        buyFees += buyFee;
      }

      amountPurchased += parseFloat(qty) - buyFee;
      buyAsset = symbol.includes(commissionAsset) ? commissionAsset : buyAsset;
      purchases += parseFloat(quoteQty);
    } else {
      let sellFee = 0;

      if (commissionAsset === 'BNB') {
        bnbSellFees += parseFloat(commission);
      } else {
        sellFee = parseFloat(commission);
        sellFees += sellFee;
      }

      amountSold += parseFloat(qty);
      sales += parseFloat(quoteQty) - sellFee;
      sellAsset = symbol.includes(commissionAsset)
        ? commissionAsset
        : sellAsset;
      sellFees += sellFee;
    }

    if (!buyAsset && sellAsset) {
      buyAsset = symbol.replace(sellAsset, '');
    }

    if (!sellAsset && buyAsset) {
      sellAsset = symbol.replace(buyAsset, '');
    }
  });

  const averageBuy = purchases > 0 ? purchases / amountPurchased : 0;
  const averageSell = sales > 0 ? sales / amountSold : 0;
  const numberOfTrades = history.length;
  const profit = sales - purchases;

  return {
    amountPurchased,
    amountSold,
    averageBuy,
    averageSell,
    bnbBuyFees,
    bnbSellFees,
    buyAsset,
    buyFees,
    purchases,
    numberOfTrades,
    profit,
    sales,
    sellAsset,
    sellFees,
  };
}
