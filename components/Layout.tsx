
import React, { useState } from 'react';
import { OnboardingStatus } from '../types';
import { COLORS, MERISTEM_LOGO_SVG } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
  userStatus: OnboardingStatus;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, userStatus }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', restricted: false },
    { id: 'market', label: 'Market Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', restricted: false },
    { id: 'exchange-feed', label: 'Exchange Feed', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', restricted: false },
    { id: 'trade', label: 'Trade (NGX)', icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4', restricted: true },
    { id: 'orders', label: 'My Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', restricted: true },
    { id: 'portfolio', label: 'My Portfolio', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z', restricted: true },
    { id: 'statements', label: 'Statements', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', restricted: true },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', restricted: false },
  ];

  const handleNavClick = (id: string, restricted: boolean) => {
    if (restricted && userStatus !== OnboardingStatus.APPROVED) {
      alert("Access Restricted: Please complete your KYC onboarding to access trading and portfolio features.");
      return;
    }
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          {MERISTEM_LOGO_SVG}
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4 scrollbar-thin scrollbar-thumb-gray-200 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.restricted)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activePage === item.id
                  ? 'bg-[#1E4D3B] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              } ${item.restricted && userStatus !== OnboardingStatus.APPROVED ? 'opacity-50' : ''}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.label}
              {item.restricted && userStatus !== OnboardingStatus.APPROVED && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
             <div className="w-8 h-8 rounded-full bg-[#1E4D3B] flex items-center justify-center text-white font-bold text-xs">
                JD
             </div>
             <div className="ml-3 overflow-hidden">
               <p className="text-sm font-medium text-gray-900 truncate">John D***</p>
               <p className="text-xs text-gray-500 uppercase">{userStatus.replace('_', ' ')}</p>
             </div>
           </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 capitalize">{activePage.replace('-', ' ')}</h1>
            <div className="flex items-center space-x-4">
               {userStatus !== OnboardingStatus.APPROVED && (
                 <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Onboarding Incomplete
                 </span>
               )}
               <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                 </svg>
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
               </button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <nav className="relative flex flex-col w-full max-w-xs h-full bg-white shadow-xl">
            <div className="p-6 flex items-center justify-between">
              {MERISTEM_LOGO_SVG}
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 px-4 space-y-1 overflow-y-auto">
               {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.restricted)}
                  className={`flex items-center w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-[#1E4D3B] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  } ${item.restricted && userStatus !== OnboardingStatus.APPROVED ? 'opacity-50' : ''}`}
                >
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;
