
import React, { useState, useEffect, useCallback } from 'react';
import { Denomination } from '../types';

interface DenominationInputProps {
  denomination: Denomination;
  count: number; // Total number of individual units
  onCountChange: (totalCount: number) => void;
  formatCurrency: (amount: number) => string;
}

export const DenominationInput: React.FC<DenominationInputProps> = ({ denomination, count, onCountChange, formatCurrency }) => {
  const [bundleCountDisplay, setBundleCountDisplay] = useState(0);
  const [looseCountDisplay, setLooseCountDisplay] = useState(0);

  useEffect(() => {
    if (denomination.bundleSize && denomination.bundleSize > 0) {
      setBundleCountDisplay(Math.floor(count / denomination.bundleSize));
      setLooseCountDisplay(count % denomination.bundleSize);
    } else {
      setBundleCountDisplay(0); // Should not happen with current KRW data
      setLooseCountDisplay(count);
    }
  }, [count, denomination.bundleSize]);

  const subtotal = count * denomination.value;

  // Handlers for single input (fallback if no bundleSize)
  const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onCountChange(isNaN(value) || value < 0 ? 0 : value);
  };
  const incrementSingle = () => onCountChange(count + 1);
  const decrementSingle = () => onCountChange(Math.max(0, count - 1));


  // Handlers for bundle input
  const handleBundleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBundleVal = parseInt(e.target.value, 10);
    if (isNaN(newBundleVal) || newBundleVal < 0) {
      onCountChange(looseCountDisplay); // only loose items if bundle is invalid
      return;
    }
    const newTotal = (newBundleVal * (denomination.bundleSize || 1)) + looseCountDisplay;
    onCountChange(newTotal);
  };

  const incrementBundle = () => {
    const newTotal = ((bundleCountDisplay + 1) * (denomination.bundleSize || 1)) + looseCountDisplay;
    onCountChange(newTotal);
  };

  const decrementBundle = () => {
    if (bundleCountDisplay > 0) {
      const newTotal = ((bundleCountDisplay - 1) * (denomination.bundleSize || 1)) + looseCountDisplay;
      onCountChange(newTotal);
    }
  };

  // Handlers for loose input
  const handleLooseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLooseVal = parseInt(e.target.value, 10);
     if (isNaN(newLooseVal) || newLooseVal < 0) {
      onCountChange(bundleCountDisplay * (denomination.bundleSize || 1)); // only bundle items if loose is invalid
      return;
    }
    const newTotal = (bundleCountDisplay * (denomination.bundleSize || 1)) + newLooseVal;
    onCountChange(newTotal);
  };
  
  const incrementLoose = () => {
    const newTotal = (bundleCountDisplay * (denomination.bundleSize || 1)) + (looseCountDisplay + 1);
    onCountChange(newTotal);
  };

  const decrementLoose = () => {
    if (looseCountDisplay > 0) {
      const newTotal = (bundleCountDisplay * (denomination.bundleSize || 1)) + (looseCountDisplay - 1);
      onCountChange(newTotal);
    } else if (bundleCountDisplay > 0 && denomination.bundleSize && denomination.bundleSize > 0) {
      // If loose is 0, and we decrement, "unwrap" a bundle
      const newBundleTotal = (bundleCountDisplay - 1) * denomination.bundleSize;
      const newLooseTotal = denomination.bundleSize -1;
      onCountChange(newBundleTotal + newLooseTotal);
    }
  };
  
  const inputClass = "w-14 sm:w-16 text-center bg-slate-800 border border-slate-600 text-slate-100 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const buttonClass = "px-2 sm:px-3 py-1 text-white rounded-md font-bold transition-colors text-sm sm:text-base";

  return (
    <div className={`p-3 sm:p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 ${denomination.type === 'banknote' ? 'bg-slate-700/50 hover:bg-slate-700/80' : 'bg-slate-600/50 hover:bg-slate-600/80'} transition-all duration-150 ease-in-out`}>
      <div className="flex-shrink-0 w-full sm:w-auto flex items-center space-x-3">
        {denomination.imageUrl ? (
          <img 
            src={denomination.imageUrl} 
            alt={denomination.label} 
            className={`object-cover rounded-md ${denomination.type === 'banknote' ? 'h-12 w-24' : 'h-10 w-10'}`} 
          />
        ) : (
          <div 
            className={`flex items-center justify-center text-white font-bold rounded-md ${denomination.colorClass} ${denomination.type === 'banknote' ? 'h-12 w-24 text-sm' : 'h-10 w-10 text-xs'}`}
          >
            {denomination.shortLabel}
          </div>
        )}
        <span className="text-md sm:text-lg font-medium text-slate-100 w-24 sm:w-28 truncate">{denomination.label}</span>
      </div>

      {denomination.bundleSize && denomination.bundleSize > 0 ? (
        <div className="flex flex-col xs:flex-row items-center flex-grow space-y-2 xs:space-y-0 xs:space-x-2 justify-center sm:justify-start">
          {/* Bundle Group */}
          <div className="flex items-center space-x-1">
            <button
              onClick={decrementBundle}
              className={`${buttonClass} bg-red-500 hover:bg-red-600`}
              aria-label={`Decrease bundle count for ${denomination.label}`}
            >
              <i className="fas fa-minus"></i>
            </button>
            <input
              type="number"
              min="0"
              value={bundleCountDisplay.toString()}
              onChange={handleBundleInputChange}
              onFocus={(e) => e.target.select()}
              className={inputClass}
              aria-label={`Bundle count for ${denomination.label}`}
            />
            <button
              onClick={incrementBundle}
              className={`${buttonClass} bg-green-500 hover:bg-green-600`}
              aria-label={`Increase bundle count for ${denomination.label}`}
            >
              <i className="fas fa-plus"></i>
            </button>
            <span className="text-xs sm:text-sm text-slate-300 ml-1 w-10 text-center">묶음</span>
          </div>

          <div className="hidden xs:block text-slate-400 mx-1">+</div>

          {/* Loose Group */}
          <div className="flex items-center space-x-1">
            <button
              onClick={decrementLoose}
              className={`${buttonClass} bg-red-500 hover:bg-red-600`}
              aria-label={`Decrease loose item count for ${denomination.label}`}
            >
              <i className="fas fa-minus"></i>
            </button>
            <input
              type="number"
              min="0"
              // max={denomination.bundleSize ? denomination.bundleSize -1 : undefined} // Optional: to guide user, but logic handles overflow.
              value={looseCountDisplay.toString()}
              onChange={handleLooseInputChange}
              onFocus={(e) => e.target.select()}
              className={inputClass}
              aria-label={`Loose item count for ${denomination.label}`}
            />
            <button
              onClick={incrementLoose}
              className={`${buttonClass} bg-green-500 hover:bg-green-600`}
              aria-label={`Increase loose item count for ${denomination.label}`}
            >
              <i className="fas fa-plus"></i>
            </button>
            <span className="text-xs sm:text-sm text-slate-300 ml-1 w-10 text-center">낱개</span>
          </div>
        </div>
      ) : (
        // Fallback: Single input for items without bundleSize
        <div className="flex items-center space-x-1 sm:space-x-2 flex-grow justify-center sm:justify-start">
          <button
            onClick={decrementSingle}
            className={`${buttonClass} bg-red-500 hover:bg-red-600`}
            aria-label={`Decrease count for ${denomination.label}`}
          >
            <i className="fas fa-minus"></i>
          </button>
          <input
            type="number"
            min="0"
            value={count.toString()}
            onChange={handleSingleInputChange}
            onFocus={(e) => e.target.select()}
            className="w-16 sm:w-20 text-center bg-slate-800 border border-slate-600 text-slate-100 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            aria-label={`Count for ${denomination.label}`}
          />
          <button
            onClick={incrementSingle}
            className={`${buttonClass} bg-green-500 hover:bg-green-600`}
            aria-label={`Increase count for ${denomination.label}`}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}

      <div className="text-md sm:text-lg font-semibold text-sky-400 w-full sm:w-36 text-center sm:text-right pt-2 sm:pt-0">
        {formatCurrency(subtotal)}
      </div>
    </div>
  );
};