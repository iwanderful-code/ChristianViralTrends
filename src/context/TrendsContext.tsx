import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { UserSession, WatchlistItem, SavedIdea, TrendItem, CampaignInput, CampaignPrediction, ViralIdea } from "../types";
import { GoogleGenAI } from "@google/genai";
import { MOCK_TRENDS, MOCK_VIRAL_IDEAS } from "../utils/mockData";

interface TrendsContextProps {
  activeTab: "landing" | "auth" | "dashboard";
  dashboardView: "cockpit" | "generator" | "simulator";
  user: UserSession | null;
  watchlist: WatchlistItem[];
  savedIdeas: SavedIdea[];
  remainingPreviewTime: number;
  previewTimerActive: boolean;
  isCheckoutOpen: boolean;
  checkoutSelectedTier: "pro" | "enterprise";
  checkoutStatus: "idle" | "authorizing" | "success";
  dailyLimitTotal: number;
  dailyLimitRemaining: number;
  
  // Gemini API states
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  
  // Dynamic Trends
  liveTrends: any[];
  syncLiveTrends: () => Promise<void>;
  
  setActiveTab: (tab: "landing" | "auth" | "dashboard") => void;
  setDashboardView: (view: "cockpit" | "generator" | "simulator") => void;
  login: (email: string, password?: string, forceTier?: "free" | "pro" | "enterprise") => boolean;
  socialLogin: (platform: string) => void;
  logout: () => void;
  signUp: (email: string, username: string, password?: string, tier?: "free" | "pro" | "enterprise") => boolean;
  openCheckout: (tier: "pro" | "enterprise") => void;
  closeCheckout: () => void;
  processPayment: () => Promise<void>;
  completePaypalPayment: (details: any) => Promise<void>;
  toggleWatchlist: (trend: TrendItem) => void;
  incrementGenerationCount: () => boolean;
  saveIdea: (idea: ViralIdea) => void;
  removeSavedIdea: (id: string) => void;
  runCampaignSimulation: (input: CampaignInput) => Promise<CampaignPrediction>;
  generateViralIdeas: (niche: string, prompt: string) => Promise<ViralIdea[]>;
  startPreviewTimer: () => void;
  pausePreviewTimer: () => void;
  resetPreviewTimer: () => void;
}

const TrendsContext = createContext<TrendsContextProps | undefined>(undefined);

