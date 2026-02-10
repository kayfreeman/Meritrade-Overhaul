
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';

interface TradeEvent {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  time: string;
  side: 'BUY' | 'SELL';
  tick: 'UP' | 'DOWN' | 'FLAT';
}

const RealTimeTrades: React.FC = () => {
  const [trades, setTrades] = useState<TradeEvent[]>([]);
  const [isLive, setIsLive] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Function to generate a random trade
  const generateTrade = (): TradeEvent => {
    const stock = MOCK_STOCKS[Math.floor(Math.random() * MOCK_STOCKS.length)];
    const randomVariation = (Math.random() - 0.5) * (stock.price * 0.002);
    const tradePrice = stock.price + randomVariation;
    const quantity = Math.floor(Math.random() * 50000) + 100;
    const sides: ('BUY' | 'SELL')[] = ['BUY', 'SELL'];
    const side = sides[Math.floor(Math.random() * 2)];
    const ticks: ('UP' | 'DOWN' | 'FLAT')[] = ['UP', 'DOWN', 'FLAT'];
    const tick = ticks[Math.floor(Math.random() * 3)];

    return {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      symbol: stock.symbol,
      price: tradePrice,
      quantity,
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      side,
      tick
    };
  };

  useEffect(() => {
    // Initial trades
    const initialTrades = Array.from({ length: 15 }, () => generateTrade());
    setTrades(initialTrades);

    if (!isLive) return;

    const interval = setInterval(() => {
      const newTrade = generateTrade();
      setTrades(prev => [newTrade, ...prev].slice(0, 100)); // Keep last 100 trades
    }, Math.random() * 2000 + 500); // Random interval between 0.5s and 2.5s

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">NGX Real-Time Tape</h2>
           <p className="text-sm text-gray-500">Live transaction stream from the Nigerian Exchange floor.</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              NGX CONNECTED
           </div>
           <button 
             onClick={() => setIsLive(!isLive)}
             className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isLive ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
           >
             {isLive ? 'Pause Stream' : 'Resume Stream'}
           </button>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Market State', value: 'OPEN', color: 'text-emerald-600' },
           { label: 'Trades/Sec', value: (trades.length / 60).toFixed(2), color: 'text-gray-900' },
           { label: 'Live Tickers', value: MOCK_STOCKS.length, color: 'text-gray-900' },
           { label: 'Session High', value: 'DANGCEM', color: 'text-[#1E4D3B]' },
         ].map((s, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
             <p className={`text-lg font-bold mt-1 ${s.color}`}>{s.value}</p>
           </div>
         ))}
      </div>

      <div className="bg-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="p-4 border-b border-gray-800 bg-[#1E293B] flex justify-between items-center">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
             <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
             Live Execution Log
           </span>
           <span className="text-[10px] text-gray-500 font-mono">LATENCY: 14ms</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase font-bold border-b border-gray-800">
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Symbol</th>
                <th className="px-6 py-3 text-right">Price (₦)</th>
                <th className="px-6 py-3 text-right">Quantity</th>
                <th className="px-6 py-3 text-right">Total (₦)</th>
                <th className="px-6 py-3 text-center">Side</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 font-mono text-sm">
              {trades.map((trade, i) => (
                <tr 
                  key={trade.id} 
                  className={`transition-all duration-700 ${i === 0 ? 'bg-emerald-900/10 animate-in fade-in slide-in-from-top-4' : 'hover:bg-gray-800/30'}`}
                >
                  <td className="px-6 py-4 text-gray-500 text-xs">{trade.time}</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">{trade.symbol}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold ${trade.tick === 'UP' ? 'text-emerald-400' : trade.tick === 'DOWN' ? 'text-rose-400' : 'text-gray-300'}`}>
                      {trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      {trade.tick === 'UP' ? ' ↑' : trade.tick === 'DOWN' ? ' ↓' : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-400">{trade.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-gray-300">{(trade.price * trade.quantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.side === 'BUY' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-rose-900/40 text-rose-400'}`}>
                      {trade.side}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[10px] text-gray-600 italic">Settled T+2</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTrades;
