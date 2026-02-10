
import React, { useState } from 'react';

const Statements: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const activities = [
    { date: '2024-03-24', type: 'BUY', symbol: 'ZENITHBANK', units: 5000, price: 42.15, amount: 210750.00, status: 'COMPLETED' },
    { date: '2024-03-20', type: 'DIVIDEND', symbol: 'GTCO', units: 50000, price: 2.70, amount: 135000.00, status: 'CREDITED' },
    { date: '2024-03-15', type: 'SELL', symbol: 'DANGCEM', units: 1000, price: 710.00, amount: 710000.00, status: 'COMPLETED' },
    { date: '2024-03-05', type: 'FUNDING', symbol: 'CASH', units: 0, price: 0, amount: 500000.00, status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
           <div>
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">E-Statements</h3>
             <p className="text-xs text-gray-500 mb-4">Generate certified financial reports for any period.</p>
             <div className="flex space-x-2">
                <select className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                   <option>Last 30 Days</option>
                   <option>FY 2023</option>
                   <option>Custom Range</option>
                </select>
                <button className="bg-[#1E4D3B] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">Download PDF</button>
             </div>
           </div>
           <div className="hidden sm:block p-4 bg-emerald-50 rounded-2xl">
              <svg className="w-12 h-12 text-[#1E4D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
           </div>
        </div>

        <div className="bg-[#1E4D3B] rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
           <div>
              <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-widest mb-1">Contract Notes</h3>
              <p className="text-xs text-emerald-100 opacity-80 mb-4">Legally binding confirmation of trade executions.</p>
              <button className="bg-[#8BB82D] text-[#1E4D3B] px-6 py-2 rounded-lg text-xs font-bold shadow-md">View Latest</button>
           </div>
           <div className="hidden sm:block p-4 bg-white bg-opacity-10 rounded-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
           <h3 className="font-bold text-gray-900">Activity Log</h3>
           <div className="flex bg-gray-50 p-1 rounded-xl">
              {['ALL', 'TRADES', 'CASH'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${filter === opt ? 'bg-white text-[#1E4D3B] shadow-sm' : 'text-gray-400'}`}
                >
                  {opt}
                </button>
              ))}
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase">
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Activity</th>
                <th className="px-6 py-4 font-bold">Asset</th>
                <th className="px-6 py-4 font-bold text-right">Details</th>
                <th className="px-6 py-4 font-bold text-right">Amount (₦)</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activities.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">{item.date}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                       item.type === 'BUY' ? 'bg-emerald-100 text-emerald-800' : 
                       item.type === 'SELL' ? 'bg-rose-100 text-rose-800' : 
                       item.type === 'DIVIDEND' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                     }`}>
                       {item.type}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-xs text-gray-900">{item.symbol}</td>
                  <td className="px-6 py-4 text-right text-[10px] text-gray-400">
                    {item.units > 0 && `${item.units.toLocaleString()} units @ ₦${item.price.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-xs text-gray-900">
                    {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded">
                      {item.status}
                    </span>
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

export default Statements;
