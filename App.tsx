
import React, { useState, useCallback, useMemo } from 'react';
import { DenominationInput } from './components/DenominationInput';
import { SummaryDisplay } from './components/SummaryDisplay';
import { KRW_DENOMINATIONS, INITIAL_COUNTS, formatCurrency } from './constants';
import { DenominationCounts, Denomination } from './types';

const App: React.FC = () => {
  const [counts, setCounts] = useState<DenominationCounts>(INITIAL_COUNTS);

  const handleCountChange = useCallback((id: string, newCount: number) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max(0, newCount) // Ensure count is not negative
    }));
  }, []);

  const resetAllCounts = useCallback(() => {
    setCounts(INITIAL_COUNTS);
  }, []);

  const banknotes = useMemo(() => KRW_DENOMINATIONS.filter(d => d.type === 'banknote'), []);
  const coins = useMemo(() => KRW_DENOMINATIONS.filter(d => d.type === 'coin'), []);

  const totalValue = useMemo(() => {
    return KRW_DENOMINATIONS.reduce((sum, denom) => {
      return sum + (counts[denom.id] || 0) * denom.value;
    }, 0);
  }, [counts]);
  
  const totalBanknoteValue = useMemo(() => {
    return banknotes.reduce((sum, denom) => {
      return sum + (counts[denom.id] || 0) * denom.value;
    }, 0);
  }, [counts, banknotes]);

  const totalCoinValue = useMemo(() => {
    return coins.reduce((sum, denom) => {
      return sum + (counts[denom.id] || 0) * denom.value;
    }, 0);
  }, [counts, coins]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="my-6 sm:my-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <i className="fas fa-coins mr-3 text-yellow-400"></i>화폐 계수기 <span className="text-sky-400">(Currency Counter)</span>
        </h1>
        <p className="mt-3 text-lg text-slate-400">지폐와 동전의 수량을 입력하여 총액을 계산하세요.</p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 pb-2 border-b-2 border-sky-500 text-sky-300">
            <i className="fas fa-money-bill-wave mr-2"></i>지폐 (Banknotes)
          </h2>
          <div className="space-y-3">
            {banknotes.map((denom: Denomination) => (
              <DenominationInput
                key={denom.id}
                denomination={denom}
                count={counts[denom.id]}
                onCountChange={(newCount) => handleCountChange(denom.id, newCount)}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 pb-2 border-b-2 border-teal-500 text-teal-300">
            <i className="fas fa-coins mr-2"></i>동전 (Coins)
          </h2>
          <div className="space-y-3">
            {coins.map((denom: Denomination) => (
              <DenominationInput
                key={denom.id}
                denomination={denom}
                count={counts[denom.id]}
                onCountChange={(newCount) => handleCountChange(denom.id, newCount)}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </section>

        <SummaryDisplay 
          totalValue={totalValue} 
          totalBanknoteValue={totalBanknoteValue}
          totalCoinValue={totalCoinValue}
          formatCurrency={formatCurrency} 
        />

        <div className="text-center mt-8">
          <button
            onClick={resetAllCounts}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            <i className="fas fa-undo mr-2"></i>모두 초기화 (Reset All)
          </button>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Currency Counter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