export const TrendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<"landing" | "auth" | "dashboard">("landing");
  const [dashboardView, setDashboardView] = useState<"cockpit" | "generator" | "simulator">("cockpit");
  
  // Auth state
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem("trends_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Local storage database of registered users
  const [users, setUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem("trends_users");
    return saved ? JSON.parse(saved) : [];
  });

  // Gemini API Key state
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    const saved = localStorage.getItem("gemini_api_key");
    return saved || (import.meta.env.VITE_GEMINI_API_KEY || "");
  });

  // Settings Drawer state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Dynamic Live Trends state
  const [liveTrends, setLiveTrends] = useState<any[]>(() => {
    const saved = localStorage.getItem("trends_live_data");
    return saved ? JSON.parse(saved) : MOCK_TRENDS;
  });

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem("gemini_api_key", key);
  };

  // Watchlist state
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem("trends_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Saved Ideas state
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>(() => {
    const saved = localStorage.getItem("trends_saved_ideas");
    return saved ? JSON.parse(saved) : [];
  });

  // Preview Timer state
  const [remainingPreviewTime, setRemainingPreviewTime] = useState<number>(() => {
    const saved = localStorage.getItem("trends_preview_time");
    return saved ? parseInt(saved) : 90;
  });
  const [previewTimerActive, setPreviewTimerActive] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutSelectedTier, setCheckoutSelectedTier] = useState<"pro" | "enterprise">("pro");
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "authorizing" | "success">("idle");

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("trends_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("trends_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("trends_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("trends_live_data", JSON.stringify(liveTrends));
  }, [liveTrends]);

  useEffect(() => {
    localStorage.setItem("trends_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("trends_saved_ideas", JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  useEffect(() => {
    localStorage.setItem("trends_preview_time", remainingPreviewTime.toString());
  }, [remainingPreviewTime]);

  // Preview countdown timer
  useEffect(() => {
    if (previewTimerActive && remainingPreviewTime > 0) {
      timerIntervalRef.current = setInterval(() => {
        setRemainingPreviewTime((prev) => {
          if (prev <= 1) {
            setPreviewTimerActive(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [previewTimerActive, remainingPreviewTime]);

  const startPreviewTimer = () => {
    if (user?.tier === "free" || !user) {
      setPreviewTimerActive(true);
    }
  };

  const pausePreviewTimer = () => {
    setPreviewTimerActive(false);
  };

  const resetPreviewTimer = () => {
    setRemainingPreviewTime(90);
    setPreviewTimerActive(false);
  };

  // Auth operations
  const login = (email: string, password?: string, forceTier?: "free" | "pro" | "enterprise"): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === "iwanderful@gmail.com";
    
    if (isAdmin) {
      const session: UserSession = {
        email: cleanEmail,
        username: "Kingdom Admin",
        tier: "enterprise",
        isAdmin: true,
        dailyGenerationsCount: 0,
        lastGenerationDate: new Date().toDateString()
      };
      setUser(session);
      setActiveTab("dashboard");
      setDashboardView("cockpit");
      return true;
    }

    // Check registered users
    const userRecord = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!userRecord) {
      if (forceTier) {
        const session: UserSession = {
          email: cleanEmail,
          username: cleanEmail.split("@")[0],
          tier: forceTier,
          isAdmin: false,
          dailyGenerationsCount: 0,
          lastGenerationDate: new Date().toDateString()
        };
        setUser(session);
        setActiveTab("dashboard");
        setDashboardView("cockpit");
        return true;
      }
      throw new Error("No account found with this email. Please sign up first.");
    }

    if (password && userRecord.password && userRecord.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    const session: UserSession = {
      email: userRecord.email,
      username: userRecord.username,
      tier: forceTier || userRecord.tier,
      isAdmin: false,
      dailyGenerationsCount: 0,
      lastGenerationDate: new Date().toDateString()
    };
    setUser(session);
    setActiveTab("dashboard");
    setDashboardView("cockpit");
    return true;
  };

  const socialLogin = (platform: string) => {
    const randomUser = `FaithShare_${platform}`;
    const socialEmail = `${randomUser.toLowerCase()}@faith.net`;
    const rawTier = localStorage.getItem("selected_signup_tier");
    const isSpecificPaidTier = rawTier === "pro" || rawTier === "enterprise";
    
    if (isSpecificPaidTier) {
      const selectedTier = rawTier as "pro" | "enterprise";
      // Cache for checkout
      setCheckoutSelectedTier(selectedTier);
      localStorage.setItem("temp_signup_data", JSON.stringify({ 
        email: socialEmail, 
        username: randomUser, 
        password: "", 
        tier: selectedTier 
      }));
      setIsCheckoutOpen(true);
    } else {
      // No specific paid tier was pre-selected; default to "free" natively (Free Observer)
      const existing = users.find(u => u.email.toLowerCase() === socialEmail);
      if (!existing) {
        const newUser = {
          email: socialEmail,
          username: randomUser,
          password: "",
          tier: "free",
          isAdmin: false
        };
        setUsers(prev => [...prev, newUser]);
      }
      
      const targetTier = existing ? existing.tier : "free";
      
      login(socialEmail, "", targetTier);
      localStorage.removeItem("selected_signup_tier");
    }
  };

  const logout = () => {
    setUser(null);
    setActiveTab("landing");
    resetPreviewTimer();
  };

  const signUp = (email: string, username: string, password?: string, tier: "free" | "pro" | "enterprise" = "free"): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === "iwanderful@gmail.com";
    if (isAdmin) {
      login(email, password, "enterprise");
      return true;
    }

    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error("This email is already registered.");
    }

    if (tier === "free") {
      const newUser = {
        email: cleanEmail,
        username,
        password: password || "",
        tier: "free",
        isAdmin: false
      };
      setUsers(prev => [...prev, newUser]);
      login(email, password, "free");
      return true;
    } else {
      setCheckoutSelectedTier(tier as "pro" | "enterprise");
      localStorage.setItem("temp_signup_data", JSON.stringify({ 
        email: cleanEmail, 
        username, 
        password: password || "", 
        tier 
      }));
      setIsCheckoutOpen(true);
      return false;
    }
  };

  const openCheckout = (tier: "pro" | "enterprise") => {
    setCheckoutSelectedTier(tier);
    setCheckoutStatus("idle");
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStatus("idle");
  };

  const processPayment = async () => {
    setCheckoutStatus("authorizing");
    await new Promise((resolve) => setTimeout(resolve, 2200));
    setCheckoutStatus("success");
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const temp = localStorage.getItem("temp_signup_data");
    if (temp) {
      const { email, username, password } = JSON.parse(temp);
      const newUser = {
        email: email.trim().toLowerCase(),
        username,
        password: password || "",
        tier: checkoutSelectedTier,
        isAdmin: false
      };
      setUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== email.trim().toLowerCase());
        return [...filtered, newUser];
      });
      login(email, password, checkoutSelectedTier);
      localStorage.removeItem("temp_signup_data");
    } else if (user) {
      // Upgrading existing user
      const updatedUsers = users.map(u => {
        if (u.email.toLowerCase() === user.email?.toLowerCase()) {
          return { ...u, tier: checkoutSelectedTier };
        }
        return u;
      });
      setUsers(updatedUsers);
      setUser({
        ...user,
        tier: checkoutSelectedTier
      });
    } else {
      // Guest upgrading
      const guestEmail = "guest_believer@faith.net";
      const newUser = {
        email: guestEmail,
        username: "Kingdom Guest",
        password: "",
        tier: checkoutSelectedTier,
        isAdmin: false
      };
      setUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== guestEmail);
        return [...filtered, newUser];
      });
      login(guestEmail, "", checkoutSelectedTier);
    }
    
    resetPreviewTimer();
    setIsCheckoutOpen(false);
    setCheckoutStatus("idle");
  };

  const completePaypalPayment = async (details: any) => {
    console.log("PayPal payment completed:", details);
    setCheckoutStatus("success");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const temp = localStorage.getItem("temp_signup_data");
    if (temp) {
      const { email, username, password } = JSON.parse(temp);
      const newUser = {
        email: email.trim().toLowerCase(),
        username,
        password: password || "",
        tier: checkoutSelectedTier,
        isAdmin: false
      };
      setUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== email.trim().toLowerCase());
        return [...filtered, newUser];
      });
      login(email, password, checkoutSelectedTier);
      localStorage.removeItem("temp_signup_data");
    } else if (user) {
      // Upgrading existing user
      const updatedUsers = users.map(u => {
        if (u.email.toLowerCase() === user.email?.toLowerCase()) {
          return { ...u, tier: checkoutSelectedTier };
        }
        return u;
      });
      setUsers(updatedUsers);
      setUser({
        ...user,
        tier: checkoutSelectedTier
      });
    } else {
      // Guest upgrading
      const guestEmail = "guest_believer@faith.net";
      const newUser = {
        email: guestEmail,
        username: "Kingdom Guest",
        password: "",
        tier: checkoutSelectedTier,
        isAdmin: false
      };
      setUsers(prev => {
        const filtered = prev.filter(u => u.email.toLowerCase() !== guestEmail);
        return [...filtered, newUser];
      });
      login(guestEmail, "", checkoutSelectedTier);
    }
    
    resetPreviewTimer();
    setIsCheckoutOpen(false);
    setCheckoutStatus("idle");
  };

  // Watchlist operations
  const toggleWatchlist = (trend: TrendItem) => {
    setWatchlist((prev) => {
      const exists = prev.find((item) => item.trendId === trend.id);
      if (exists) {
        return prev.filter((item) => item.trendId !== trend.id);
      } else {
        return [...prev, {
          id: `${trend.id}_watch`,
          trendId: trend.id,
          category: trend.category,
          title: trend.title,
          momentum: trend.momentum
        }];
      }
    });
  };

  // Generation Limits Gating
  const getDailyLimitTotal = (tier: "free" | "pro" | "enterprise" | undefined) => {
    if (tier === "enterprise") return 25;
    if (tier === "pro") return 10;
    return 3; // free
  };

  const dailyLimitTotal = user ? (user.isAdmin ? 9999 : getDailyLimitTotal(user.tier)) : 3;

  // Handle date reset
  useEffect(() => {
    if (user) {
      const today = new Date().toDateString();
      if (user.lastGenerationDate !== today) {
        setUser({
          ...user,
          dailyGenerationsCount: 0,
          lastGenerationDate: today
        });
      }
    }
  }, [user]);

  const dailyLimitRemaining = user && user.isAdmin 
    ? 9999 
    : Math.max(0, dailyLimitTotal - (user?.dailyGenerationsCount || 0));

  const incrementGenerationCount = (): boolean => {
    if (user?.isAdmin) return true;
    const currentCount = user?.dailyGenerationsCount || 0;
    if (currentCount >= dailyLimitTotal) {
      return false; // Gated!
    }
    
    if (user) {
      setUser({
        ...user,
        dailyGenerationsCount: currentCount + 1
      });
    } else {
      // Handle guest session local storage storage
      const guestCount = parseInt(localStorage.getItem("guest_generations") || "0");
      if (guestCount >= 3) return false;
      localStorage.setItem("guest_generations", (guestCount + 1).toString());
    }
    return true;
  };

  // Saved Ideas
  const saveIdea = (idea: ViralIdea) => {
    setSavedIdeas((prev) => {
      if (prev.find((item) => item.id === idea.id)) return prev;
      return [{
        id: `${idea.id}_saved`,
        idea,
        savedAt: new Date().toLocaleDateString()
      }, ...prev];
    });
  };

  const removeSavedIdea = (id: string) => {
    setSavedIdeas((prev) => prev.filter((item) => item.id !== id));
  };

  // Campaign Simulation
  const runCampaignSimulation = async (input: CampaignInput): Promise<CampaignPrediction> => {
    if (!geminiApiKey) {
      console.log("No Gemini API Key. Using mock simulation...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return getMockSimulation(input);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const systemInstruction = `
You are the "Christian Campaign Vector Simulator". You analyze metadata curves, faith niches, demographics, tone, and hashtags to predict engagement scores.
Return a valid JSON object. Do NOT wrap output in markdown (no \`\`\`json).
`;
      const userPrompt = `
Simulate a campaign performance forecast.
Inputs:
- Niche: ${input.niche}
- Audience: ${input.audience}
- Tone: ${input.tone}
- Hashtag: ${input.hashtag}

Predict:
1. reachIndex: Integer (30-100) representing view potential.
2. sentimentForecast: Integer (50-100) representing positive sentiment.
3. optimalPostingTime: String (e.g. "06:30 PM").
4. viralProbability: Integer (30-100) representing viral probability.
5. suggestions: Array of exactly 3 tactical adjustments (1 sentence each).
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              reachIndex: { type: "INTEGER" },
              sentimentForecast: { type: "INTEGER" },
              optimalPostingTime: { type: "STRING" },
              viralProbability: { type: "INTEGER" },
              suggestions: {
                type: "ARRAY",
                items: { type: "STRING" }
              }
            },
            required: ["reachIndex", "sentimentForecast", "optimalPostingTime", "viralProbability", "suggestions"]
          }
        }
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Gemini campaign simulation failed, falling back to mock:", err);
      return getMockSimulation(input);
    }
  };

  // Viral Content Generation using Gemini
  const generateViralIdeas = async (niche: string, prompt: string): Promise<ViralIdea[]> => {
    if (!geminiApiKey) {
      console.log("No Gemini API Key. Using mock generation...");
      return getMockViralIdeas(niche, prompt);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const systemInstruction = `
You are the "Christian Viral Trends AI generator". You generate high-fidelity, theology-sound, highly engaging viral video ideas and script beats for Christian creators.
Return a valid JSON array of exactly 3 objects. Do NOT wrap output in markdown (no \`\`\`json).
`;
      const userPrompt = `
Generate 3 viral video idea concepts.
Niche: ${niche}
Focus Guideline: ${prompt || "None specified. Generate general engaging concepts."}

For each idea, return:
1. title: Catchy video title.
2. hook: First 3-second hook sentence.
3. probability: Integer (75-99) of viral potential.
4. outlierFactor: 1-sentence explanation of why it stands out.
5. viewerPayoff: 1-sentence payoff to viewer.
6. scriptOutline: Array of exactly 4 sequential script beats.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                hook: { type: "STRING" },
                probability: { type: "INTEGER" },
                outlierFactor: { type: "STRING" },
                viewerPayoff: { type: "STRING" },
                scriptOutline: {
                  type: "ARRAY",
                  items: { type: "STRING" }
                }
              },
              required: ["title", "hook", "probability", "outlierFactor", "viewerPayoff", "scriptOutline"]
            }
          }
        }
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        return parsed.map((item, idx) => ({
          id: `gen_idea_${niche.replace(/\s+/g, '_')}_${idx}_${Date.now()}`,
          niche,
          platform: ["TikTok", "Instagram Reels", "YouTube Shorts"][idx % 3],
          ...item
        }));
      }
      throw new Error("Invalid output array format");
    } catch (err) {
      console.error("Gemini API call failed, falling back to mock:", err);
      return getMockViralIdeas(niche, prompt);
    }
  };

  // Sync Live Trends using Gemini Grounding Search
  const syncLiveTrends = async (): Promise<void> => {
    if (!geminiApiKey) {
      console.log("No Gemini API Key for sync. Keeping mock trends...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      const prompt = `
Generate a list of 10 trending Christian topics, keywords, or music movements based on current real-world internet data (mid 2026).
For each trend, return:
1. trend_title (e.g. #WorshipLofi, Latin Mass Resurgence)
2. description (a 2-sentence summary of why it's trending and what it is)
3. engagement_velocity (High, Medium, or Low)
4. category (e.g., Music, Culture, Youth, Theology)
5. source_reference (e.g., YouTube, TikTok, Pew Research)

Format your output EXACTLY as a JSON array of objects with these keys: 'trend_title', 'description', 'engagement_velocity', 'category', 'source_reference'.
Ensure the JSON is strictly valid, and return nothing else (no markdown wrappers like \`\`\`json).
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const mappedTrends = parsed.map((item, idx) => {
          let category: any = "social";
          const cat = item.category.toLowerCase();
          if (cat.includes("music") || cat.includes("creator")) category = "creators";
          else if (cat.includes("product")) category = "products";
          else if (cat.includes("event")) category = "events";
          else if (cat.includes("issue")) category = "issues";
          else if (cat.includes("politic")) category = "politics";
          else if (cat.includes("denom")) category = "denominations";
          else if (cat.includes("church")) category = "churches";
          else if (cat.includes("pastor")) category = "pastors";

          const volumeVal = item.engagement_velocity === "High" ? "1.2M" : item.engagement_velocity === "Medium" ? "450K" : "80K";
          const sentimentScore = item.engagement_velocity === "High" ? 88 : item.engagement_velocity === "Medium" ? 79 : 68;

          return {
            id: `live_trend_${idx}_${Date.now()}`,
            category,
            title: item.trend_title,
            momentum: item.engagement_velocity === "High" ? "+142%" : item.engagement_velocity === "Medium" ? "+45%" : "+8%",
            volume: volumeVal,
            sentiment: sentimentScore,
            description: item.description,
            growthRate: item.engagement_velocity === "High" ? "spiking" : item.engagement_velocity === "Medium" ? "steady" : "slowing",
            history: Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + (item.engagement_velocity === "High" ? 60 : 30))
          };
        });

        setLiveTrends(mappedTrends);
      }
    } catch (err) {
      console.error("Failed to sync live trends:", err);
    }
  };

  return (
    <TrendsContext.Provider
      value={{
        activeTab,
        dashboardView,
        user,
        watchlist,
        savedIdeas,
        remainingPreviewTime,
        previewTimerActive,
        isCheckoutOpen,
        checkoutSelectedTier,
        checkoutStatus,
        dailyLimitTotal,
        dailyLimitRemaining: user ? dailyLimitRemaining : Math.max(0, 3 - parseInt(localStorage.getItem("guest_generations") || "0")),
        
        geminiApiKey,
        setGeminiApiKey,
        isSettingsOpen,
        setIsSettingsOpen,
        liveTrends,
        syncLiveTrends,
        
        setActiveTab,
        setDashboardView,
        login,
        socialLogin,
        logout,
        signUp,
        openCheckout,
        closeCheckout,
        processPayment,
        completePaypalPayment,
        toggleWatchlist,
        incrementGenerationCount,
        saveIdea,
        removeSavedIdea,
        runCampaignSimulation,
        generateViralIdeas,
        startPreviewTimer,
        pausePreviewTimer,
        resetPreviewTimer
      }}
    >
      {children}
    </TrendsContext.Provider>
  );
};

// Fallback Mock Helpers
const getMockViralIdeas = (niche: string, customPrompt: string): ViralIdea[] => {
  const baseIdeas = MOCK_VIRAL_IDEAS[niche] || [];
  const finalIdeas: ViralIdea[] = [...baseIdeas];
  const platforms = ["TikTok", "Instagram Reels", "YouTube Shorts"];
  
  const keywords = ["faith walk", "scripture study", "devotion habits", "encouraging truth"];
  const topics = [
    `Why most people read ${keywords[0]} wrong (and how to fix it)`,
    `My exact 3-step routine for ${keywords[1]}`,
    `How ${keywords[2]} completely changed my perspective`,
    `The historical secret behind ${keywords[3]}`,
    `5 tools I use daily for ${keywords[0]}`
  ];
  
  const hooks = [
    "This one verse completely changed how I look at my daily struggle...",
    "I was reading church history and found this hidden gem...",
    "Stop scrolling if you need some real, raw truth today..."
  ];
  const outliers = [
    "Exposes modern theological myths using raw, uncensored history books.",
    "Provides a direct, printable template instead of just talking about scripture."
  ];
  const payoffs = [
    "A structured outline to study scripture without getting distracted.",
    "A clear visual blueprint of early church prayers."
  ];

  for (let i = finalIdeas.length; i < 3; i++) {
    const title = customPrompt 
      ? `${customPrompt} - ${topics[i % topics.length]}`
      : topics[i % topics.length];
      
    finalIdeas.push({
      id: `gen_idea_${niche.replace(/\s+/g, '_')}_${i}_${Date.now()}`,
      niche,
      platform: platforms[i % platforms.length],
      title,
      hook: hooks[i % hooks.length],
      probability: Math.min(99, Math.max(75, 95 - (i * 2))),
      outlierFactor: outliers[i % outliers.length],
      viewerPayoff: payoffs[i % payoffs.length],
      scriptOutline: [
        `Hook: ${hooks[i % hooks.length].substring(0, 40)}...`,
        `State the core challenge with ${niche}.`,
        `Provide the specific resolution step.`,
        `Call to action: Save this and comment your thoughts.`
      ]
    });
  }
  return finalIdeas.slice(0, 3);
};

const getMockSimulation = (input: CampaignInput): CampaignPrediction => {
  const isWorship = input.niche.toLowerCase().includes("worship") || input.category === "social";
  const isGlow = input.tone === "Inspirational/Uplifting";
  
  const reachIndex = Math.min(100, Math.max(30, Math.floor(Math.random() * 30) + (isWorship ? 65 : 45)));
  const sentimentForecast = Math.min(100, Math.max(50, Math.floor(Math.random() * 20) + (isGlow ? 75 : 60)));
  const viralProbability = Math.min(100, Math.floor((reachIndex + sentimentForecast) / 2) + (input.hashtag ? 5 : 0));
  
  const postingHours = ["08:00 AM", "12:30 PM", "06:00 PM", "08:30 PM"];
  const optimalPostingTime = postingHours[Math.floor(Math.random() * postingHours.length)];

  return {
    reachIndex,
    sentimentForecast,
    optimalPostingTime,
    viralProbability,
    suggestions: [
      `Use typography transitions instead of live speeches to retain Gen-Z view loops by 45%.`,
      `Incorporate ambient Christian lo-fi soundscapes to capture high video shares.`,
      `Pin a question asking for prayer requests: encourages rapid comment momentum.`
    ]
  };
};

export const useTrends = () => {
  const context = useContext(TrendsContext);
  if (!context) {
    throw new Error("useTrends must be used within a TrendsProvider");
  }
  return context;
};
