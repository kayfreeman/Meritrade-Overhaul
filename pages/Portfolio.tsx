
import React, { useState, useEffect } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';
import { getPortfolioOptimization } from '../services/geminiService';

const Portfolio: React.FC = () => {
  const [optimization, setOptimization] = useState<string>('Analyzing your holdings...');

  const holdings = [
    { name: 'Dangote Cement PLC', symbol: 'DANGCEM', quantity: 5000, averageCost: 650.00, currentPrice: 701.00 },
    { name: 'Zenith Bank PLC', symbol: 'ZENITHBANK', quantity: 120000, averageCost: 35.50, currentPrice: 42.15 },
    { name: 'MTN Nigeria', symbol: 'MTNN', quantity: 15000, averageCost: 245.00, currentPrice: 235.50 },
    { name: 'Guaranty Trust Co', symbol: 'GTCO', quantity: 50000, averageCost: 48.00, currentPrice: 51.20 },
  ];

  useEffect(() => {
    const fetchAI = async () => {
      const suggestions = await getPortfolioOptimization(holdings);
      setOptimization(suggestions || 'No recommendations at this time.');
    };
    fetchAI();
  }, []);

  const calculatePL = (h: any) => {
    const purchaseValue = h.quantity * h.averageCost;
    const marketValue = h.quantity * h.currentPrice;
    const pl = marketValue - purchaseValue;
    const plPercent = (pl / purchaseValue) * 100;
    return { purchaseValue, marketValue, pl, plPercent };
  };

  const totals = holdings.reduce((acc, h) => {
    const calc = calculatePL(h);
    return {
      marketValue: acc.marketValue + calc.marketValue,
      purchaseValue: acc.purchaseValue + calc.purchaseValue
    };
  }, { marketValue: 0, purchaseValue: 0 });

  const totalPL = totals.marketValue - totals.purchaseValue;
  const totalPLPercent = (totalPL / totals.purchaseValue) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-1 mb-6 md:mb-0 text-center md:text-left">
           <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Net Portfolio Value</p>
           <h2 className="text-4xl font-bold text-gray-900">₦{totals.marketValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
           <p className={`text-lg font-bold ${totalPL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
             {totalPL >= 0 ? '+' : ''}₦{totalPL.toLocaleString()} ({totalPLPercent.toFixed(2)}%) Total Gain
           </p>
        </div>
        <div className="flex space-x-6">
           <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Available Cash</p>
              <p className="text-xl font-bold text-gray-900">₦2,340,500.00</p>
           </div>
           <div className="h-12 w-px bg-gray-100"></div>
           <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Invested Capital</p>
              <p className="text-xl font-bold text-gray-900">₦{totals.purchaseValue.toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
           <h3 className="font-bold text-gray-900">Holdings Detail</h3>
           <button className="text-xs font-bold text-[#1E4D3B] hover:underline flex items-center gap-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
             Download Valuation
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase">
                <th className="px-6 py-4 font-bold">Asset</th>
                <th className="px-6 py-4 font-bold">Symbol</th>
                <th className="px-6 py-4 font-bold text-right">Units</th>
                <th className="px-6 py-4 font-bold text-right">Avg Cost</th>
                <th className="px-6 py-4 font-bold text-right">Price</th>
                <th className="px-6 py-4 font-bold text-right">Purchase Value</th>
                <th className="px-6 py-4 font-bold text-right">Market Value</th>
                <th className="px-6 py-4 font-bold text-right">Unrealized P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {holdings.map((h) => {
                const { purchaseValue, marketValue, pl, plPercent } = calculatePL(h);
                return (
                  <tr key={h.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[120px]">{h.name}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{h.symbol}</td>
                    <td className="px-6 py-4 text-right font-mono">{h.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-mono">₦{h.averageCost.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono">₦{h.currentPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono">₦{purchaseValue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold">₦{marketValue.toLocaleString()}</td>
                    <td className={`px-6 py-4 text-right font-bold ${pl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
         <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-[#1E4D3B] rounded-xl text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="font-bold text-[#1E4D3B]">AI Portfolio Advisor</h3>
         </div>
         <div className="prose prose-sm prose-emerald text-emerald-900 text-sm leading-relaxed whitespace-pre-line">
            {optimization}
         </div>
      </div>
    </div>
  );
};

export default Portfolio;
