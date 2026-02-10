
export enum OnboardingStatus {
  UNREGISTERED = 'UNREGISTERED',
  REGISTERED = 'REGISTERED',
  KYC_SUBMITTED = 'KYC_SUBMITTED',
  KYC_IN_REVIEW = 'KYC_IN_REVIEW',
  APPROVED = 'APPROVED',
  RESTRICTED = 'RESTRICTED'
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP = 'STOP',
  STOP_LIMIT = 'STOP_LIMIT'
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
}

export interface PortfolioHolding {
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
}

export interface UserProfile {
  id: string; // UUID v4
  tradingAccountId: string;
  name: string; // Masked in UI
  email: string; // Masked in UI
  onboardingStatus: OnboardingStatus;
  cscsLinked: boolean;
}
