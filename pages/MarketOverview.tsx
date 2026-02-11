
import React, { useState } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';

interface MarketOverviewProps {
  onTradeClick: (symbol: string) => void;
}

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  All: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Banking: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M4 10l8-7 8 7" />
    </svg>
  ),
  Industrial: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'Consumer Goods': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  'Oil & Gas': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s-8-6.75-8-12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 5.25-8 12-8 12z" />
    </svg>
  ),
  Telecoms: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.5 9.5 0 0114.142 0M2.05 8.05a15.5 15.5 0 0121.9 0" />
    </svg>
  ),
  ETFs: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

const MarketOverview: React.FC<MarketOverviewProps> = ({ onTradeClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const sectors = ['All', 'Banking', 'Industrial', 'Consumer Goods', 'Oil & Gas', 'Telecoms', 'ETFs'];

  const filteredStocks = MOCK_STOCKS.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = activeTab === 'All' || stock.sector === activeTab;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-xl group">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-[#1E4D3B] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search NGX Ticker, Company Name or Sector..." 
            className="block w-full pl-12 pr-4 py-4 border-2 border-transparent bg-white shadow-sm rounded-2xl focus:border-[#1E4D3B] outline-none transition-all font-medium text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 xl:pb-0 scrollbar-hide -mx-4 px-4 xl:mx-0 xl:px-0">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setActiveTab(sector)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
                activeTab === sector 
                ? 'bg-[#1E4D3B] text-white shadow-[0_10px_20px_rgba(30,77,59,0.2)]' 
                : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50 hover:text-[#1E4D3B]'
              }`}
            >
              <span className={`${activeTab === sector ? 'text-[#8BB82D]' : 'text-gray-300'}`}>
                {SECTOR_ICONS[sector]}
              </span>
              {sector}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'NGX All-Share', value: '104,562.06', change: '+0.45%', color: 'positive' },
          { name: 'NGX Banking', value: '842.12', change: '-1.20%', color: 'negative' },
          { name: 'NGX Industrial', value: '4,512.90', change: '+2.15%', color: 'positive' },
        ].map((index, i) => (
          <div key={i} className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{index.name}</p>
            <div className="flex items-end justify-between mt-3">
              <span className="text-3xl font-black text-gray-900 tracking-tighter">{index.value}</span>
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${index.color === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {index.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase font-black">
                <th className="px-8 py-5 tracking-[0.2em]">Equity / ETF</th>
                <th className="px-8 py-5 text-right tracking-[0.2em]">Price (₦)</th>
                <th className="px-8 py-5 text-right tracking-[0.2em]">Day Chg</th>
                <th className="px-8 py-5 text-right tracking-[0.2em]">Volume</th>
                <th className="px-8 py-5 text-center tracking-[0.2em]">Trend (7D)</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-2xl ${stock.sector === 'ETFs' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-[#1E4D3B]'} flex items-center justify-center font-black text-xs mr-4 shadow-sm`}>
                        {stock.symbol[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 group-hover:text-[#1E4D3B] transition-colors">{stock.symbol}</span>
                        <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{stock.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-mono font-black text-sm text-gray-900">
                    {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`px-8 py-6 text-right font-black text-xs ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <div className="flex items-center justify-end gap-2">
                       {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)} 
                       <span className="text-[10px] opacity-60">({stock.changePercent}%)</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right text-[10px] text-gray-400 font-mono font-black uppercase">
                    {(stock.volume / 1000).toLocaleString()}K
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <svg className={`w-20 h-10 ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`} viewBox="0 0 100 30" fill="none">
                         <path d={stock.change >= 0 ? "M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" : "M0 5 L20 15 L40 10 L60 22 L80 20 L100 25"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => onTradeClick(stock.symbol)}
                      className="opacity-0 group-hover:opacity-100 transition-all bg-[#1E4D3B] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-[#8BB82D] transform hover:-translate-x-1"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStocks.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-5 bg-gray-50 rounded-full text-gray-300">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <p className="text-sm text-gray-400 font-black uppercase tracking-[0.2em] italic">No institutional assets found in this category.</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
