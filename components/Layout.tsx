
import React, { useState, useRef, useEffect } from 'react';
import { OnboardingStatus } from '../types';
import { COLORS, MERISTEM_LOGO_SVG } from '../constants';
import SupportChat from './SupportChat';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
  userStatus: OnboardingStatus;
  onLogout: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, userStatus, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Order Filled', message: 'Your buy order for 5,000 units of GTCO was executed successfully.', time: '2m ago', type: 'success', read: false },
    { id: '2', title: 'Market Alert', message: 'DANGCEM has crossed the ₦700 resistance level.', time: '15m ago', type: 'info', read: false },
    { id: '3', title: 'KYC Notice', message: 'Your identity document verification is complete.', time: '1h ago', type: 'success', read: true },
    { id: '4', title: 'Login Detected', message: 'New sign-in from a Mac device in Lagos, Nigeria.', time: '3h ago', type: 'warning', read: true },
  ]);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', restricted: false },
    { id: 'market', label: 'Market Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', restricted: false },
    { id: 'exchange-feed', label: 'Exchange Feed', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', restricted: false },
    { id: 'trade', label: 'Trade (NGX)', icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4', restricted: true },
    { id: 'orders', label: 'My Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', restricted: true },
    { id: 'portfolio', label: 'My Portfolio', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z', restricted: true },
    { id: 'statements', label: 'Statements', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', restricted: true },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', restricted: false },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (id: string, restricted: boolean) => {
    if (restricted && userStatus !== OnboardingStatus.APPROVED) {
      alert("Access Restricted: Please complete your KYC onboarding to access trading and portfolio features.");
      return;
    }
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
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
        <div className="p-4 border-t border-gray-100 space-y-2">
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
             <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#1E4D3B] flex items-center justify-center text-white font-bold text-xs">
                    ND
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">Nifemi D***</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">{userStatus.replace('_', ' ')}</p>
                </div>
             </div>
             <button 
                onClick={onLogout}
                className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all group relative"
                title="Secure Logout"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
             </button>
           </div>
           <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest">© 2024 Meristem Nigeria</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 z-10 relative">
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
                 <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 animate-pulse">
                    Onboarding Incomplete
                 </span>
               )}
               <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`p-2 rounded-full transition-all relative ${isNotificationsOpen ? 'bg-gray-100 text-[#1E4D3B]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0">
                            <h3 className="text-sm font-bold text-gray-900">Intelligence Center</h3>
                            <button 
                                onClick={markAllRead}
                                className="text-[10px] text-[#1E4D3B] font-bold uppercase tracking-widest hover:underline"
                            >
                                Mark all as read
                            </button>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {notifications.map((n) => (
                                        <div key={n.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${!n.read ? 'bg-emerald-50/30' : ''}`}>
                                            {!n.read && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#1E4D3B] rounded-full"></div>}
                                            <div className="flex gap-3">
                                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                                                    n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                                                    n.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                                                            n.type === 'success' ? "M5 13l4 4L19 7" : 
                                                            n.type === 'warning' ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        } />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <p className="text-xs font-bold text-gray-900 truncate">{n.title}</p>
                                                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">{n.time}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 leading-snug">{n.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium">All caught up</p>
                                </div>
                            )}
                        </div>
                        <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                            <button className="text-[10px] font-bold text-[#1E4D3B] uppercase tracking-widest hover:underline">
                                View all notifications
                            </button>
                        </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        
        {/* Fixed Chat Plugin Container */}
        <SupportChat />
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
            <div className="p-4 border-t border-gray-100">
                <button 
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-3 text-base font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;
