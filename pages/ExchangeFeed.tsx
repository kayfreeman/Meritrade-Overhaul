
import React, { useState, useEffect } from 'react';
import { MOCK_STOCKS } from '../constants';

interface MarketData {
  name: string;
  symbol: string;
  refPrice: number;
  lastTrade: number;
  qtyTraded: number;
  daysVol: number;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  priceChange: number;
  changePercent: number;
  bidDepth: number;
  bestBid: number;
  offerDepth: number;
  bestOffer: number;
  category: string;
  lastTickDir?: 'UP' | 'DOWN' | null;
  lastTickTimestamp?: number;
}

const CATEGORIES = [
  "NGX Regular Board",
  "NGX Premium Board",
  "NGX Fixed income investments",
  "NGX Non-Interest investments",
  "NGX REIT",
  "NGX Growth Board",
  "NGX OTC Instrument"
];

const ExchangeFeed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[1]); // Default to Premium Board
  const [marketStream, setMarketStream] = useState<MarketData[]>([]);

  // Initialize and categorize mock data
  useEffect(() => {
    const initialData: MarketData[] = MOCK_STOCKS.map((s, index) => ({
      name: s.name,
      symbol: s.symbol,
      refPrice: s.open,
      lastTrade: s.price,
      qtyTraded: Math.floor(Math.random() * 5000) + 100,
      daysVol: s.volume,
      openPrice: s.open,
      closePrice: s.open - (Math.random() * 2),
      highPrice: s.high,
      lowPrice: s.low,
      priceChange: s.change,
      changePercent: s.changePercent,
      bidDepth: Math.floor(Math.random() * 500000) + 10000,
      bestBid: s.price - 0.05,
      offerDepth: Math.floor(Math.random() * 400000) + 5000,
      bestOffer: s.price + 0.05,
      category: CATEGORIES[index % CATEGORIES.length], // Distribute across categories
      lastTickDir: null,
      lastTickTimestamp: 0
    }));
    setMarketStream(initialData);
  }, []);

  // Streaming loop
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketStream(current => {
        return current.map(stock => {
          if (Math.random() > 0.2) return stock; // 20% tick rate

          const tick = (Math.random() - 0.5) * 0.12;
          const newLastTrade = Number((stock.lastTrade + tick).toFixed(2));
          const newQty = Math.floor(Math.random() * 3000) + 50;
          const newVol = stock.daysVol + newQty;
          const newChange = Number((newLastTrade - stock.refPrice).toFixed(2));
          const newPercent = Number(((newChange / stock.refPrice) * 100).toFixed(2));
          
          const tickDir = newLastTrade > stock.lastTrade ? 'UP' : newLastTrade < stock.lastTrade ? 'DOWN' : null;

          return {
            ...stock,
            lastTrade: newLastTrade,
            qtyTraded: newQty,
            daysVol: newVol,
            highPrice: Math.max(stock.highPrice, newLastTrade),
            lowPrice: Math.min(stock.lowPrice, newLastTrade),
            priceChange: newChange,
            changePercent: newPercent,
            bestBid: Number((newLastTrade - 0.02).toFixed(2)),
            bestOffer: Number((newLastTrade + 0.02).toFixed(2)),
            bidDepth: stock.bidDepth + (Math.floor(Math.random() * 1000) - 500),
            offerDepth: stock.offerDepth + (Math.floor(Math.random() * 1000) - 500),
            lastTickDir: tickDir,
            lastTickTimestamp: Date.now()
          };
        });
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const filteredData = marketStream.filter(s => s.category === selectedCategory);

  const getFlashClass = (stock: MarketData) => {
    if (!stock.lastTickTimestamp || Date.now() - stock.lastTickTimestamp > 400) return '';
    return stock.lastTickDir === 'UP' ? 'bg-emerald-100/80' : stock.lastTickDir === 'DOWN' ? 'bg-rose-100/80' : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Exchange Feed</h2>
          <p className="text-sm text-gray-500">Live streaming NGX market data and order depth.</p>
        </div>
        <div className="w-full md:w-72">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Market Category</label>
          <select 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1E4D3B] outline-none focus:ring-2 focus:ring-[#1E4D3B] transition-all cursor-pointer shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-[#1E4D3B] flex justify-between items-center text-white">
          <span className="text-xs font-bold uppercase tracking-widest flex items-center">
            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Live Market Sheet: {selectedCategory}
          </span>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
             <span className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">NGX Streaming Active</span>
          </div>
        </div>
        
        <div className="overflow-x-auto max-h-[700px] scrollbar-thin scrollbar-thumb-gray-200">
          <table className="w-full text-left border-collapse min-w-[1600px]">
            <thead className="sticky top-0 z-20">
              <tr className="text-[10px] bg-gray-50 text-gray-500 uppercase font-bold border-b border-gray-200">
                <th className="px-4 py-4 border-r border-gray-200 sticky left-0 z-30 bg-gray-50">Stock Name</th>
                <th className="px-4 py-4 border-r border-gray-200 sticky left-[180px] z-30 bg-gray-50">Symbol</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Ref Price</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Last Trade</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Qty Traded</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Day's Vol</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Open Price</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Close Price</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">High Price</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Low Price</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Price Chg</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right">Change %</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right bg-emerald-50/50">Bid Depth</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right bg-emerald-50">Best Bid</th>
                <th className="px-4 py-4 border-r border-gray-200 text-right bg-rose-50/50">Offer Depth</th>
                <th className="px-4 py-4 text-right bg-rose-50">Best Offer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-[12px]">
              {filteredData.map((stock) => {
                const flashClass = getFlashClass(stock);
                return (
                  <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-4 border-r border-gray-50 font-sans font-bold text-gray-800 uppercase tracking-tighter whitespace-nowrap sticky left-0 z-10 bg-white group-hover:bg-gray-50 transition-colors w-[180px]">
                      {stock.name}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-[#1E4D3B] font-black sticky left-[180px] z-10 bg-white group-hover:bg-gray-50 transition-colors">
                      {stock.symbol}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-gray-400">
                      {stock.refPrice.toFixed(2)}
                    </td>
                    <td className={`px-4 py-4 border-r border-gray-50 text-right font-bold text-gray-900 transition-all duration-300 ${flashClass}`}>
                      {stock.lastTrade.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-gray-500">
                      {stock.qtyTraded.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right font-bold text-gray-800">
                      {stock.daysVol.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-gray-500">
                      {stock.openPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-gray-400">
                      {stock.closePrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-emerald-600 font-bold">
                      {stock.highPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-rose-600 font-bold">
                      {stock.lowPrice.toFixed(2)}
                    </td>
                    <td className={`px-4 py-4 border-r border-gray-50 text-right font-bold ${stock.priceChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stock.priceChange > 0 ? '+' : ''}{stock.priceChange.toFixed(2)}
                    </td>
                    <td className={`px-4 py-4 border-r border-gray-50 text-right font-bold ${stock.changePercent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-emerald-700 bg-emerald-50/20">
                      {stock.bidDepth.toLocaleString()}
                    </td>
                    <td className={`px-4 py-4 border-r border-gray-50 text-right font-black text-emerald-700 bg-emerald-100/20 transition-all duration-500 ${flashClass && stock.lastTickDir === 'UP' ? 'bg-emerald-200' : ''}`}>
                      {stock.bestBid.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 border-r border-gray-50 text-right text-rose-700 bg-rose-50/20">
                      {stock.offerDepth.toLocaleString()}
                    </td>
                    <td className={`px-4 py-4 text-right font-black text-rose-700 bg-rose-100/20 transition-all duration-500 ${flashClass && stock.lastTickDir === 'DOWN' ? 'bg-rose-200' : ''}`}>
                      {stock.bestOffer.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={16} className="px-6 py-20 text-center text-gray-400 italic font-sans text-sm">
                    No active listings in {selectedCategory} at this time.
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

export default ExchangeFeed;
