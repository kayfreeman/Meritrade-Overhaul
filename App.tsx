
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
import { MERISTEM_LOGO_SVG, MOCK_STOCKS, MERITRADE_INTERFACE_MOCKUP } from './constants';

const App: React.FC = () => {
  const [userStatus, setUserStatus] = useState<OnboardingStatus>(OnboardingStatus.APPROVED);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTradeSymbol, setSelectedTradeSymbol] = useState(MOCK_STOCKS[0].symbol);

  // Settings specific state
  const [activeSettingsTab, setActiveSettingsTab] = useState<'PROFILE' | 'SECURITY'>('PROFILE');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [pinSetup, setPinSetup] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const renderSettings = () => {
    return (
      <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Terminal Settings</h1>
            <p className="text-gray-400 font-medium mt-1">Manage your institutional identity and secure access.</p>
          </div>
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
            <button 
              onClick={() => setActiveSettingsTab('PROFILE')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeSettingsTab === 'PROFILE' ? 'bg-[#1E4D3B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Profile & NDPR
            </button>
            <button 
              onClick={() => setActiveSettingsTab('SECURITY')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeSettingsTab === 'SECURITY' ? 'bg-[#1E4D3B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Security & Access
            </button>
          </div>
        </div>

        {activeSettingsTab === 'PROFILE' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Identity Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <div className="relative group mb-6">
                  <div className="w-40 h-40 rounded-[3rem] bg-gray-100 overflow-hidden border-4 border-white shadow-xl transition-transform group-hover:scale-105">
                    <img 
                      src="https://i.pravatar.cc/300?u=nifemi" 
                      alt="Nifemi D." 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900">Nifemi D***</h3>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mt-2">Trading ID: TRA-8801-X</p>
                
                <div className="mt-8 w-full space-y-3">
                   <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Verification</span>
                      <span className="text-[10px] font-black text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-200 uppercase">Tier 3 Verified</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NDPR Compliance</span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase">Up-to-date</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Profile Update Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Identity Registry</h3>
                    <p className="text-sm text-gray-400 font-medium">Profile data is handled according to NDPR (Nigeria Data Protection Regulation).</p>
                  </div>
                  <button 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="bg-emerald-50 text-[#1E4D3B] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                  >
                    {isEditingProfile ? 'Cancel Edit' : 'Edit Information'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: 'Full Name', value: isEditingProfile ? 'Nifemi Daniel' : 'Nifemi D***', editable: true },
                    { label: 'Email Address', value: isEditingProfile ? 'nifemi@example.com' : 'ni****@***.com', editable: true },
                    { label: 'BVN Status', value: 'Verified (Ends in ****34)', editable: false },
                    { label: 'CSCS Account', value: '66****901', editable: false },
                    { label: 'Residential Address', value: isEditingProfile ? 'Ikoyi, Lagos, Nigeria' : 'Ik****, La****', editable: true },
                    { label: 'Phone Number', value: isEditingProfile ? '+234 810 *** ****' : '+234 810 *** ****', editable: true }
                  ].map((field, i) => (
                    <div key={i} className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                       {isEditingProfile && field.editable ? (
                         <input 
                           type="text" 
                           defaultValue={field.value}
                           className="w-full bg-gray-50 border border-emerald-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#1E4D3B] font-bold text-gray-900"
                         />
                       ) : (
                         <div className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 font-bold text-gray-900">
                           {field.value}
                         </div>
                       )}
                    </div>
                  ))}
                </div>

                {isEditingProfile && (
                  <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[10px] text-gray-400 font-bold max-w-sm uppercase leading-relaxed tracking-wider">
                      Updating your profile triggers a new NDPR compliance cycle and may require re-verification of certain identifiers.
                    </p>
                    <button 
                      className="bg-[#1E4D3B] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                      onClick={() => {
                        setIsEditingProfile(false);
                        alert("NDPR Registry Updated Successfully.");
                      }}
                    >
                      Save & Sync Registry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Security Toggles */}
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm space-y-12">
               <div className="flex items-center gap-6 mb-4">
                  <div className="p-4 bg-emerald-50 rounded-3xl text-[#1E4D3B]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Access Control</h3>
                    <p className="text-sm text-gray-400 font-medium">Protect your institutional assets with advanced biometric layers.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent transition-all hover:bg-white hover:shadow-xl hover:border-emerald-50 group flex items-center justify-between">
                     <div>
                        <p className="font-black text-gray-900 uppercase text-xs tracking-widest">Biometric Unlock</p>
                        <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-[0.1em]">FaceID / Fingerprint Access</p>
                     </div>
                     <button 
                       onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                       className={`w-14 h-8 rounded-full relative transition-all duration-300 ${biometricsEnabled ? 'bg-[#1E4D3B]' : 'bg-gray-300'}`}
                     >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${biometricsEnabled ? 'left-7' : 'left-1'}`} />
                     </button>
                  </div>

                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent transition-all hover:bg-white hover:shadow-xl hover:border-emerald-50 flex items-center justify-between">
                     <div>
                        <p className="font-black text-gray-900 uppercase text-xs tracking-widest">Two-Factor Auth</p>
                        <p className="text-[11px] text-emerald-600 mt-1 uppercase font-black tracking-[0.1em]">ENFORCED (SMS/OTP)</p>
                     </div>
                     <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                     </div>
                  </div>
               </div>

               <div className="p-10 bg-[#F8FAF9] rounded-[3rem] border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 space-y-2">
                     <h4 className="text-xl font-black text-[#1E4D3B] uppercase tracking-tight">Mobile Access PIN</h4>
                     <p className="text-sm text-gray-500 font-medium">Set a unique 4-6 digit code for secondary authorization on mobile devices.</p>
                  </div>
                  <button 
                    onClick={() => setPinSetup(true)}
                    className="bg-white border-2 border-[#1E4D3B] text-[#1E4D3B] px-12 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#1E4D3B] hover:text-white transition-all shadow-md"
                  >
                    {pinSetup ? 'Update Mobile PIN' : 'Setup Access PIN'}
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-[#1E4D3B] border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-8 text-center">
          <p className="font-black text-[#1E4D3B] tracking-[0.4em] text-sm uppercase">Meritrade</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Connecting to NGX Gateway...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={(status) => {
      setUserStatus(status);
      setShowOnboarding(false);
      setActivePage('dashboard');
    }} />;
  }

  // --- Public Institutional Landing Page ---
  if (!showLogin && userStatus === OnboardingStatus.UNREGISTERED) {
    return (
      <div className="min-h-screen bg-white font-sans selection:bg-[#8BB82D] selection:text-white overflow-x-hidden">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl h-20 shadow-sm border-b border-gray-100' : 'bg-transparent h-28'}`}>
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="scale-75 origin-left hover:scale-[0.78] transition-transform cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              {MERISTEM_LOGO_SVG}
            </div>
            <div className="hidden lg:flex items-center space-x-12">
               <div className="flex space-x-10 text-[10px] font-black text-[#1E4D3B] uppercase tracking-[0.3em]">
                  <button onClick={() => scrollTo(featuresRef)} className="hover:text-[#8BB82D] transition-colors relative group">
                    Terminal Features
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8BB82D] transition-all group-hover:width-full" />
                  </button>
                  <button onClick={() => scrollTo(researchRef)} className="hover:text-[#8BB82D] transition-colors relative group">
                    Research Intel
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8BB82D] transition-all group-hover:width-full" />
                  </button>
                  <a href="https://meristemng.com/wealth-management" target="_blank" className="hover:text-[#8BB82D] transition-colors relative group">
                    Wealth Management
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8BB82D] transition-all group-hover:width-full" />
                  </a>
               </div>
               <div className="flex items-center gap-6 border-l border-gray-100 pl-10">
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="text-[10px] font-black text-[#1E4D3B] uppercase tracking-[0.4em] hover:text-[#8BB82D] transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setShowOnboarding(true)}
                    className="bg-[#1E4D3B] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(30,77,59,0.2)] hover:shadow-[0_25px_50px_rgba(30,77,59,0.3)] hover:-translate-y-1 transition-all"
                  >
                    Get Started
                  </button>
               </div>
            </div>
          </div>
        </nav>

        <section className="relative pt-48 pb-32 bg-gradient-to-b from-[#F0F4F2] to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-100/30 via-transparent to-transparent opacity-60 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10 animate-in slide-in-from-left duration-1000">
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/40 shadow-sm">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i}`} /></div>)}
                   </div>
                   <span className="text-[9px] font-black text-[#1E4D3B] uppercase tracking-[0.4em]">Trusted by 50k+ Institutional Traders</span>
                </div>
                <h1 className="text-7xl md:text-[8rem] font-black text-gray-900 leading-[0.82] tracking-tighter">
                  Invest with <span className="text-[#1E4D3B] italic">Vision</span>.
                </h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                  Meritrade NextGen is Nigeria's most advanced digital gateway to the NGX. Execution at the speed of thought, analytics with the depth of a partner.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <button 
                    onClick={() => setShowOnboarding(true)}
                    className="bg-[#1E4D3B] text-white px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-[0_30px_60px_rgba(30,77,59,0.3)] hover:scale-105 active:scale-95 transition-all group"
                  >
                    Open Trading Account
                    <span className="inline-block ml-3 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="bg-white text-[#1E4D3B] border-2 border-[#1E4D3B] px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-emerald-50 transition-all"
                  >
                    Launch Terminal
                  </button>
                </div>
              </div>
              <div className="relative group animate-in zoom-in-95 duration-1000 delay-200">
                 <div className="absolute -inset-20 bg-[#8BB82D]/10 blur-[120px] rounded-full animate-pulse" />
                 <div className="relative transform hover:scale-[1.02] transition-transform duration-700">
                    {MERITRADE_INTERFACE_MOCKUP}
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-32 bg-white">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                 <p className="text-[10px] font-black text-[#8BB82D] uppercase tracking-[0.5em]">The Meristem Advantage</p>
                 <h2 className="text-5xl font-black text-gray-900 tracking-tight">Precision tools for the modern portfolio.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 {[
                   { title: "Direct NGX Access", desc: "Native connectivity to the Nigerian Stock Exchange for lightning-fast execution and real-time tape reading.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                   { title: "AI Research", desc: "Gemini-powered market intelligence providing instant sentiment analysis and portfolio optimization.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
                   { title: "Vault Security", desc: "NDPA-compliant data architecture with biometric multi-factor authentication for absolute trade integrity.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }
                 ].map((f, i) => (
                    <div key={i} className="group p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:bg-white hover:border-[#1E4D3B]/10 hover:shadow-2xl transition-all duration-500">
                       <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#1E4D3B] mb-8 group-hover:bg-[#1E4D3B] group-hover:text-white transition-colors">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon}/></svg>
                       </div>
                       <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{f.title}</h3>
                       <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        <footer className="bg-white pt-32 pb-16 border-t border-gray-100">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
                 <div className="scale-75 origin-left grayscale opacity-50">{MERISTEM_LOGO_SVG}</div>
              </div>
              <div className="mt-20 pt-8 border-t border-gray-50 text-center">
                 <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">© 2024 Meristem Nigeria Limited. All Rights Reserved.</p>
              </div>
           </div>
        </footer>
      </div>
    );
  }

  // --- Secure Login Terminal ---
  if (showLogin && userStatus === OnboardingStatus.UNREGISTERED) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans bg-[#1E4D3B]">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#8BB82D] blur-[250px] opacity-20 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-400 blur-[200px] opacity-10 rounded-full" />
        <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-12 animate-in slide-in-from-left duration-700">
            <div className="scale-125 brightness-0 invert">{MERISTEM_LOGO_SVG}</div>
            <div className="space-y-4">
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic opacity-90">Meritrade</h1>
              <div className="h-0.5 w-24 bg-[#8BB82D] mx-auto rounded-full" />
              <p className="text-xs text-emerald-200 font-black uppercase tracking-[0.8em]">Secure Access Vault</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-in fade-in zoom-in duration-700">
            <div className="w-full max-w-md bg-white p-14 rounded-[4rem] shadow-2xl relative border border-white/20">
              <div className="mb-12">
                 <h2 className="text-4xl font-black text-gray-900 tracking-tight">Login</h2>
                 <p className="text-sm text-gray-400 font-medium mt-2 uppercase tracking-widest">Institutional Terminal</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1 mb-2">Identifier</label>
                    <input 
                      type="text"
                      required
                      className="w-full bg-gray-50 border border-transparent group-focus-within:border-[#1E4D3B] group-focus-within:bg-white transition-all rounded-2xl px-6 py-5 outline-none font-bold text-gray-900"
                      placeholder="Email or Trading ID"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1 mb-2">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full bg-gray-50 border border-transparent group-focus-within:border-[#1E4D3B] group-focus-within:bg-white transition-all rounded-2xl px-6 py-5 outline-none font-bold text-gray-900"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-6 bg-[#1E4D3B] text-white font-black rounded-3xl text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-[#2D6B53] hover:-translate-y-1 transition-all active:scale-95">Enter Terminal</button>
                <div className="pt-10 border-t border-gray-50 text-center">
                  <button type="button" onClick={handleExitToWebsite} className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] hover:text-[#1E4D3B] transition-colors">← Exit to Website</button>
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
      case 'dashboard':
        return <Dashboard userStatus={userStatus} onNavigateToKYC={() => setActivePage('settings')} />;
      case 'market':
        return <MarketOverview onTradeClick={(symbol) => { setSelectedTradeSymbol(symbol); setActivePage('trade'); }} />;
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
        return renderSettings();
      default:
        return <Dashboard userStatus={userStatus} onNavigateToKYC={() => setActivePage('settings')} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} userStatus={userStatus} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
