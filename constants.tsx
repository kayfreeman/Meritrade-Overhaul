
import React from 'react';

export const COLORS = {
  meristemGreen: '#1E4D3B', // Deep forest green
  meristemGreenLight: '#2D6B53',
  meristemAccent: '#8BB82D', // Leaf green accent
  positive: '#10B981',
  negative: '#EF4444',
  neutral: '#6B7280',
};

export const MOCK_STOCKS: any[] = [
  { symbol: 'DANGCEM', name: 'Dangote Cement PLC', price: 701.00, change: 5.40, changePercent: 0.78, volume: 1250000, high: 710, low: 695, open: 695.60, sector: 'Industrial' },
  { symbol: 'MTNN', name: 'MTN Nigeria Communications', price: 235.50, change: -2.10, changePercent: -0.88, volume: 4500000, high: 240, low: 232, open: 237.60, sector: 'Telecoms' },
  { symbol: 'ZENITHBANK', name: 'Zenith Bank PLC', price: 42.15, change: 0.25, changePercent: 0.60, volume: 12000000, high: 43.5, low: 41.8, open: 41.90, sector: 'Banking' },
  { symbol: 'GTCO', name: 'Guaranty Trust Holding Co', price: 51.20, change: 1.10, changePercent: 2.19, volume: 8900000, high: 52, low: 50.1, open: 50.10, sector: 'Banking' },
  { symbol: 'AIRTELAFRI', name: 'Airtel Africa PLC', price: 2270.00, change: 0, changePercent: 0, volume: 150000, high: 2270, low: 2270, open: 2270, sector: 'Telecoms' },
  { symbol: 'BUAFOODS', name: 'BUA Foods PLC', price: 385.00, change: -12.40, changePercent: -3.12, volume: 980000, high: 399, low: 380, open: 397.40, sector: 'Consumer Goods' },
  { symbol: 'ACCESSCORP', name: 'Access Holdings PLC', price: 21.85, change: 0.45, changePercent: 2.10, volume: 15400000, high: 22.1, low: 21.3, open: 21.40, sector: 'Banking' },
  { symbol: 'VETIVA30', name: 'Vetiva Griffin 30 ETF', price: 25.40, change: 0.12, changePercent: 0.47, volume: 50000, high: 25.80, low: 25.10, open: 25.15, sector: 'ETFs' },
  { symbol: 'LOTUSHAL15', name: 'Lotus Halal Equity ETF', price: 18.90, change: -0.05, changePercent: -0.26, volume: 30000, high: 19.10, low: 18.80, open: 19.00, sector: 'ETFs' },
];

export const APP_VERSION = '2.0.0-Beta';

export const MERISTEM_LOGO_SVG = (
  <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
    <g transform="translate(105, 5)">
      <path d="M2 12C2 12 0 4 6 0" stroke="#8BB82D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 14C0 14 2 4 -4 0" stroke="#1E4D3B" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <text x="0" y="40" fill="#1E4D3B" style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 'bold', letterSpacing: '0.02em' }}>MERISTEM</text>
  </svg>
);

export const MERITRADE_INTERFACE_MOCKUP = (
  <svg viewBox="0 0 1000 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto shadow-2xl rounded-[3rem] border border-white/20">
    <rect width="1000" height="700" rx="40" fill="#0A0F0D" />
    {/* Header bar */}
    <rect width="1000" height="60" rx="10" fill="#1E4D3B" fillOpacity="0.4" />
    <circle cx="30" cy="30" r="6" fill="#EF4444" />
    <circle cx="50" cy="30" r="6" fill="#FBBF24" />
    <circle cx="70" cy="30" r="6" fill="#10B981" />
    <text x="400" y="38" fill="white" fillOpacity="0.6" style={{ fontSize: '14px', fontStyle: 'italic', fontWeight: 'bold', letterSpacing: '0.1em' }}>MERITRADE NEXTGEN — INSTITUTIONAL FLOOR</text>
    
    {/* Market Depth Columns */}
    <rect x="20" y="80" width="300" height="600" rx="20" fill="#1E4D3B" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
    <text x="40" y="115" fill="white" style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '0.1em' }}>MARKET TAPE</text>
    {[...Array(12)].map((_, i) => (
      <g key={i} transform={`translate(40, ${140 + i * 45})`}>
        <rect width="260" height="35" rx="8" fill="white" fillOpacity="0.03" />
        <text x="10" y="22" fill="#8BB82D" style={{ fontSize: '12px', fontWeight: 'bold' }}>DANGCEM</text>
        <text x="120" y="22" fill="white" style={{ fontSize: '12px', fontWeight: '900', fontFamily: 'monospace' }}>₦701.{Math.floor(Math.random()*99)}</text>
        <path d="M220 18 L230 12 L240 18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </g>
    ))}

    {/* Main Visualization */}
    <rect x="340" y="80" width="640" height="400" rx="20" fill="#1E4D3B" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
    <path d="M360 380 Q 450 350, 500 200 T 700 300 T 950 100" stroke="#8BB82D" strokeWidth="6" strokeLinecap="round" fill="none" className="animate-pulse" />
    <path d="M360 380 Q 450 350, 500 200 T 700 300 T 950 100 L 950 480 L 360 480 Z" fill="url(#paint0_linear)" fillOpacity="0.1" />
    
    {/* Bottom Analytics */}
    <rect x="340" y="500" width="640" height="180" rx="20" fill="#1E4D3B" fillOpacity="0.1" stroke="white" strokeOpacity="0.1" />
    <text x="365" y="535" fill="white" style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '0.1em' }}>ORDER BOOK LIQUIDITY</text>
    {[...Array(5)].map((_, i) => (
      <rect key={i} x={365 + i * 120} y="560" width="100" height={Math.random()*80 + 20} rx="4" fill="#8BB82D" fillOpacity="0.4" />
    ))}

    <defs>
      <linearGradient id="paint0_linear" x1="655" y1="100" x2="655" y2="480" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8BB82D" />
        <stop offset="1" stopColor="#8BB82D" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
