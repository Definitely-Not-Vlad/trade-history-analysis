import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class AnalysisDisplay extends PureComponent {
  static propTypes = {
    analysis: PropTypes.object,
  };

  static defaultProps = {
    analysis: {},
  };

  render() {
    const {
      analysis: {
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
      },
    } = this.props;

    return (
      <div id="analysisDisplayRoot">
        <div className="space-between row">
          <p>Bought</p>
          <p>
            {amountPurchased === 0
              ? `0 ${buyAsset}`
              : `${amountPurchased.toFixed(8)} ${buyAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Average buy price</p>
          <p>
            {averageBuy === 0
              ? `0 ${sellAsset}`
              : `${averageBuy.toFixed(8)} ${sellAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Total costs</p>
          <p>
            {purchases === 0
              ? `0 ${sellAsset}`
              : `${purchases.toFixed(8)} ${sellAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Buy fees</p>
          <p>
            {buyFees === 0
              ? `0 ${buyAsset}`
              : `${buyFees.toFixed(8)} ${buyAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>BNB buy fees</p>
          <p>{bnbBuyFees === 0 ? `0 BNB` : `${bnbBuyFees.toFixed(8)} BNB`}</p>
        </div>

        <div className="divider" />

        <div className="space-between row">
          <p>Sold</p>
          <p>
            {amountSold === 0
              ? `0 ${buyAsset}`
              : `${amountSold.toFixed(8)} ${buyAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Average sell price</p>
          <p>
            {averageSell === 0
              ? `0 ${sellAsset}`
              : `${averageSell.toFixed(8)} ${sellAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Total sales</p>
          <p>
            {sales === 0
              ? `0 ${sellAsset}`
              : `${sales.toFixed(8)} ${sellAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Sell fees</p>
          <p>
            {sellFees === 0
              ? `0 ${sellAsset}`
              : `${sellFees.toFixed(8)} ${sellAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>BNB sell fees</p>
          <p>{bnbSellFees === 0 ? `0 BNB` : `${bnbSellFees.toFixed(8)} BNB`}</p>
        </div>

        <div className="divider" />

        <div className="space-between row">
          <p>Profit</p>
          <p>
            {profit === 0
              ? `0 ${sellAsset}`
              : `${profit.toFixed(8)} ${sellAsset}`}
          </p>
        </div>
        <div className="space-between row">
          <p>Number of trades</p>
          <p>{numberOfTrades}</p>
        </div>
      </div>
    );
  }
}
