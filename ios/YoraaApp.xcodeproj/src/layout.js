import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import BottomNavigationBar from './bottomnavigationbar';

// Placeholder content components for each tab
const HomeContent = () => (
  <ScrollView style={styles.contentContainer}>
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Home</Text>
      <Text style={styles.pageDescription}>Welcome to YORAA</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Featured Items</Text>
        <Text style={styles.cardText}>Discover the latest fashion trends</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>New Arrivals</Text>
        <Text style={styles.cardText}>Fresh styles just for you</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Trending Now</Text>
        <Text style={styles.cardText}>What's popular this season</Text>
      </View>
    </View>
  </ScrollView>
);

const ShopContent = () => (
  <ScrollView style={styles.contentContainer}>
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Shop</Text>
      <Text style={styles.pageDescription}>Discover amazing products</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchPlaceholder}>Search for products...</Text>
        </View>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Featured Categories</Text>
        <Text style={styles.cardText}>• Clothing</Text>
        <Text style={styles.cardText}>• Accessories</Text>
        <Text style={styles.cardText}>• Footwear</Text>
        <Text style={styles.cardText}>• Beauty</Text>
      </View>
    </View>
  </ScrollView>
);

const CollectionContent = () => (
  <ScrollView style={styles.contentContainer}>
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Collection</Text>
      <Text style={styles.pageDescription}>Your curated items</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>My Collections</Text>
        <Text style={styles.cardText}>Create and organize your collections</Text>
      </View>
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No collections yet</Text>
        <Text style={styles.emptyStateSubtext}>
          Start creating collections to organize your favorite items
        </Text>
      </View>
    </View>
  </ScrollView>
);

const RewardsContent = () => (
  <ScrollView style={styles.contentContainer}>
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Rewards</Text>
      <Text style={styles.pageDescription}>Your loyalty points and benefits</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Your Points</Text>
        <Text style={styles.cardText}>0 Points Available</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Ways to Earn</Text>
        <Text style={styles.cardText}>• Make purchases</Text>
        <Text style={styles.cardText}>• Refer friends</Text>
        <Text style={styles.cardText}>• Complete challenges</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Redeem Rewards</Text>
        <Text style={styles.cardText}>Exchange points for exclusive benefits</Text>
      </View>
    </View>
  </ScrollView>
);

const ProfileContent = () => (
  <ScrollView style={styles.contentContainer}>
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Profile</Text>
      <Text style={styles.pageDescription}>Your account</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Account Settings</Text>
        <Text style={styles.cardText}>Manage your profile information</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Order History</Text>
        <Text style={styles.cardText}>View your past orders</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <Text style={styles.cardText}>Customize your experience</Text>
      </View>
    </View>
  </ScrollView>
);

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
    backgroundColor: '#FFFFFF',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    flex: 1,
  },
  pageContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    maxWidth: 200,
  },
});

export default Layout;
export { EnhancedLayout };
