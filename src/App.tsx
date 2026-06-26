import React, { useState } from 'react';
import AppLayout from './components/AppLayout';

// Import our components
import SwipeVerify from './components/SwipeVerify';
import RewardsDashboard from './components/RewardsDashboard';
import ReportIssue from './components/ReportIssue';
import ValidationFeed from './components/ValidationFeed';
import AdminLayout from './components/AdminLayout';
import ImpactMap from './components/ImpactMap';
import HeroSection from './components/HeroSection';
import CivicGuardianProfile from './components/CivicGuardianProfile';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('showcase');

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'showcase' && <HeroSection key="showcase" setActiveTab={setActiveTab} />}
      {activeTab === 'report' && <ReportIssue key="report" />}
      {activeTab === 'verify' && <SwipeVerify key="verify" />}
      {activeTab === 'dashboard' && <AdminLayout key="dashboard" />}
      {activeTab === 'map' && <ImpactMap key="map" />}
      {activeTab === 'validation' && <ValidationFeed key="validation" />}
      {activeTab === 'rewards' && <RewardsDashboard key="rewards" />}
      {activeTab === 'profile' && <CivicGuardianProfile key="profile" />}
    </AppLayout>
  );
}
