
import React, { useState, useEffect } from 'react';
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

  const selectedStock = MOCK_STOCKS.find(s => s.symbol === selectedSymbol) || MOCK_STOCKS[0];
  const [price, setPrice] = useState<number>(selectedStock.price);

  useEffect(() => {
    setPrice(selectedStock.price);
  }, [selectedSymbol]);

  const grossValue = (quantity || 0) * price;
  const fees = grossValue * 0.0135; // Standard NGX approximate fees
  const totalValue = side === 'BUY' ? grossValue + fees : grossValue - fees;

  const handleExecuteTrade = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const downloadContractNote = () => {
    alert("Generating Contract Note PDF for trade on " + selectedSymbol + "...");
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Order Filled Successfully</h2>
        <p className="text-gray-500 mt-2 max-w-sm">Your order for {quantity.toLocaleString()} units of {selectedSymbol} has been executed on the NGX.</p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
           <button 
             onClick={downloadContractNote}
             className="px-8 py-3 bg-[#1E4D3B] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
             Download Contract Note
           </button>
           <button 
             onClick={() => { setShowSuccess(false); setQuantity(0); }}
             className="px-8 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50"
           >
             New Trade
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Trading Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Order Terminal</h2>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setSide('BUY')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${side === 'BUY' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500'}`}
              >
                BUY
              </button>
              <button 
                onClick={() => setSide('SELL')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${side === 'SELL' ? 'bg-rose-600 text-white shadow-md' : 'text-gray-500'}`}
              >
                SELL
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Select Ticker</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-bold"
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                >
                  {MOCK_STOCKS.map(s => <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Order Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[OrderType.LIMIT, OrderType.MARKET].map(type => (
                    <button 
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${orderType === type ? 'border-[#1E4D3B] bg-emerald-50 text-[#1E4D3B]' : 'border-gray-100 text-gray-400'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Quantity</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-mono font-bold"
                  placeholder="0"
                  value={quantity || ''}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              {orderType === OrderType.LIMIT && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Limit Price (₦)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-mono font-bold"
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase">Estimated Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gross Value</span>
                  <span className="font-mono font-bold text-gray-900">₦{grossValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction Fees (1.35%)</span>
                  <span className="font-mono font-bold text-gray-900">₦{fees.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-bold text-gray-900">Total {side === 'BUY' ? 'Cost' : 'Proceeds'}</span>
                  <span className={`text-lg font-mono font-bold ${side === 'BUY' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    ₦{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleExecuteTrade}
                disabled={quantity <= 0 || isExecuting}
                className={`w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center ${side === 'BUY' ? 'bg-emerald-600' : 'bg-rose-600'} ${isExecuting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isExecuting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Executing...
                  </>
                ) : (
                  `PLACE ${side} ORDER`
                )}
              </button>
              <p className="text-[10px] text-gray-400 text-center leading-tight">
                By clicking, you authorize Meristem to execute this trade on the NGX. Execution is subject to market availability.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
           <h3 className="font-bold text-gray-900 mb-4">Market Depth (Level 2)</h3>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-gray-400 uppercase text-right px-2 mb-2">Bids (Buyers)</p>
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex justify-between items-center text-xs p-1 hover:bg-emerald-50 rounded transition-colors">
                      <span className="text-gray-400">{(1000 * (i + 1)).toLocaleString()}</span>
                      <span className="font-mono font-bold text-emerald-600">{(selectedStock.price - (i * 0.05)).toFixed(2)}</span>
                   </div>
                 ))}
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-gray-400 uppercase text-left px-2 mb-2">Asks (Sellers)</p>
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex justify-between items-center text-xs p-1 hover:bg-rose-50 rounded transition-colors">
                      <span className="font-mono font-bold text-rose-600">{(selectedStock.price + (i * 0.05)).toFixed(2)}</span>
                      <span className="text-gray-400">{(500 * (i + 2)).toLocaleString()}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Stock Info Sidebar */}
      <div className="space-y-6">
        <div className="bg-[#1E4D3B] rounded-2xl p-6 text-white shadow-lg">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h2 className="text-2xl font-bold">{selectedStock.symbol}</h2>
                 <p className="text-xs text-emerald-200 uppercase tracking-widest">{selectedStock.name}</p>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold ${selectedStock.change >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                 LIVE
              </div>
           </div>
           <div className="mt-8">
              <p className="text-3xl font-mono font-bold">₦{selectedStock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <p className={`text-sm font-bold mt-1 ${selectedStock.change >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                 {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent}%)
              </p>
           </div>
           <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white border-opacity-10">
              <div>
                <p className="text-[10px] text-emerald-200 uppercase">Day High</p>
                <p className="font-mono font-bold">₦{selectedStock.high}</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-200 uppercase">Day Low</p>
                <p className="font-mono font-bold">₦{selectedStock.low}</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-200 uppercase">Open</p>
                <p className="font-mono font-bold">₦{selectedStock.open}</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-200 uppercase">Volume</p>
                <p className="font-mono font-bold">{(selectedStock.volume / 1000000).toFixed(2)}M</p>
              </div>
           </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-4">Company Profile</h3>
           <div className="space-y-3 text-xs text-gray-500 leading-relaxed">
              <p>Sector: <span className="text-gray-900 font-bold">{selectedStock.sector}</span></p>
              <p>Listing: <span className="text-gray-900 font-bold">Premium Board (NGX)</span></p>
              <p>Last Audited: <span className="text-gray-900 font-bold">Q4 2023</span></p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
