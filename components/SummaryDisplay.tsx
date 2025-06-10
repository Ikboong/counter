
import React from 'react';

interface SummaryDisplayProps {
  totalValue: number;
  totalBanknoteValue: number;
  totalCoinValue: number;
  formatCurrency: (amount: number) => string;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ totalValue, totalBanknoteValue, totalCoinValue, formatCurrency }) => {
  return (
    <section className="mt-8 p-6 bg-slate-800 rounded-xl shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-yellow-400">
        <i className="fas fa-calculator mr-2"></i>최종 합계 (Grand Total)
      </h2>
      <div className="space-y-4 text-lg sm:text-xl">
        <div className="flex justify-between items-center p-3 bg-slate-700/70 rounded-lg">
          <span className="text-slate-300">총 지폐 금액:</span>
          <span className="font-semibold text-sky-300">{formatCurrency(totalBanknoteValue)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-slate-700/70 rounded-lg">
          <span className="text-slate-300">총 동전 금액:</span>
          <span className="font-semibold text-teal-300">{formatCurrency(totalCoinValue)}</span>
        </div>
        <hr className="border-slate-600 my-3" />
        <div className="flex justify-between items-center p-4 bg-yellow-500/10 rounded-lg">
          <span className="font-bold text-yellow-300 text-xl sm:text-2xl">총 합계:</span>
          <span className="font-extrabold text-yellow-300 text-xl sm:text-2xl">{formatCurrency(totalValue)}</span>
        </div>
      </div>
    </section>
  );
};
