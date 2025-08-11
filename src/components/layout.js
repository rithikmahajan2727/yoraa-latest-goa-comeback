import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BottomNavigationBar from './bottomnavigationbar';
import { Colors, FontSizes, FontWeights, Spacing } from '../constants';
import { HomeScreen, ShopScreen, CollectionScreen, RewardsScreen, ProfileScreen } from '../screens';

// Placeholder content components for each tab
const HomeContent = () => <HomeScreen />;
const ShopContent = () => <ShopScreen />;
const CollectionContent = () => <CollectionScreen />;
const RewardsContent = () => <RewardsScreen />;
const ProfileContent = () => <ProfileScreen />;

// Main Layout Component
const Layout = () => {
  const [activeTab, setActiveTab] = useState('Home');

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeContent />;
      case 'Shop':
        return <ShopContent />;
      case 'Collection':
        return <CollectionContent />;
      case 'Rewards':
        return <RewardsContent />;
      case 'Profile':
        return <ProfileContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>YORAA</Text>
        <Text style={styles.headerSubtitle}>Fashion Forward</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <BottomNavigationBar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </SafeAreaView>
  );
};

// Enhanced Layout with improved navigation handling
const EnhancedLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [headerTitle, setHeaderTitle] = useState('YORAA');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setHeaderTitle(tabName === 'Home' ? 'YORAA' : tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeContent />;
      case 'Shop':
        return <ShopContent />;
      case 'Collection':
        return <CollectionContent />;
      case 'Rewards':
        return <RewardsContent />;
      case 'Profile':
        return <ProfileContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Dynamic Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          {activeTab === 'Home' && (
            <Text style={styles.headerSubtitle}>Fashion Forward</Text>
          )}
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* Bottom Navigation - Outside SafeAreaView for full-width */}
      <BottomNavigationBar 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    fontWeight: FontWeights.medium,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
});

export default Layout;
export { EnhancedLayout };
