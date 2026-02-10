
import React from 'react';

export const COLORS = {
  meristemGreen: '#1E4D3B', // Deep forest green from Meristem logo
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
    {/* Meristem Leaf Accent above the 'I' */}
    <g transform="translate(105, 5)">
      <path d="M2 12C2 12 0 4 6 0" stroke="#8BB82D" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M0 14C0 14 2 4 -4 0" stroke="#1E4D3B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M1 13C1 13 4 8 3 3" stroke="#1E4D3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </g>
    
    {/* Logo Text in a professional serif font */}
    <text 
      x="0" 
      y="40" 
      fill="#1E4D3B" 
      style={{ 
        fontFamily: 'Georgia, "Times New Roman", Times, serif', 
        fontSize: '32px', 
        fontWeight: '500', 
        letterSpacing: '0.05em' 
      }}
    >
      MERISTEM
    </text>
  </svg>
);
