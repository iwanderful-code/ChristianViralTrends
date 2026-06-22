import { TrendsProvider, useTrends } from "./context/TrendsContext";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import AuthInterface from "./components/AuthInterface";
import DashboardShell from "./components/DashboardShell";
import AnalyticsCockpit from "./components/AnalyticsCockpit";
import ViralGenerator from "./components/ViralGenerator";
import CampaignSimulator from "./components/CampaignSimulator";
import CheckoutModal from "./components/CheckoutModal";
import SettingsModal from "./components/SettingsModal";

function AppContent() {
  const { activeTab, dashboardView } = useTrends();

  const renderContent = () => {
    switch (activeTab) {
      case "landing":
        return <LandingPage />;
      case "auth":
        return <AuthInterface />;
      case "dashboard":
        return (
          <DashboardShell>
            {dashboardView === "cockpit" && <AnalyticsCockpit />}
            {dashboardView === "generator" && <ViralGenerator />}
            {dashboardView === "simulator" && <CampaignSimulator />}
          </DashboardShell>
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans flex flex-col justify-between selection:bg-violet-600/30 selection:text-white">
      <div className="w-full">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Viewport Container */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-black/60 text-center text-xs text-neutral-600 space-y-2">
        <p>© 2026 CHRISTIAN VIRAL TRENDS INC. ALL RIGHTS RESERVED.</p>
        <p className="max-w-md mx-auto opacity-70">
          Providing high-fidelity metric forecasts and script hooks for creators, churches, and ministries to communicate eternal truths.
        </p>
      </footer>

      {/* Checkout Modals */}
      <CheckoutModal />
      <SettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <TrendsProvider>
      <AppContent />
    </TrendsProvider>
  );
}
