
import React, { useEffect, useState } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';
import { getMarketInsights, getSmartAlert } from '../services/geminiService';
import { OnboardingStatus } from '../types';

const Dashboard: React.FC<{ userStatus: OnboardingStatus }> = ({ userStatus }) => {
  const [insights, setInsights] = useState<string>('Loading AI market insights...');
  const [smartAlert, setSmartAlert] = useState<string | null>(null);

  useEffect(() => {
    const fetchAI = async () => {
      const symbols = MOCK_STOCKS.slice(0, 3).map(s => s.symbol);
      const text = await getMarketInsights(symbols);
      setInsights(text || 'Insights unavailable');
      
      const alert = await getSmartAlert(MOCK_STOCKS[0]);
      if (alert) setSmartAlert(alert);
    };
    fetchAI();
  }, []);

  const isApproved = userStatus === OnboardingStatus.APPROVED;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#1E4D3B] text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Good Morning, John</h2>
          <p className="text-emerald-100 mt-1 opacity-80">Welcome to your Meritrade NextGen terminal.</p>
        </div>
        {!isApproved && (
           <div className="mt-4 md:mt-0 bg-amber-400 text-amber-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center animate-pulse">
             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
             KYC PENDING
           </div>
        )}
      </div>

      {/* Portfolio Quick Stats (Restricted) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Portfolio Value', value: '₦ 12,450,230.45', trend: '+₦ 145,200 (1.2%)', color: 'positive' },
          { label: 'Available Cash', value: '₦ 2,340,500.00', trend: 'Account: 102****23', color: 'neutral' },
          { label: 'Unrealized P&L', value: '₦ 845,600.00', trend: '+5.4% today', color: 'positive' },
          { label: 'Market Day Status', value: 'OPEN', trend: 'Closing in 4h 12m', color: 'meristemAccent' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden ${!isApproved && i < 3 ? 'blur-[2px]' : ''}`}>
             {!isApproved && i < 3 && (
               <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-40">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
               </div>
             )}
             <p className="text-sm font-medium text-gray-500">{stat.label}</p>
             <p className="text-xl font-bold text-gray-900 mt-2">{stat.value}</p>
             <p className={`text-xs mt-1 font-medium ${stat.color === 'positive' ? 'text-emerald-600' : stat.color === 'negative' ? 'text-rose-600' : 'text-gray-400'}`}>
                {stat.trend}
             </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Ticker */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Top Market Gainers (NGX)</h3>
            <button className="text-xs font-semibold text-[#1E4D3B] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase">
                  <th className="px-6 py-3 font-medium">Symbol</th>
                  <th className="px-6 py-3 font-medium text-right">Last Price</th>
                  <th className="px-6 py-3 font-medium text-right">Change</th>
                  <th className="px-6 py-3 font-medium text-right">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_STOCKS.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{stock.symbol}</span>
                        <span className="text-xs text-gray-400 truncate w-32">{stock.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium">
                       ₦{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className={`px-6 py-4 text-right font-medium ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                       {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-500 font-mono">
                       {(stock.volume / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI & Insights Sidebar */}
        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
               <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/></svg>
               </div>
               <h3 className="font-bold text-emerald-900">AI Market Insight</h3>
            </div>
            <div className="text-sm text-emerald-800 leading-relaxed whitespace-pre-line">
              {insights}
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
               <span>Generated by Meritrade AI</span>
               <button className="hover:underline">Refresh</button>
            </div>
          </div>

          {smartAlert && (
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 shadow-sm animate-in fade-in slide-in-from-right duration-500">
               <div className="flex items-center space-x-2 mb-2 text-amber-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  <span className="font-bold uppercase tracking-wider text-xs">Smart Alert</span>
               </div>
               <p className="text-sm text-amber-900">{smartAlert}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
