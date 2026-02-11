
import React, { useState } from 'react';

type ActionType = 'NONE' | 'FUND' | 'WITHDRAW';

const Statements: React.FC = () => {
  const [activeAction, setActiveAction] = useState<ActionType>('NONE');
  const [fundingMethod, setFundingMethod] = useState<'DIGITAL' | 'TRANSFER'>('DIGITAL');
  const [filter, setFilter] = useState('ALL');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [withdrawalStep, setWithdrawalStep] = useState<1 | 2>(1);

  const availableBalance = 2340500.00;

  const activities = [
    { date: '2024-03-24', type: 'FUNDING', symbol: 'CASH', units: 0, price: 0, amount: 250000.00, status: 'SUCCESS' },
    { date: '2024-03-24', type: 'BUY', symbol: 'ZENITHBANK', units: 5000, price: 42.15, amount: 210750.00, status: 'COMPLETED' },
    { date: '2024-03-20', type: 'DIVIDEND', symbol: 'GTCO', units: 50000, price: 2.70, amount: 135000.00, status: 'CREDITED' },
    { date: '2024-03-15', type: 'WITHDRAW', symbol: 'CASH', units: 0, price: 0, amount: 100000.00, status: 'COMPLETED' },
    { date: '2024-03-05', type: 'FUNDING', symbol: 'CASH', units: 0, price: 0, amount: 500000.00, status: 'SUCCESS' },
  ];

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setActiveAction('NONE');
        setAmount('');
        setWithdrawalStep(1);
      }, 2500);
    }, 1500);
  };

  const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

  const renderFundingUI = () => (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-white rounded-[3rem] border border-emerald-100 p-8 lg:p-12 shadow-[0_40px_100px_-20px_rgba(30,77,59,0.1)] space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-3xl font-black text-[#1E4D3B] tracking-tight uppercase">Capital Injection</h3>
          <p className="text-sm text-gray-400 font-medium">Select your preferred institutional funding gateway.</p>
        </div>
        <button onClick={() => setActiveAction('NONE')} className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex bg-gray-50 p-1.5 rounded-[2rem] w-full lg:w-fit">
        <button 
          onClick={() => setFundingMethod('DIGITAL')}
          className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${fundingMethod === 'DIGITAL' ? 'bg-[#1E4D3B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Instant Digital
        </button>
        <button 
          onClick={() => setFundingMethod('TRANSFER')}
          className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${fundingMethod === 'TRANSFER' ? 'bg-[#1E4D3B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Bank Transfer
        </button>
      </div>

      {fundingMethod === 'DIGITAL' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Deposit Amount (₦)</label>
              <div className="relative group">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-[#1E4D3B] text-2xl group-focus-within:scale-110 transition-transform">₦</span>
                <input 
                  type="number" 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#1E4D3B] focus:bg-white rounded-[2.5rem] pl-16 pr-8 py-8 outline-none font-black text-3xl text-gray-900 transition-all shadow-inner"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickAmounts.map(amt => (
                <button 
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-[#8BB82D] hover:text-[#1E4D3B] hover:bg-emerald-50/30 transition-all"
                >
                  ₦{(amt/1000)}k
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 bg-[#F8FAF9] p-10 rounded-[3rem] border border-emerald-50">
            <div className="space-y-4">
               <h4 className="text-sm font-black text-[#1E4D3B] uppercase tracking-widest">Transaction Summary</h4>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-tighter">Gross Principal</span>
                    <span className="font-black text-gray-900">₦{Number(amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-tighter">Gateway Fee</span>
                    <span className="font-black text-emerald-600">FREE</span>
                  </div>
                  <div className="pt-3 border-t border-emerald-100/50 flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Total to Settle</span>
                    <span className="text-2xl font-black text-[#1E4D3B]">₦{Number(amount || 0).toLocaleString()}</span>
                  </div>
               </div>
            </div>
            <button 
              disabled={!amount || isProcessing}
              onClick={handleAction}
              className="w-full py-6 bg-[#1E4D3B] text-white font-black rounded-2xl text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#2D6B53] hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0"
            >
              {isProcessing ? 'Initializing Secure Gateway...' : 'Initialize Payment'}
            </button>
            <div className="flex items-center justify-center gap-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
               <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png" alt="Paystack" className="h-4" />
               <div className="w-px h-4 bg-gray-400 mx-2" />
               <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">PCI-DSS Level 1 Secure</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
          <div className="space-y-8">
            <div className="p-10 bg-[#1E4D3B] rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors" />
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black text-[#8BB82D] uppercase tracking-[0.5em]">Meristem Node Info</p>
                  <svg className="w-8 h-8 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] text-emerald-200/60 font-bold uppercase tracking-widest">Target Institution</p>
                    <p className="text-lg font-black tracking-tight">PROVIDUS BANK</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-emerald-200/60 font-bold uppercase tracking-widest">Account Number</p>
                    <p className="text-3xl font-black tracking-[0.15em] font-mono">1029485721</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-emerald-200/60 font-bold uppercase tracking-widest">Beneficiary Reference</p>
                    <p className="text-lg font-black tracking-tight">MERISTEM / NIFEMI D.</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95">Copy Transaction Token</button>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 flex gap-5">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-[#1E4D3B] uppercase tracking-tight">Manual Reconciliation Flow</p>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-1">Transfers via this node are usually reconciled within <span className="text-emerald-700 font-bold">15-30 minutes</span> during NGX market hours.</p>
              </div>
            </div>
            <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2.5rem] text-center space-y-3 hover:border-emerald-200 transition-colors cursor-pointer group">
               <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 mx-auto group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Proof of Transaction (Optional)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderWithdrawUI = () => (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-white rounded-[3rem] border border-rose-100 p-8 lg:p-12 shadow-[0_40px_100px_-20px_rgba(225,29,72,0.05)] space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-3xl font-black text-[#1E4D3B] tracking-tight uppercase">Capital Liquidation</h3>
          <p className="text-sm text-gray-400 font-medium">Securely settlement to your verified commercial bank account.</p>
        </div>
        <button onClick={() => { setActiveAction('NONE'); setWithdrawalStep(1); }} className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex gap-4">
        {[1, 2].map(step => (
          <div key={step} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${withdrawalStep >= step ? 'bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.3)]' : 'bg-gray-100'}`} />
        ))}
      </div>

      {withdrawalStep === 1 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in slide-in-from-right-4 duration-500">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Liquidation Amount (₦)</label>
              <div className="relative group">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-rose-600 text-2xl">₦</span>
                <input 
                  type="number" 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-[2.5rem] pl-16 pr-8 py-8 outline-none font-black text-3xl text-gray-900 transition-all shadow-inner"
                  placeholder="0.00"
                  max={availableBalance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center px-2">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Max Power: ₦{availableBalance.toLocaleString()}</p>
                 <button onClick={() => setAmount(availableBalance.toString())} className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Withdraw Max</button>
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Settlement Destination</label>
               <div className="p-8 bg-white border-2 border-rose-500/20 rounded-[2.5rem] flex items-center justify-between shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/50 blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-rose-50 rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    </div>
                    <div>
                      <p className="text-lg font-black text-gray-900 tracking-tight">GTBank — Nifemi D.</p>
                      <p className="text-xs text-gray-400 font-bold tracking-widest font-mono">02****8812</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 bg-rose-50/30 p-10 rounded-[3rem] border border-rose-100">
             <div className="space-y-6">
                <h4 className="text-sm font-black text-rose-900 uppercase tracking-widest">Liquidation Forecast</h4>
                <div className="space-y-4">
                   <div className="flex justify-between">
                     <span className="text-[11px] text-rose-800/60 font-bold uppercase tracking-tight">Requested Principal</span>
                     <span className="text-sm font-black text-gray-900">₦{Number(amount || 0).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-[11px] text-rose-800/60 font-bold uppercase tracking-tight">Post-Liquidation Balance</span>
                     <span className="text-sm font-black text-gray-400">₦{Math.max(0, availableBalance - Number(amount || 0)).toLocaleString()}</span>
                   </div>
                   <div className="pt-4 border-t border-rose-100 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black text-rose-900 uppercase">Estimated Settlement</p>
                        <p className="text-[9px] text-rose-600/60 font-bold uppercase">24 Institutional Hours</p>
                      </div>
                      <span className="text-2xl font-black text-rose-600">₦{Number(amount || 0).toLocaleString()}</span>
                   </div>
                </div>
             </div>
             <button 
               disabled={!amount || Number(amount) <= 0 || Number(amount) > availableBalance}
               onClick={() => setWithdrawalStep(2)}
               className="w-full py-6 bg-rose-600 text-white font-black rounded-2xl text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-rose-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-30 disabled:translate-y-0"
             >
               Confirm Liquidation
             </button>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-10 py-8 animate-in zoom-in duration-500 text-center">
           <div className="w-24 h-24 bg-rose-100 rounded-[2.5rem] flex items-center justify-center text-rose-600 mx-auto shadow-inner">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
           </div>
           <div className="space-y-4">
             <h4 className="text-2xl font-black text-[#1E4D3B] uppercase tracking-tight">Security Verification</h4>
             <p className="text-sm text-gray-400 font-medium px-8">A <span className="text-rose-600 font-bold">6-digit Trading PIN</span> is required to authorize the release of institutional capital.</p>
           </div>
           
           <div className="space-y-6">
              <input 
                type="password" 
                maxLength={6}
                className="w-full max-w-[320px] bg-gray-50 border-2 border-gray-100 focus:border-rose-500 focus:bg-white rounded-3xl px-4 py-8 outline-none font-black text-center text-4xl tracking-[0.8em] text-gray-900 shadow-inner transition-all"
                placeholder="••••••"
              />
              <div className="flex flex-col items-center gap-3">
                <button 
                  disabled={isProcessing}
                  onClick={handleAction}
                  className="w-full py-6 bg-rose-600 text-white font-black rounded-2xl text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-rose-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authenticating Vault...
                    </>
                  ) : 'Authorize Immediate Transfer'}
                </button>
                <button onClick={() => setWithdrawalStep(1)} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600">Cancel & Return</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-12 pb-24 max-w-[1400px] mx-auto">
      {/* Success Notification Backdrop */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E4D3B]/20 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white p-16 rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/40 text-center space-y-8 scale-110 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-2 bg-gradient-to-r from-transparent via-[#8BB82D] to-transparent animate-pulse" />
            <div className="w-24 h-24 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center mx-auto text-emerald-600 shadow-inner rotate-3 hover:rotate-0 transition-transform">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-black text-[#1E4D3B] uppercase tracking-tighter">Vault Updated</h4>
              <p className="text-xs text-gray-400 font-black uppercase tracking-[0.3em]">Institutional Transaction Synchronized</p>
            </div>
            <div className="pt-4 border-t border-gray-50 flex justify-center gap-2">
               {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-200" />)}
            </div>
          </div>
        </div>
      )}

      {/* Header & Balance Section */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-[#1E4D3B] tracking-tighter uppercase leading-none">Cash Terminal</h2>
          <p className="text-gray-400 font-medium tracking-wide">Manage your institutional liquidity and capital allocation flow.</p>
        </div>
        
        <div className="flex items-center gap-8 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
           <div className="flex flex-col items-end">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] leading-none">Trading Liquidity</p>
             <p className="text-4xl font-black text-[#1E4D3B] mt-2 tracking-tighter">₦2,340,500.<span className="text-emerald-500 opacity-40">00</span></p>
           </div>
           <div className="w-px h-12 bg-gray-100" />
           <div className="w-16 h-16 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center text-[#8BB82D]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
           </div>
        </div>
      </section>

      {/* Main Action Terminal */}
      <section className="space-y-10">
        {activeAction === 'FUND' && renderFundingUI()}
        {activeAction === 'WITHDRAW' && renderWithdrawUI()}

        {activeAction === 'NONE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <button 
              onClick={() => setActiveAction('FUND')}
              className="group relative p-12 bg-[#1E4D3B] rounded-[4rem] text-left overflow-hidden transition-all hover:scale-[1.02] shadow-[0_40px_80px_-20px_rgba(30,77,59,0.3)] border border-white/10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-[#8BB82D] shadow-inner group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white tracking-tight uppercase leading-none">Fund Account</h3>
                  <p className="text-emerald-100/40 font-medium text-sm mt-4 leading-relaxed max-w-[280px]">Inject instant capital into your trading vault via Cards or Direct Node Transfer.</p>
                </div>
              </div>
              <div className="absolute bottom-12 right-12 text-white/5 group-hover:text-white/10 transition-all">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
              </div>
            </button>

            <button 
              onClick={() => setActiveAction('WITHDRAW')}
              className="group relative p-12 bg-white rounded-[4rem] border border-gray-100 text-left overflow-hidden transition-all hover:scale-[1.02] hover:border-[#1E4D3B] shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-[#1E4D3B] group-hover:bg-[#1E4D3B] group-hover:text-white transition-all shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7l4 4m0 0l4-4m-4 4v10"/></svg>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#1E4D3B] tracking-tight uppercase leading-none">Withdraw Funds</h3>
                  <p className="text-gray-400 font-medium text-sm mt-4 leading-relaxed max-w-[280px]">Liquidate capital and settle directly to your verified commercial bank account.</p>
                </div>
              </div>
              <div className="absolute bottom-12 right-12 text-gray-50 group-hover:text-emerald-50/50 transition-all">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>
              </div>
            </button>
          </div>
        )}
      </section>

      {/* Ledger & History */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-10">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Audit Reports</h3>
            <div className="space-y-5">
              {[
                { label: 'E-Statement', desc: 'Full activity for selected period', color: 'bg-emerald-50', text: 'text-emerald-600' },
                { label: 'Contract Notes', desc: 'Legally binding trade receipts', color: 'bg-blue-50', text: 'text-blue-600' },
                { label: 'Tax Report', desc: 'Annual capital gains breakdown', color: 'bg-rose-50', text: 'text-rose-600' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:border-gray-100 transition-all border border-transparent cursor-pointer flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="font-black text-gray-900 text-sm uppercase tracking-tight">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{item.desc}</p>
                  </div>
                  <div className={`w-10 h-10 ${item.color} ${item.text} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-5 bg-[#1E4D3B] text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#2D6B53] transition-all active:scale-95">Compile Custom Ledger</button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Transaction Ledger</h3>
              <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                {['ALL', 'FUNDING', 'TRADES'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setFilter(opt)}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === opt ? 'bg-white text-[#1E4D3B] shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] text-gray-400 uppercase font-black">
                    <th className="px-10 py-6 tracking-[0.2em]">Timestamp</th>
                    <th className="px-10 py-6 tracking-[0.2em]">Instrument</th>
                    <th className="px-10 py-6 text-right tracking-[0.2em]">Settlement (₦)</th>
                    <th className="px-10 py-6 text-center tracking-[0.2em]">Audit State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activities.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-10 py-8">
                         <p className="text-[11px] text-gray-900 font-black uppercase">{item.date}</p>
                         <p className="text-[9px] text-gray-400 font-bold mt-0.5 font-mono">14:22:05 WAT</p>
                      </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${
                              item.type === 'FUNDING' ? 'bg-emerald-500' : 
                              item.type === 'WITHDRAW' ? 'bg-rose-500' : 'bg-blue-500'
                            }`} />
                            <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{item.type}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <p className={`text-base font-black font-mono ${item.type === 'FUNDING' || item.type === 'DIVIDEND' ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {item.type === 'FUNDING' || item.type === 'DIVIDEND' ? '+' : '-'} {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className="text-[9px] font-black text-gray-400 border-2 border-gray-100 px-4 py-1.5 rounded-xl uppercase tracking-widest group-hover:border-emerald-100 group-hover:text-emerald-600 transition-colors">
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
      </section>
    </div>
  );
};

export default Statements;
