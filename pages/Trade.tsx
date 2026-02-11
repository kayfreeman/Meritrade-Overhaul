
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_STOCKS, COLORS } from '../constants';
import { OrderType } from '../types';

interface TradeProps {
  initialSymbol?: string;
}

const Trade: React.FC<TradeProps> = ({ initialSymbol }) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol || MOCK_STOCKS[0].symbol);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.LIMIT);
  const [quantity, setQuantity] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const selectedStock = MOCK_STOCKS.find(s => s.symbol === selectedSymbol) || MOCK_STOCKS[0];
  const [price, setPrice] = useState<number>(selectedStock.price);

  useEffect(() => {
    setPrice(selectedStock.price);
    
    // TradingView Widget Loader
    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": `NGX:${selectedSymbol}`,
        "interval": "D",
        "timezone": "Africa/Lagos",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      });
      container.current.appendChild(script);
    }
  }, [selectedSymbol]);

  const grossValue = (quantity || 0) * price;
  const fees = grossValue * 0.0135; 
  const totalValue = side === 'BUY' ? grossValue + fees : grossValue - fees;

  const handleExecuteTrade = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Order Dispatched</h2>
        <p className="text-gray-500 mt-3 max-w-sm font-medium">Position of {quantity.toLocaleString()} units of {selectedSymbol} is being settled on the NGX floor.</p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-5">
           <button className="px-10 py-5 bg-[#1E4D3B] text-white font-black rounded-3xl text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center gap-3">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
             Generate Receipt
           </button>
           <button 
             onClick={() => { setShowSuccess(false); setQuantity(0); }}
             className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-400 font-black rounded-3xl text-[10px] uppercase tracking-[0.2em] hover:border-[#1E4D3B] hover:text-[#1E4D3B] transition-all"
           >
             New Execution
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Charting Area */}
      <div className="xl:col-span-3 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden h-[600px] relative">
           <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md z-10 px-8 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-4">
                 <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">{selectedSymbol} Technical Chart</h2>
                 <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Live Feed</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
           </div>
           <div ref={container} className="w-full h-full pt-14" id="tradingview_widget">
             {/* TradingView script injected here */}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] mb-6">Market Depth</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px]">
                         <span className="text-gray-400 font-mono">{(1200 * (i+1)).toLocaleString()}</span>
                         <span className="font-black text-emerald-600">{(selectedStock.price - (i * 0.05)).toFixed(2)}</span>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px]">
                         <span className="font-black text-rose-600">{(selectedStock.price + (i * 0.05)).toFixed(2)}</span>
                         <span className="text-gray-400 font-mono">{(800 * (i+1)).toLocaleString()}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           <div className="bg-[#1E4D3B] rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-center">
              <p className="text-[10px] font-black text-emerald-200 uppercase tracking-[0.3em] mb-2">Portfolio Position</p>
              <h4 className="text-4xl font-black tracking-tighter">₦4,250.00</h4>
              <p className="text-xs text-emerald-400 font-bold mt-2 uppercase">Equity Locked: 15,000 Units</p>
           </div>
        </div>
      </div>

      {/* Execution Terminal */}
      <div className="xl:col-span-1 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-10 flex flex-col h-full">
           <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
              <button 
                onClick={() => setSide('BUY')}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${side === 'BUY' ? 'bg-[#1E4D3B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                BUY
              </button>
              <button 
                onClick={() => setSide('SELL')}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${side === 'SELL' ? 'bg-rose-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
              >
                SELL
              </button>
           </div>

           <div className="space-y-8 flex-1">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Asset</label>
                 <select 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-black text-gray-900 appearance-none cursor-pointer"
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                 >
                    {MOCK_STOCKS.map(s => <option key={s.symbol} value={s.symbol}>{s.symbol}</option>)}
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Order Type</label>
                 <div className="grid grid-cols-2 gap-3">
                    {[OrderType.LIMIT, OrderType.MARKET].map(type => (
                      <button 
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${orderType === type ? 'border-[#1E4D3B] bg-emerald-50 text-[#1E4D3B] shadow-sm' : 'border-gray-100 text-gray-400'}`}
                      >
                        {type}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Quantity</label>
                 <input 
                    type="number"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-mono font-black text-gray-900"
                    placeholder="0"
                    value={quantity || ''}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                 />
              </div>

              {orderType === OrderType.LIMIT && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Limit Price (₦)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-mono font-black text-gray-900"
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              )}

              <div className="pt-8 border-t border-gray-50 space-y-3">
                 <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-400">Total Settlement</span>
                    <span className={`font-mono text-sm ${side === 'BUY' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ₦{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                 </div>
                 <button 
                    onClick={handleExecuteTrade}
                    disabled={quantity <= 0 || isExecuting}
                    className={`w-full py-6 rounded-3xl text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 flex items-center justify-center ${side === 'BUY' ? 'bg-[#1E4D3B]' : 'bg-rose-600'} ${isExecuting ? 'opacity-70 cursor-not-allowed' : ''}`}
                 >
                    {isExecuting ? 'Syncing NGX...' : `Execute ${side}`}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
