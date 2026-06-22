# Christian Viral Trends - Dashboard App

An interactive, high-fidelity React 19 + TypeScript + Tailwind v4 culture and trend analytics dashboard for Christian creators, ministries, and church leaders.

## 🎨 Core Design System
- **Obsidian Glassmorphism:** Deep dark background sheets (`#050505` to `#0c0c14`) with thin border lines (`rgba(255,255,255,0.05)`) and smooth glow filters.
- **Accents:**
  - **Glowing Violet (`#8b5cf6`):** Primary branding, active navigation highlights, and reach volume line charts.
  - **Crimson Red (`#ff3366`):** Alert banners, active viral momentum spikes, and payment CTAs.
  - **Golden Gold (`#d97706`):** Admin badge framing, ranking medals (#1 spot), and premium locked status indicators.

---

## ⚡ Main Features

1. **Analytics Cockpit (Real-time charts):**
   - Interactive Recharts volume index tracking weekly engagement trajectories.
   - Gated categories: Social & Creators (Free), Products, Events & Issues (Pro), and Politics, Churches, Pastors, Denominations (Enterprise).
   - **Top 10 Channels Leaderboard:** Displays TikTok, Instagram, YouTube, Facebook, and X top creators. Free observers experience a **90-second countdown preview** before the table is glass-blurred.

2. **Viral Content Idea Generator (ViroScope Style):**
   - Synthesizes video ideas based on selected faith niches (e.g. Apologetics, Worship, Streetwear).
   - Dynamic animated progress sweep detailing micro-steps ("Scanning feeds...", "Validating theology...").
   - Displays circular SVG gauges representing viral probability, Outlier Differentiators, Viewer Payoffs, and copyable script beats.
   - **Saved History library** persists bookmarks in local storage.

3. **Campaign Simulator:**
   - Evaluates reach and sentiment indexing based on custom niches, target demographics, hashtags, and tone settings.
   - Gated as a Pro Minister module.

4. **Simulated Payment checkout:**
   - Integrated credit card details checkout overlay with spinning authorization loops and success animations.

5. **Admin Access Bypass:**
   - Logging in or signing up with the email **`iwanderful@gmail.com`** automatically bypasses all gates, assigns `Kingdom Admin` status (Enterprise level), and renders a gold security badge.

---

## 🚀 How to Run Locally

To spin up the application dev server, follow these commands using node:

```bash
# 1. Change directory to the sub-project
cd christian-trends

# 2. Start the local Vite development server
npm run dev
```

The server will initialize on: **`http://localhost:5173/`**
