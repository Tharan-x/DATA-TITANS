import React, { useEffect, useState } from 'react';
import { WebPageId } from './types';
import { useLanguageStore } from './store/useLanguageStore';
import { useUserStore } from './store/useUserStore';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Import Web Pages
import { HeroLandingPage } from './pages/HeroLandingPage';
import { LanguageSelectPage } from './pages/LanguageSelectPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WeatherPage } from './pages/WeatherPage';
import { CropGuidePage } from './pages/CropGuidePage';
import { AIFarmingAdvisorPage } from './pages/AIFarmingAdvisorPage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { FertilizerRecommendPage } from './pages/FertilizerRecommendPage';
import { PestRiskPage } from './pages/PestRiskPage';
import { DailyPlannerPage } from './pages/DailyPlannerPage';
import { VillageWisdomPage } from './pages/VillageWisdomPage';
import { OfflineCardsPage } from './pages/OfflineCardsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const [activePage, setActivePage] = useState<WebPageId>('hero');
  const { loadLanguage } = useLanguageStore();
  const { loadSession } = useUserStore();

  useEffect(() => {
    loadLanguage();
    loadSession();
  }, []);

  // Web Router Switcher
  const renderActivePage = () => {
    switch (activePage) {
      case 'hero':
        return <HeroLandingPage setActivePage={setActivePage} />;
      case 'language':
        return <LanguageSelectPage setActivePage={setActivePage} />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'dashboard':
        return <DashboardPage setActivePage={setActivePage} />;
      case 'weather':
        return <WeatherPage />;
      case 'crop-guide':
        return <CropGuidePage />;
      case 'ai-advisor':
        return <AIFarmingAdvisorPage />;
      case 'disease-detection':
        return <DiseaseDetectionPage />;
      case 'market-prices':
        return <MarketPricesPage />;
      case 'fertilizer':
        return <FertilizerRecommendPage />;
      case 'pest-risk':
        return <PestRiskPage />;
      case 'planner':
        return <DailyPlannerPage />;
      case 'village-wisdom':
        return <VillageWisdomPage />;
      case 'offline-cards':
        return <OfflineCardsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F4]">
      {/* Web Navbar Header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Web Sidebar Navigation */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default App;
