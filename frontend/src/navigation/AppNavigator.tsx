import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/theme';
import { Home, CloudSun, Bot, TrendingUp, Calendar, Settings } from 'lucide-react-native';

// Import Screens
import { SplashScreen } from '../screens/SplashScreen';
import { LanguageSelectScreen } from '../screens/LanguageSelectScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { WeatherScreen } from '../screens/WeatherScreen';
import { CropGuideScreen } from '../screens/CropGuideScreen';
import { AIFarmingAdvisorScreen } from '../screens/AIFarmingAdvisorScreen';
import { DiseaseDetectionScreen } from '../screens/DiseaseDetectionScreen';
import { MarketPricesScreen } from '../screens/MarketPricesScreen';
import { FertilizerRecommendScreen } from '../screens/FertilizerRecommendScreen';
import { PestRiskScreen } from '../screens/PestRiskScreen';
import { DailyPlannerScreen } from '../screens/DailyPlannerScreen';
import { VillageWisdomScreen } from '../screens/VillageWisdomScreen';
import { OfflineCardsScreen } from '../screens/OfflineCardsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigator for core daily features
function MainBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryEmerald,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: COLORS.borderLight,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="AI Advisor"
        component={AIFarmingAdvisorScreen}
        options={{
          tabBarLabel: 'AI Chat',
          tabBarIcon: ({ color, size }) => <Bot color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Mandi"
        component={MarketPricesScreen}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="PlannerTab"
        component={DailyPlannerScreen}
        options={{
          tabBarLabel: 'Planner',
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Master Native Stack Navigator
export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Auth & Onboarding Flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Main Tabs Container */}
      <Stack.Screen name="MainTabs" component={MainBottomTabs} />

      {/* Feature Screens */}
      <Stack.Screen name="Weather" component={WeatherScreen} />
      <Stack.Screen name="CropGuide" component={CropGuideScreen} />
      <Stack.Screen name="AIFarmingAdvisor" component={AIFarmingAdvisorScreen} />
      <Stack.Screen name="DiseaseDetection" component={DiseaseDetectionScreen} />
      <Stack.Screen name="MarketPrices" component={MarketPricesScreen} />
      <Stack.Screen name="FertilizerRecommend" component={FertilizerRecommendScreen} />
      <Stack.Screen name="PestRisk" component={PestRiskScreen} />
      <Stack.Screen name="DailyPlanner" component={DailyPlannerScreen} />
      <Stack.Screen name="VillageWisdom" component={VillageWisdomScreen} />
      <Stack.Screen name="OfflineCards" component={OfflineCardsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
