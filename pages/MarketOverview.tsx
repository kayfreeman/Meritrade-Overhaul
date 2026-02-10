
import React, { useState } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';

interface MarketOverviewProps {
  onTradeClick: (symbol: string) => void;
}

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search NGX Ticker or Company..." 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#1E4D3B] outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setActiveTab(sector)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === sector 
                ? 'bg-[#1E4D3B] text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'NGX All-Share', value: '104,562.06', change: '+0.45%', color: 'positive' },
          { name: 'NGX Banking', value: '842.12', change: '-1.20%', color: 'negative' },
          { name: 'NGX Industrial', value: '4,512.90', change: '+2.15%', color: 'positive' },
        ].map((index, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{index.name}</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-xl font-bold text-gray-900">{index.value}</span>
              <span className={`text-sm font-bold ${index.color === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {index.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase">
                <th className="px-6 py-4 font-bold">Equity / ETF</th>
                <th className="px-6 py-4 font-bold text-right">Price (₦)</th>
                <th className="px-6 py-4 font-bold text-right">Day Chg</th>
                <th className="px-6 py-4 font-bold text-right">Volume</th>
                <th className="px-6 py-4 font-bold text-center">Trend (7D)</th>
                <th className="px-6 py-4 font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg ${stock.sector === 'ETFs' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-[#1E4D3B]'} flex items-center justify-center font-bold text-xs mr-3`}>
                        {stock.symbol[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-[#1E4D3B] transition-colors">{stock.symbol}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tight">{stock.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                    {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)} ({stock.changePercent}%)
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-gray-500 font-mono">
                    {(stock.volume / 1000).toLocaleString()}K
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <svg className={`w-16 h-8 ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`} viewBox="0 0 100 30" fill="none">
                         <path d={stock.change >= 0 ? "M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" : "M0 5 L20 15 L40 10 L60 22 L80 20 L100 25"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onTradeClick(stock.symbol)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E4D3B] text-white px-3 py-1 rounded-lg text-xs font-bold"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStocks.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">No assets found in this category.</td>
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
