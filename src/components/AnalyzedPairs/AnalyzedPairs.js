import React, { PureComponent } from 'react';
import autoBindReact from 'auto-bind/react';
import PropTypes from 'prop-types';
import './style.css';

export default class AnalyzedPairs extends PureComponent {
  constructor(props) {
    super(props);

    autoBindReact(this);
  }

  handleForget(symbol) {
    const { onForget } = this.props;

    onForget(symbol);
  }

  handleSelect(symbol) {
    const { onSelect } = this.props;

    onSelect(symbol);
  }

  render() {
    const {
      symbols: { pairs: symbols },
    } = this.props;

    return (
      <div
        id="analyzedPairsRoot"
        className={symbols.length ? 'analyzed-pair-bg-color' : ''}
      >
        <div className="column">
          {symbols.map((symbol, index) => {
            const divClass =
              index !== symbols.length - 1 ? 'row md-margin-bottom' : 'row';

            return (
              <div className={divClass}>
                <button
                  className="analyzedPairButton"
                  key={symbol}
                  onClick={() => this.handleSelect(symbol)}
                >
                  {symbol}
                </button>
                <button
                  className="analyzedPairDeleteButton"
                  key={`${symbol}x`}
                  onClick={() => this.handleForget(symbol)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

AnalyzedPairs.propTypes = {
  onForget: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  // Using an object because when array updates are passed through props the
  // changes don't trigger lifecycle, so the component doesn't re-render.
  symbols: PropTypes.object,
};

AnalyzedPairs.defaultProps = {
  symbols: { pairs: [] },
};
