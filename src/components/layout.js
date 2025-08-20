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
import { HomeScreen, ShopScreen, CollectionScreen, RewardsScreen, ProfileScreen, CreateAccountMobileNumber, CreateAccountMobileNumberVerification, OrdersScreen, EditProfile, SettingsScreen, DeliveryAddressesSettings, CommunicationPreferences, LinkedAccountScreen, DeleteAccount, ProfileVisibilityScreen, ContactUsScreen, InvoiceScreen, LoveUsRateUs, FAQScreen, ProductViewOne, ProductViewTwo, ProductViewThree, ProductDetailsMain, ProductDetailsMainReview } from '../screens';

// Placeholder content components for each tab
const HomeContent = ({ navigation }) => <HomeScreen navigation={navigation} />;
const ShopContent = () => <ShopScreen />;
const CollectionContent = () => <CollectionScreen />;
const RewardsContent = ({ navigation }) => <RewardsScreen navigation={navigation} />;
const ProfileContent = ({ navigation }) => <ProfileScreen navigation={navigation} />;

// Enhanced Layout with improved navigation handling
const EnhancedLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [headerTitle, setHeaderTitle] = useState('YORAA');
  const [routeParams, setRouteParams] = useState(null);
  const [navigationHistory, setNavigationHistory] = useState(['Home']);

  // Navigation context for handling screen navigation
  const createNavigation = (setCurrentScreen, setActiveTab, setRouteParams, setNavigationHistory) => ({
    navigate: (screenName, params) => {
      if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(screenName)) {
        setActiveTab(screenName);
        setCurrentScreen(screenName);
        setNavigationHistory([screenName]);
      } else {
        setCurrentScreen(screenName);
        setNavigationHistory(prev => [...prev, screenName]);
      }
      setRouteParams(params || null);
    },
    goBack: () => {
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop(); // Remove current screen
        const previousScreen = newHistory[newHistory.length - 1] || 'Profile';
        
        // Handle back navigation to previous screen
        if (routeParams?.previousScreen) {
          setCurrentScreen(routeParams.previousScreen);
          if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(routeParams.previousScreen)) {
            setActiveTab(routeParams.previousScreen);
          }
        } else {
          setCurrentScreen(previousScreen);
          if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(previousScreen)) {
            setActiveTab(previousScreen);
          }
        }
        
        setRouteParams(null);
        return newHistory.length > 0 ? newHistory : ['Home'];
      });
    },
    route: { params: routeParams },
  });

  const navigation = createNavigation(setCurrentScreen, setActiveTab, setRouteParams, setNavigationHistory);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentScreen(tabName);
    setHeaderTitle(tabName === 'Home' ? 'YORAA' : tabName);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeContent navigation={navigation} />;
      case 'Shop':
        return <ShopContent />;
      case 'Collection':
        return <CollectionContent />;
      case 'Rewards':
        return <RewardsContent navigation={navigation} />;
      case 'Profile':
        return <ProfileContent navigation={navigation} />;
      case 'CreateAccountMobileNumber':
        return <CreateAccountMobileNumber navigation={navigation} />;
      case 'CreateAccountMobileNumberVerification':
        return <CreateAccountMobileNumberVerification navigation={navigation} />;
      case 'Orders':
        return <OrdersScreen navigation={navigation} />;
      case 'EditProfile':
        return <EditProfile navigation={navigation} />;
      case 'Settings':
        return <SettingsScreen navigation={navigation} />;
      case 'DeliveryAddressesSettings':
        return <DeliveryAddressesSettings navigation={navigation} />;
      case 'CommunicationPreferences':
        return <CommunicationPreferences navigation={navigation} />;
      case 'ProfileVisibilityScreen':
        return <ProfileVisibilityScreen navigation={navigation} />;
      case 'LinkedAccount':
        return <LinkedAccountScreen navigation={navigation} />;
      case 'DeleteAccount':
        return <DeleteAccount navigation={navigation} />;
      case 'ContactUs':
        return <ContactUsScreen navigation={navigation} />;
      case 'Invoice':
        return <InvoiceScreen navigation={navigation} />;
      case 'LoveUsRateUs':
        return <LoveUsRateUs navigation={navigation} />;
      case 'FAQ':
        return <FAQScreen navigation={navigation} />;
      case 'ProductViewOne':
        return <ProductViewOne navigation={navigation} />;
      case 'ProductViewTwo':
        return <ProductViewTwo navigation={navigation} />;
      case 'ProductViewThree':
        return <ProductViewThree navigation={navigation} />;
      case 'ProductDetailsMain':
        return <ProductDetailsMain navigation={navigation} route={{ params: routeParams }} />;
      case 'ProductDetailsMainReview':
        return <ProductDetailsMainReview navigation={navigation} route={{ params: routeParams }} />;
      default:
        return <HomeContent />;
    }
  };

  const shouldShowBottomNav = ['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(currentScreen);
  const shouldShowHeader = ['Profile'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Dynamic Header - Only show for main tabs except Collection and Home */}
        {shouldShowHeader && activeTab !== 'Home' && activeTab !== 'Profile' && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          </View>
        )}

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* Bottom Navigation - Only show for main tabs */}
      {shouldShowBottomNav && (
        <BottomNavigationBar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
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
  mainContent: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
});

export { EnhancedLayout };
export default EnhancedLayout;
