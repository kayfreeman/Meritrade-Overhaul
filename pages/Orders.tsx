
import React, { useState } from 'react';

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'HISTORY'>('PENDING');

  // Extended Personal Orders Mock Data
  const orders = [
    { id: 'ORD-9821-X', symbol: 'GTCO', side: 'BUY', type: 'LIMIT', price: 51.00, quantity: 10000, filled: 0, status: 'PENDING', time: '10:45 AM', date: '2024-03-24' },
    { id: 'ORD-9822-A', symbol: 'ACCESSCORP', side: 'BUY', type: 'LIMIT', price: 21.50, quantity: 50000, filled: 0, status: 'PENDING', time: '11:15 AM', date: '2024-03-24' },
    { id: 'ORD-9823-B', symbol: 'ZENITHBANK', side: 'SELL', type: 'LIMIT', price: 43.00, quantity: 15000, filled: 0, status: 'PENDING', time: '11:20 AM', date: '2024-03-24' },
    
    { id: 'ORD-9820-Y', symbol: 'MTNN', side: 'SELL', type: 'MARKET', price: 235.50, quantity: 500, filled: 500, status: 'FILLED', time: '09:30 AM', date: '2024-03-24' },
    { id: 'ORD-9819-Z', symbol: 'ZENITHBANK', side: 'BUY', type: 'LIMIT', price: 42.00, quantity: 20000, filled: 20000, status: 'FILLED', time: '03:12 PM', date: '2024-03-23' },
    { id: 'ORD-9818-W', symbol: 'DANGCEM', side: 'BUY', type: 'LIMIT', price: 695.00, quantity: 1000, filled: 0, status: 'CANCELLED', time: '11:05 AM', date: '2024-03-22' },
    { id: 'ORD-9817-V', symbol: 'BUAFOODS', side: 'SELL', type: 'LIMIT', price: 390.00, quantity: 2500, filled: 2500, status: 'FILLED', time: '02:45 PM', date: '2024-03-22' },
    { id: 'ORD-9816-U', symbol: 'AIRTELAFRI', side: 'BUY', type: 'MARKET', price: 2270.00, quantity: 100, filled: 100, status: 'FILLED', time: '10:15 AM', date: '2024-03-21' },
    { id: 'ORD-9815-T', symbol: 'GTCO', side: 'BUY', type: 'LIMIT', price: 49.50, quantity: 5000, filled: 5000, status: 'FILLED', time: '04:00 PM', date: '2024-03-21' },
    { id: 'ORD-9814-S', symbol: 'ACCESSCORP', side: 'SELL', type: 'LIMIT', price: 22.00, quantity: 10000, filled: 0, status: 'CANCELLED', time: '09:10 AM', date: '2024-03-20' },
    { id: 'ORD-9813-R', symbol: 'ZENITHBANK', side: 'BUY', type: 'LIMIT', price: 41.50, quantity: 30000, filled: 30000, status: 'FILLED', time: '11:30 AM', date: '2024-03-19' },
    { id: 'ORD-9812-Q', symbol: 'DANGCEM', side: 'SELL', type: 'MARKET', price: 680.00, quantity: 200, filled: 200, status: 'FILLED', time: '01:20 PM', date: '2024-03-18' },
    { id: 'ORD-9811-P', symbol: 'MTNN', side: 'BUY', type: 'LIMIT', price: 240.00, quantity: 1200, filled: 1200, status: 'FILLED', time: '10:05 AM', date: '2024-03-18' },
    { id: 'ORD-9810-O', symbol: 'BUAFOODS', side: 'BUY', type: 'LIMIT', price: 380.00, quantity: 5000, filled: 0, status: 'CANCELLED', time: '03:50 PM', date: '2024-03-17' },
    { id: 'ORD-9809-N', symbol: 'GTCO', side: 'SELL', type: 'LIMIT', price: 50.50, quantity: 8000, filled: 8000, status: 'FILLED', time: '02:15 PM', date: '2024-03-17' },
  ];

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const historyOrders = orders.filter(o => o.status !== 'PENDING');

  const currentList = activeTab === 'PENDING' ? pendingOrders : historyOrders;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Trading Activity</h2>
          <p className="text-sm text-gray-500">Track and manage your personal trade executions.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('PENDING')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'PENDING' ? 'bg-[#1E4D3B] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Pending Orders ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'HISTORY' ? 'bg-[#1E4D3B] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Execution History ({historyOrders.length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">{activeTab === 'PENDING' ? 'Open Market Positions' : 'Past Executions'}</h3>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Secure Audit Trail</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase">
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Ticker</th>
                <th className="px-6 py-4 font-bold">Side</th>
                <th className="px-6 py-4 font-bold">Type</th>
                <th className="px-6 py-4 font-bold text-right">Price (₦)</th>
                <th className="px-6 py-4 font-bold text-right">Quantity</th>
                <th className="px-6 py-4 font-bold text-right">Filled</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentList.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{order.id}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                    <span className="block font-medium text-gray-600">{order.date}</span>
                    <span className="block opacity-60">{order.time}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.symbol}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${order.side === 'BUY' ? 'text-emerald-600' : 'text-rose-600'}`}>{order.side}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{order.type}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold">₦{order.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-mono">{order.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono">{order.filled.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                      order.status === 'FILLED' ? 'bg-emerald-100 text-emerald-700' : 
                      order.status === 'CANCELLED' ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'PENDING' && (
                      <button className="text-rose-500 text-xs font-bold hover:underline transition-all">Cancel</button>
                    )}
                    {order.status === 'FILLED' && (
                      <button className="text-[#1E4D3B] text-xs font-bold hover:underline transition-all">Receipt</button>
                    )}
                    {order.status === 'CANCELLED' && (
                      <button className="text-gray-300 text-xs font-bold cursor-not-allowed">Details</button>
                    )}
                  </td>
                </tr>
              ))}
              {currentList.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-400 italic font-sans text-sm">
                    No active positions found in this section.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Informational Footer for Orders */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-[11px] text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
        <p>All times are in West Africa Time (WAT). Trade executions are subject to NGX trading hours (10:00 AM - 2:30 PM).</p>
        <div className="flex gap-4 font-bold">
           <span className="text-emerald-600">SETTLEMENT: T+2</span>
           <span className="text-[#1E4D3B]">CSCS SYNC: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
