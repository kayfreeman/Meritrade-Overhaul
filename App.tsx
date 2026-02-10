
import React, { useState, useEffect } from 'react';
import { OnboardingStatus } from './types';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import MarketOverview from './pages/MarketOverview';
import Trade from './pages/Trade';
import Portfolio from './pages/Portfolio';
import Statements from './pages/Statements';
import Orders from './pages/Orders';
import ExchangeFeed from './pages/ExchangeFeed';
import { MERISTEM_LOGO_SVG, MOCK_STOCKS } from './constants';

const App: React.FC = () => {
  const [userStatus, setUserStatus] = useState<OnboardingStatus>(OnboardingStatus.UNREGISTERED);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedTradeSymbol, setSelectedTradeSymbol] = useState(MOCK_STOCKS[0].symbol);
  
  const [activeSettingsTab, setActiveSettingsTab] = useState<'GENERAL' | 'IMAGE'>('GENERAL');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUserStatus(OnboardingStatus.APPROVED);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-[#1E4D3B] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-bold text-[#1E4D3B] tracking-widest text-sm">MERITRADE</p>
        <p className="text-gray-400 text-xs mt-1">Initializing Secure Trading Core...</p>
      </div>
    );
  }

  if (showLogin && userStatus === OnboardingStatus.UNREGISTERED) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-2xl max-w-md w-full border border-gray-100">
           <div className="flex justify-center mb-8">
             {MERISTEM_LOGO_SVG}
           </div>
           <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
           <p className="text-gray-500 text-center mt-2 text-sm">Securely log in to your Meritrade account.</p>
           
           <form onSubmit={handleLogin} className="mt-8 space-y-5">
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">Email or Trading ID</label>
               <input 
                 type="text"
                 required
                 className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1E4D3B] transition-all"
                 placeholder="e.g. john.doe@example.com"
                 value={loginEmail}
                 onChange={(e) => setLoginEmail(e.target.value)}
               />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1">Password</label>
               <input 
                 type="password"
                 required
                 className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#1E4D3B] transition-all"
                 placeholder="••••••••"
                 value={loginPassword}
                 onChange={(e) => setLoginPassword(e.target.value)}
               />
             </div>
             <div className="flex items-center justify-between text-xs px-1">
               <label className="flex items-center text-gray-500 cursor-pointer">
                 <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#1E4D3B] focus:ring-[#1E4D3B]" />
                 Remember Me
               </label>
               <button type="button" className="text-[#1E4D3B] font-bold hover:underline">Forgot Password?</button>
             </div>
             <button 
               type="submit"
               className="w-full py-4 bg-[#1E4D3B] text-white font-bold rounded-2xl shadow-lg hover:bg-opacity-90 active:scale-95 transition-all mt-4"
             >
               Sign In
             </button>
             <button 
               type="button"
               onClick={() => setShowLogin(false)}
               className="w-full py-2 text-gray-400 text-xs font-medium hover:text-gray-600 transition-colors"
             >
               Go Back
             </button>
           </form>
        </div>
      </div>
    );
  }

  if (userStatus === OnboardingStatus.UNREGISTERED) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-12 rounded-[2rem] shadow-xl max-w-md w-full text-center border border-gray-100">
           <div className="flex justify-center mb-6">
             <div className="p-4 bg-emerald-50 rounded-3xl">
                <svg className="w-12 h-12 text-[#1E4D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20c4.478 0 8.268-2.943 9.542-7H10.745M9 11V9a3 3 0 00-6 0v2m6 0H3m0 0h.341C4.403 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
                </svg>
             </div>
           </div>
           <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Meritrade NextGen</h2>
           <p className="text-gray-500 mt-4 text-sm leading-relaxed">Experience a state-of-the-art trading environment. Securely trade NGX stocks and manage your wealth with Meristem Nigeria.</p>
           <div className="mt-10 space-y-4">
             <button 
               onClick={() => setUserStatus(OnboardingStatus.REGISTERED)}
               className="w-full py-4 bg-[#1E4D3B] text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-300"
             >
               Get Started
             </button>
             <p className="text-xs text-gray-400">
               Already have an account? {' '}
               <button 
                 onClick={() => setShowLogin(true)}
                 className="text-[#1E4D3B] font-bold cursor-pointer hover:underline outline-none"
               >
                 Log In
               </button>
             </p>
           </div>
           <div className="mt-12 pt-8 border-t border-gray-50">
              <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Licensed by the SEC Nigeria</p>
           </div>
        </div>
      </div>
    );
  }

  if (userStatus === OnboardingStatus.REGISTERED || userStatus === OnboardingStatus.KYC_IN_REVIEW) {
    if (userStatus === OnboardingStatus.KYC_IN_REVIEW) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl max-w-lg w-full text-center border border-gray-100">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-emerald-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Application Under Review</h2>
                    <p className="text-gray-500 mt-4 leading-relaxed">Our compliance team is verifying your NDPA-compliant KYC documents. This typically takes 24-48 business hours.</p>
                    <div className="mt-10">
                        <button 
                            onClick={() => setUserStatus(OnboardingStatus.APPROVED)}
                            className="text-xs font-bold text-[#1E4D3B] hover:bg-emerald-50 px-4 py-2 rounded-lg transition-colors border border-emerald-100"
                        >
                            DEV: Simulation Approval
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return <Onboarding onComplete={(newStatus) => setUserStatus(newStatus)} />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard userStatus={userStatus} />;
      case 'market':
        return <MarketOverview onTradeClick={(symbol) => {
          setSelectedTradeSymbol(symbol);
          setActivePage('trade');
        }} />;
      case 'trade':
        return <Trade key={selectedTradeSymbol} initialSymbol={selectedTradeSymbol} />;
      case 'exchange-feed':
        return <ExchangeFeed />;
      case 'orders':
        return <Orders />;
      case 'portfolio':
        return <Portfolio />;
      case 'statements':
        return <Statements />;
      case 'settings':
        return (
          <div className="max-w-4xl space-y-6">
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  <button 
                    onClick={() => setActiveSettingsTab('GENERAL')}
                    className={`flex-1 py-4 text-sm font-bold transition-all ${activeSettingsTab === 'GENERAL' ? 'text-[#1E4D3B] bg-emerald-50/30 border-b-2 border-[#1E4D3B]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    General Settings
                  </button>
                  <button 
                    onClick={() => setActiveSettingsTab('IMAGE')}
                    className={`flex-1 py-4 text-sm font-bold transition-all ${activeSettingsTab === 'IMAGE' ? 'text-[#1E4D3B] bg-emerald-50/30 border-b-2 border-[#1E4D3B]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Identity Image
                  </button>
                </div>

                {activeSettingsTab === 'GENERAL' ? (
                  <div className="p-6 space-y-8">
                    <section>
                      <h3 className="font-bold text-gray-900 mb-4">Profile Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Masked Name (NDPA Compliance)</p>
                          <p className="text-lg font-medium text-gray-800">John D***</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Trading Account ID</p>
                          <p className="text-lg font-mono font-medium text-gray-800">TRA-9812-****</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">KYC Verification Status</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            userStatus === OnboardingStatus.APPROVED ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {userStatus.replace('_', ' ')}
                          </span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">CSCS Number</p>
                            <p className="text-lg font-medium text-gray-800">****1234</p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="pt-6 border-t border-gray-50">
                        <h3 className="font-bold text-gray-900 mb-4">Security & Privacy</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group">
                            <div>
                              <p className="font-semibold text-gray-800 group-hover:text-[#1E4D3B]">Multi-Factor Authentication</p>
                              <p className="text-xs text-gray-400">Manage your OTP and biometric settings</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group">
                            <div>
                              <p className="font-semibold text-gray-800 group-hover:text-[#1E4D3B]">Data Sharing & Consent</p>
                              <p className="text-xs text-gray-400">View and revoke third-party permissions</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                        </div>
                    </section>
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-[2rem] bg-gray-100 overflow-hidden border-4 border-white shadow-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                          alt="Registrant Identity" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full border-4 border-white shadow-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-8 text-center space-y-2">
                      <h4 className="text-xl font-bold text-gray-900">John Doe</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Verified Registrant Picture</p>
                      <p className="text-sm text-gray-500 max-w-sm">This image was captured during your liveness verification step on 24th March, 2024 and is stored securely for compliance purposes.</p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                       <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Liveness Score</p>
                          <p className="text-lg font-bold text-emerald-600">99.8%</p>
                       </div>
                       <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Match Confidence</p>
                          <p className="text-lg font-bold text-emerald-600">HIGH</p>
                       </div>
                    </div>
                  </div>
                )}
             </div>

             <div className="p-4 bg-gray-100 rounded-xl text-center">
               <p className="text-xs text-gray-400">Environment: PROD | NGX Link: ACTIVE | Latency: 12ms</p>
               <button onClick={() => setUserStatus(OnboardingStatus.APPROVED)} className="mt-2 text-[10px] text-[#1E4D3B] font-bold opacity-30 hover:opacity-100 transition-opacity">DEV: RESET STATE</button>
             </div>
          </div>
        );
      default:
        return <Dashboard userStatus={userStatus} />;
    }
  };

  return (
    <Layout 
      activePage={activePage} 
      setActivePage={setActivePage} 
      userStatus={userStatus}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
