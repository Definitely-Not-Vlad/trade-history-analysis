import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function AnalyzedPairs({ onForget, onSelect, symbols }) {
  const handleForget = useCallback(symbol => onForget(symbol), [onForget]);
  const handleSelect = useCallback(symbol => onSelect(symbol), [onSelect]);

  const { pairs } = symbols;

  return (
    <div
      id="analyzedPairsRoot"
      className={pairs.length ? 'analyzed-pair-bg-color' : ''}
    >
      <div className="column">
        {pairs.map((symbol, index) => {
          const divClass =
            index !== symbols.length - 1 ? 'row md-margin-bottom' : 'row';

          return (
            <div className={divClass} key={`pair-${symbol}`}>
              <button
                className="analyzedPairButton"
                key={symbol}
                onClick={() => handleSelect(symbol)}
                type="button"
              >
                {symbol}
              </button>
              <button
                className="analyzedPairDeleteButton"
                key={`${symbol}x`}
                onClick={() => handleForget(symbol)}
                type="button"
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
