
import React, { useEffect, useState } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';
import { getMarketInsights, getSmartAlert } from '../services/geminiService';
import { OnboardingStatus } from '../types';

interface DashboardProps {
  userStatus: OnboardingStatus;
  onNavigateToKYC: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userStatus, onNavigateToKYC }) => {
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
      <div className="bg-[#1E4D3B] text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center border border-emerald-800/30">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Terminal Ready, Nifemi D.</h2>
          <p className="text-emerald-100 mt-1 opacity-80 font-medium tracking-wide">Institutional NGX node active in Lagos, Nigeria.</p>
        </div>
        {!isApproved && (
           <button 
             onClick={onNavigateToKYC}
             className="mt-6 md:mt-0 bg-amber-400 text-amber-950 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] flex items-center animate-pulse hover:bg-amber-300 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(251,191,36,0.2)] border border-amber-200"
             title="Complete KYC to unlock restricted modules"
           >
             <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
             KYC REQUIRED — CLICK TO RESOLVE
           </button>
        )}
      </div>

      {/* Portfolio Quick Stats (Restricted) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Portfolio Value', value: '₦ 12,450,230.45', trend: '+₦ 145,200 (1.2%)', color: 'positive' },
          { label: 'Available Cash', value: '₦ 2,340,500.00', trend: 'Account: 102****23', color: 'neutral' },
          { label: 'Unrealized P&L', value: '₦ 845,600.00', trend: '+5.4% today', color: 'positive' },
          { label: 'Market Day Status', value: 'OPEN', trend: 'Closing in 4h 12m', color: 'meristemAccent' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-8 rounded-[2rem] border border-gray-50 shadow-sm relative overflow-hidden transition-all group hover:shadow-xl ${!isApproved && i < 3 ? 'blur-[4px]' : ''}`}>
             {!isApproved && i < 3 && (
               <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[1px]">
                  <div className="p-2 bg-gray-100 rounded-full text-gray-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  </div>
               </div>
             )}
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
             <p className="text-2xl font-black text-gray-900 mt-2 tracking-tighter">{stat.value}</p>
             <p className={`text-[11px] mt-2 font-black uppercase tracking-wider ${stat.color === 'positive' ? 'text-emerald-600' : stat.color === 'negative' ? 'text-rose-600' : 'text-gray-400'}`}>
                {stat.trend}
             </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Ticker */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-50 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-black text-gray-800 tracking-tight uppercase text-sm">Top Gainers (NGX)</h3>
            <button className="text-[10px] font-black text-[#1E4D3B] uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase font-black">
                  <th className="px-8 py-5 tracking-widest">Symbol</th>
                  <th className="px-8 py-5 text-right tracking-widest">Price</th>
                  <th className="px-8 py-5 text-right tracking-widest">Change</th>
                  <th className="px-8 py-5 text-right tracking-widest">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_STOCKS.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 group-hover:text-[#1E4D3B] transition-colors">{stock.symbol}</span>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{stock.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-mono font-bold text-gray-900">
                       ₦{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className={`px-8 py-6 text-right font-black ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                       {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </td>
                    <td className="px-8 py-6 text-right text-xs text-gray-400 font-mono">
                       {(stock.volume / 1000000).toFixed(1)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-8">
          <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
               <div className="p-2 bg-emerald-600 rounded-xl text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"/></svg>
               </div>
               <h3 className="font-black text-emerald-900 tracking-tight text-lg">AI Market Insight</h3>
            </div>
            <div className="text-sm text-emerald-800 leading-relaxed font-medium">
              {insights}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
