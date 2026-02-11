
import React, { useState } from 'react';
import { OnboardingStatus } from '../types';

interface SettingsProps {
  userStatus: OnboardingStatus;
}

const Settings: React.FC<SettingsProps> = ({ userStatus }) => {
  const [activeSection, setActiveSection] = useState<'PROFILE' | 'SECURITY' | 'TRADING' | 'NOTIFICATIONS'>('PROFILE');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [defaultOrderType, setDefaultOrderType] = useState('LIMIT');
  const [notifications, setNotifications] = useState({
    orderFilled: true,
    priceAlerts: true,
    weeklyReport: false,
    securityAlerts: true
  });

  const sections = [
    { id: 'PROFILE', label: 'Identity & Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'SECURITY', label: 'Security & Vault', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: 'TRADING', label: 'Trading Engine', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'NOTIFICATIONS', label: 'Intelligence Alerts', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-72 flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all duration-300 font-black text-[11px] uppercase tracking-[0.15em] ${
                activeSection === section.id 
                ? 'bg-[#1E4D3B] text-white shadow-xl shadow-emerald-900/10' 
                : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={section.icon} />
              </svg>
              {section.label}
            </button>
          ))}
          
          <div className="mt-8 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
            <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-4">Account Status</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              </div>
              <div>
                <p className="text-xs font-black text-emerald-900 uppercase">{userStatus.replace('_', ' ')}</p>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-tighter mt-0.5">NGX ID: MT-482910</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 lg:p-14 min-h-[600px]">
          
          {activeSection === 'PROFILE' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-[#1E4D3B] flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                    ND
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-100 rounded-xl shadow-lg flex items-center justify-center text-gray-400 hover:text-[#1E4D3B] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </button>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">Nifemi D*******</h3>
                  <p className="text-gray-400 font-medium mt-1 uppercase tracking-widest text-[11px]">Individual Trading Account • Nigeria</p>
                  <div className="flex gap-4 mt-4">
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">CSCS Linked</span>
                     <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest">CHN: C492813X</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="text" readOnly className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 font-bold text-gray-400" value="ni****@meristem.com.ng" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Phone Number</label>
                  <input type="text" className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#1E4D3B]" placeholder="+234 810 *** 0000" />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Residential Address (Validated)</label>
                  <input type="text" readOnly className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 font-bold text-gray-400" value="12, Meristem Way, Victoria Island, Lagos, Nigeria" />
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <button className="px-10 py-5 bg-[#1E4D3B] text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all">Save Changes</button>
              </div>
            </div>
          )}

          {activeSection === 'SECURITY' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Security Vault</h3>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between p-8 bg-gray-50 rounded-[2rem] border border-transparent hover:border-emerald-100 transition-all">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-900 uppercase">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-gray-400 font-medium">Protect your vault with an extra layer of verification.</p>
                  </div>
                  <button 
                    onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                    className={`w-16 h-8 rounded-full relative transition-all duration-500 ${is2FAEnabled ? 'bg-[#1E4D3B]' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ${is2FAEnabled ? 'left-9' : 'left-1'}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#1E4D3B] group-hover:text-white transition-all mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                      </div>
                      <h4 className="text-sm font-black text-gray-900 uppercase">Change Vault Password</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Last changed 42 days ago</p>
                   </div>
                   <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-rose-600 group-hover:text-white transition-all mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      </div>
                      <h4 className="text-sm font-black text-gray-900 uppercase">Trading PIN Management</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Required for trade execution</p>
                   </div>
                </div>
              </div>

              <div className="bg-[#1E4D3B] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl" />
                <h4 className="text-lg font-black uppercase tracking-tight mb-4">Active Sessions</h4>
                <div className="space-y-4">
                   <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg text-emerald-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest">iPhone 15 Pro • Lagos, NG</p>
                          <p className="text-[9px] text-emerald-200/60 font-bold uppercase">Current Session • Active Now</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black uppercase text-emerald-300">Active</span>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'TRADING' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Trading Preferences</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Default Order Type</label>
                    <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                       {['LIMIT', 'MARKET'].map(type => (
                         <button 
                           key={type}
                           onClick={() => setDefaultOrderType(type)}
                           className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${defaultOrderType === type ? 'bg-[#1E4D3B] text-white shadow-lg' : 'text-gray-400'}`}
                         >
                           {type}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Account Display Currency</label>
                    <select className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 font-bold text-gray-900 outline-none appearance-none cursor-pointer">
                      <option>NGN (₦) — Nigerian Naira</option>
                      <option>USD ($) — US Dollar</option>
                      <option>GBP (£) — British Pound</option>
                    </select>
                  </div>
               </div>

               <div className="p-8 bg-gray-50 rounded-[2rem] space-y-6">
                  <h4 className="text-sm font-black text-gray-900 uppercase">Advanced Execution Options</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Confirm every trade execution', desc: 'Adds an extra step before dispatching orders' },
                      { label: 'Display fractional shares', desc: 'Relevant for US and selected global markets' },
                      { label: 'Institutional Market Tape', desc: 'Enable ultra-low latency real-time tape' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <div>
                            <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{item.label}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                         </div>
                         <button className="w-12 h-6 rounded-full bg-[#1E4D3B] relative">
                            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-md" />
                         </button>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
          )}

          {activeSection === 'NOTIFICATIONS' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between">
                 <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Intelligence Alerts</h3>
                 <button 
                  onClick={() => setNotifications({orderFilled: true, priceAlerts: true, weeklyReport: true, securityAlerts: true})}
                  className="text-[10px] font-black text-[#1E4D3B] uppercase tracking-widest hover:underline"
                 >
                   Enable All
                 </button>
               </div>

               <div className="space-y-4">
                  {[
                    { id: 'orderFilled', label: 'Order Fulfillment', desc: 'Instant push alert when your trade settles on the NGX floor' },
                    { id: 'priceAlerts', label: 'Custom Price Alerts', desc: 'Triggered by stock price movements in your watchlist' },
                    { id: 'weeklyReport', label: 'Portfolio Performance', desc: 'Weekly summary of gains, losses and market insights' },
                    { id: 'securityAlerts', label: 'Critical Security', desc: 'Login alerts and sensitive account change notifications' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-2xl transition-colors border-b border-gray-50 last:border-0">
                       <div className="flex gap-5 items-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${notifications[item.id as keyof typeof notifications] ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-300'}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.label}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                         className={`w-14 h-7 rounded-full relative transition-all duration-300 ${notifications[item.id as keyof typeof notifications] ? 'bg-[#1E4D3B]' : 'bg-gray-200'}`}
                       >
                         <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${notifications[item.id as keyof typeof notifications] ? 'left-8' : 'left-1'}`} />
                       </button>
                    </div>
                  ))}
               </div>
             </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Settings;
