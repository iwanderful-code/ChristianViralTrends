export interface UserSession {
  email: string | null;
  username: string | null;
  tier: "free" | "pro" | "enterprise";
  isAdmin: boolean;
  dailyGenerationsCount: number;
  lastGenerationDate: string;
}

export type TrendCategory = 
  | "social" 
  | "creators" 
  | "products" 
  | "events" 
  | "issues" 
  | "politics" 
  | "denominations" 
  | "churches" 
  | "pastors";

export interface TrendItem {
  id: string;
  category: TrendCategory;
  title: string;
  momentum: string;
  volume: string;
  sentiment: number; // e.g. 84 for 84% positive
  description: string;
  growthRate: "spiking" | "steady" | "slowing";
  history: number[]; // 7 days of volumes
}

export type PlatformType = "tiktok" | "instagram" | "youtube" | "facebook" | "x";

export interface PlatformTop10Item {
  rank: number;
  handle: string;
  name: string;
  score: string;
  growth: string;
  platform: PlatformType;
  contentPreview: string;
}

export interface ViralIdea {
  id: string;
  title: string;
  hook: string;
  probability: number; // e.g., 94
  outlierFactor: string;
  viewerPayoff: string;
  niche: string;
  platform: string;
  scriptOutline: string[];
}

export interface SavedIdea {
  id: string;
  idea: ViralIdea;
  savedAt: string;
}

export interface WatchlistItem {
  id: string;
  trendId: string;
  category: TrendCategory;
  title: string;
  momentum: string;
}

export interface CampaignInput {
  niche: string;
  audience: string;
  tone: string;
  hashtag: string;
  category: string;
}

export interface CampaignPrediction {
  reachIndex: number;
  sentimentForecast: number;
  optimalPostingTime: string;
  viralProbability: number;
  suggestions: string[];
}
