
import React, { useState, useEffect, useRef } from 'react';
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
import Settings from './pages/Settings';
import { MERISTEM_LOGO_SVG, MOCK_STOCKS } from './constants';

const App: React.FC = () => {
  const [userStatus, setUserStatus] = useState<OnboardingStatus>(OnboardingStatus.UNREGISTERED);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTradeSymbol, setSelectedTradeSymbol] = useState(MOCK_STOCKS[0].symbol);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUserStatus(OnboardingStatus.APPROVED);
      setShowLogin(false);
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserStatus(OnboardingStatus.UNREGISTERED);
      setShowLogin(false);
      setShowOnboarding(false);
      setActivePage('dashboard');
      setIsLoading(false);
    }, 800);
  };

  const handleExitToWebsite = () => {
    setShowLogin(false);
    setShowOnboarding(false);
    setUserStatus(OnboardingStatus.UNREGISTERED);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-[#1E4D3B] border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-12 text-center space-y-2">
          <p className="font-black text-[#1E4D3B] tracking-[0.6em] text-sm uppercase">Meritrade</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Synchronizing Financial Core...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={(status) => { setUserStatus(status); setShowOnboarding(false); setActivePage('dashboard'); }} />;
  }

  // --- Overhauled Landing Page ---
  if (!showLogin && userStatus === OnboardingStatus.UNREGISTERED) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-[#8BB82D] selection:text-white flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[1280px] bg-white rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative">
          
          {/* Header Navigation */}
          <header className="px-8 lg:px-16 py-8 flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="scale-75 origin-left">{MERISTEM_LOGO_SVG}</div>
              <nav className="hidden lg:flex items-center space-x-10">
                {["Wealth Management", "Stockbroking", "Trust"].map((item) => (
                  <button key={item} className="text-sm font-bold text-[#1E4D3B] hover:text-[#8BB82D] transition-colors whitespace-nowrap">
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setShowLogin(true)}
                className="text-sm font-bold text-[#1E4D3B] border-2 border-[#1E4D3B] px-8 py-2.5 rounded-xl hover:bg-[#1E4D3B] hover:text-white transition-all"
              >
                Login
              </button>
              <button 
                onClick={() => setShowOnboarding(true)}
                className="text-sm font-black bg-[#1E4D3B] text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Create Account
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <main className="px-8 lg:px-16 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="relative flex justify-center lg:justify-start">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-[120%] bg-[#1E4D3B] opacity-10 blur-3xl rounded-full" />
                <div className="w-[85%] h-[85%] bg-[#1E4D3B] rounded-[4rem] rotate-45" />
                <div className="absolute w-[85%] h-[85%] bg-[#1E4D3B] rounded-[4rem] -rotate-45 shadow-2xl" />
              </div>

              <div className="relative z-10 w-full max-w-[500px] aspect-[4/3] rounded-[3rem] overflow-hidden border-4 border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2070" 
                  alt="Meritrade Professional Trader"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center lg:text-left space-y-8 z-20">
              <h1 className="text-6xl lg:text-[7.5rem] font-black text-[#1E4D3B] leading-[0.9] tracking-tighter">
                Growth You <br/> Can Trust
              </h1>
              <div className="pt-4">
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="bg-[#1E4D3B] text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#2D6B53] hover:-translate-y-1 transition-all active:scale-95"
                >
                  Get Started
                </button>
              </div>
            </div>
          </main>

          {/* Bottom Feature Cards with Beautified Icons */}
          <section className="px-8 lg:px-16 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Stocks & ETFs", 
                desc: "Invest in leading Nigerian & global companies", 
                icon: (
                  <div className="relative group/icon">
                    <div className="absolute inset-0 bg-[#8BB82D]/20 blur-xl rounded-full scale-150 transition-transform group-hover/icon:scale-[2]" />
                    <svg className="w-12 h-12 relative z-10" viewBox="0 0 24 24" fill="none">
                       <path d="M4 17L10 11L13 14L20 7" stroke="#1E4D3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                       <circle cx="20" cy="7" r="3" fill="#8BB82D" className="animate-pulse" />
                       <path d="M4 12V17H9" stroke="#1E4D3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40" />
                       <path d="M20 12V7H15" stroke="#1E4D3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40" />
                    </svg>
                  </div>
                )
              },
              { 
                title: "Bonds & REITs", 
                desc: "Fixed income from FGN & NGX", 
                icon: (
                  <div className="relative group/icon">
                    <div className="absolute inset-0 bg-[#1E4D3B]/10 blur-xl rounded-full scale-150 transition-transform group-hover/icon:scale-[2]" />
                    <svg className="w-12 h-12 relative z-10" viewBox="0 0 24 24" fill="none">
                       <rect x="5" y="4" width="14" height="16" rx="2" stroke="#1E4D3B" strokeWidth="2" />
                       <path d="M9 8H15M9 12H15M9 16H12" stroke="#1E4D3B" strokeWidth="1.5" strokeLinecap="round" />
                       <circle cx="17" cy="18" r="4" fill="white" stroke="#8BB82D" strokeWidth="2" />
                       <path d="M16 18L17 19L18 17" stroke="#1E4D3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )
              },
              { 
                title: "Other Fixed Income", 
                desc: "Diversity with secure instruments", 
                icon: (
                  <div className="relative group/icon">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-150 transition-transform group-hover/icon:scale-[2]" />
                    <svg className="w-12 h-12 relative z-10" viewBox="0 0 24 24" fill="none">
                       <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#1E4D3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       <circle cx="12" cy="12" r="3" stroke="#8BB82D" strokeWidth="2" />
                       <path d="M12 10.5V12L13 13" stroke="#1E4D3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className="bg-white border-2 border-gray-100 rounded-[3rem] p-10 flex flex-col items-center text-center space-y-6 hover:border-[#1E4D3B] hover:shadow-[0_50px_100px_-30px_rgba(30,77,59,0.15)] transition-all duration-500 cursor-pointer group"
              >
                <div className="p-6 bg-[#F8FAF9] rounded-3xl group-hover:bg-[#F0F4F2] transition-colors duration-500">
                  {card.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-[#1E4D3B]">{card.title}</h3>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed px-4">{card.desc}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Institutional Footer with Color Hover Effects */}
        <div className="mt-16 text-center space-y-8 pb-16">
          <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.6em]">Meristem Nigeria Limited • Member of NGX Group</p>
          <div className="flex items-center justify-center gap-14">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png" 
              alt="Paystack" 
              className="h-6 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
              alt="Visa" 
              className="h-6 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
              alt="Mastercard" 
              className="h-10 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95" 
            />
          </div>
        </div>
      </div>
    );
  }

  // --- Secure Login Terminal ---
  if (showLogin && userStatus === OnboardingStatus.UNREGISTERED) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans bg-[#1E4D3B]">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#8BB82D] blur-[250px] opacity-25 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-emerald-400 blur-[200px] opacity-15 rounded-full" />
        <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-12 animate-in slide-in-from-left duration-700">
            <div className="scale-150 brightness-0 invert transition-transform hover:scale-[1.6] duration-500">{MERISTEM_LOGO_SVG}</div>
            <div className="space-y-6">
              <h1 className="text-8xl font-black text-white tracking-tighter uppercase italic opacity-95">Meritrade</h1>
              <div className="h-0.5 w-32 bg-[#8BB82D] mx-auto rounded-full shadow-[0_0_20px_rgba(139,184,45,0.8)]" />
              <p className="text-xs text-emerald-200 font-black uppercase tracking-[1em] pl-4">Secure Access Vault</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-in fade-in zoom-in duration-700">
            <div className="w-full max-w-md bg-white p-16 rounded-[4.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative border border-white/20">
              <div className="mb-14 text-center">
                 <h2 className="text-5xl font-black text-[#1E4D3B] tracking-tight">Login</h2>
                 <p className="text-sm text-gray-400 font-medium mt-3 uppercase tracking-widest">Institutional Terminal Access</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-10">
                <div className="space-y-8">
                  <div className="group">
                    <label className="block text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-1 mb-2.5">Access Identifier</label>
                    <input 
                      type="text"
                      required
                      className="w-full bg-[#F8FAF9] border-2 border-transparent group-focus-within:border-[#1E4D3B] group-focus-within:bg-white transition-all rounded-3xl px-8 py-6 outline-none font-bold text-gray-900 shadow-inner"
                      placeholder="Email or Trading ID"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-1 mb-2.5">Terminal Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full bg-[#F8FAF9] border-2 border-transparent group-focus-within:border-[#1E4D3B] group-focus-within:bg-white transition-all rounded-3xl px-8 py-6 outline-none font-bold text-gray-900 shadow-inner"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1E4D3B] transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-7 bg-[#1E4D3B] text-white font-black rounded-[2.5rem] text-xs uppercase tracking-[0.4em] shadow-[0_30px_60px_rgba(0,0,0,0.2)] hover:bg-[#2D6B53] hover:-translate-y-1 transition-all active:scale-95">Access Your Account</button>
                <div className="pt-12 border-t border-gray-100 text-center">
                  <button type="button" onClick={handleExitToWebsite} className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] hover:text-[#1E4D3B] transition-colors">← Exit Terminal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard userStatus={userStatus} onNavigateToKYC={() => setActivePage('settings')} />;
      case 'market': return <MarketOverview onTradeClick={(symbol) => { setSelectedTradeSymbol(symbol); setActivePage('trade'); }} />;
      case 'trade': return <Trade key={selectedTradeSymbol} initialSymbol={selectedTradeSymbol} />;
      case 'exchange-feed': return <ExchangeFeed />;
      case 'orders': return <Orders />;
      case 'portfolio': return <Portfolio />;
      case 'statements': return <Statements />;
      case 'settings': return <Settings userStatus={userStatus} />;
      default: return <Dashboard userStatus={userStatus} onNavigateToKYC={() => setActivePage('settings')} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} userStatus={userStatus} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
