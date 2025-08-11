import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

// Icon Components
const UserIcon = () => (
  <View style={styles.userIconContainer}>
    <View style={styles.userHead} />
    <View style={styles.userBody} />
  </View>
);

const OrderIcon = () => (
  <View style={styles.orderIconContainer}>
    <View style={styles.orderBox} />
    <View style={styles.orderTape} />
  </View>
);

const LocationIcon = () => (
  <View style={styles.locationIconContainer}>
    <View style={styles.locationPin} />
    <View style={styles.locationBase} />
  </View>
);

const CardIcon = () => (
  <View style={styles.cardIconContainer}>
    <View style={styles.cardMain} />
    <View style={styles.cardStripe} />
  </View>
);

const HeartIcon = () => (
  <View style={styles.heartIconContainer}>
    <View style={styles.heartLeft} />
    <View style={styles.heartRight} />
    <View style={styles.heartBottom} />
  </View>
);

const NotificationIcon = () => (
  <View style={styles.notificationIconContainer}>
    <View style={styles.bellBody} />
    <View style={styles.bellTop} />
    <View style={styles.bellDot} />
  </View>
);

const SettingsIcon = () => (
  <View style={styles.settingsIconContainer}>
    <View style={styles.gearOuter} />
    <View style={styles.gearInner} />
  </View>
);

const HelpIcon = () => (
  <View style={styles.helpIconContainer}>
    <View style={styles.helpCircle} />
    <View style={styles.helpQuestion} />
  </View>
);

const PrivacyIcon = () => (
  <View style={styles.privacyIconContainer}>
    <View style={styles.shieldMain} />
    <View style={styles.shieldCheck} />
  </View>
);

const LogoutIcon = () => (
  <View style={styles.logoutIconContainer}>
    <View style={styles.logoutArrow} />
    <View style={styles.logoutDoor} />
  </View>
);

const ArrowIcon = () => (
  <View style={styles.arrowIconContainer}>
    <View style={styles.arrowLine} />
    <View style={styles.arrowHead} />
  </View>
);

// Menu Components
const MenuSection = ({ title, children }) => (
  <View style={styles.menuSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const MenuItem = ({ icon, title, subtitle, onPress, rightComponent, isLast = false }) => (
  <TouchableOpacity 
    style={[styles.menuItem, isLast && styles.lastMenuItem]} 
    onPress={onPress}
  >
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIconContainer}>
        {icon}
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {rightComponent || <ArrowIcon />}
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Profile data
  const profileData = {
    name: 'Rithik Mahajan',
    email: 'rithik@yoraa.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'Member since Jan 2024',
    orderCount: 12,
    points: 2450,
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit your personal information');
  };

  const handleOrderHistory = () => {
    if (navigation) {
      navigation.navigate('Orders');
    } else {
      Alert.alert('Order History', 'View your past orders and track current ones');
    }
  };

  const handleAddresses = () => {
    Alert.alert('Shipping Addresses', 'Manage your delivery addresses');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Add or update payment methods');
  };

  const handleWishlist = () => {
    Alert.alert('Wishlist', 'View your saved items');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'App settings and preferences');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Get help or contact customer support');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy Policy', 'Read our privacy policy');
  };

  const handleTerms = () => {
    Alert.alert('Terms of Service', 'View terms and conditions');
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {
          // Handle logout logic
          console.log("User logged out");
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.headerContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImagePlaceholder}>
              <UserIcon />
            </View>
            <TouchableOpacity style={styles.editImageButton}>
              <Text style={styles.editImageText}>✏️</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileEmail}>{profileData.email}</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.orderCount}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.points}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Gold</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <MenuSection title="Account">
          <MenuItem
            icon={<OrderIcon />}
            title="Order History"
            subtitle="Track orders and view history"
            onPress={handleOrderHistory}
          />
          <MenuItem
            icon={<LocationIcon />}
            title="Shipping Addresses"
            subtitle="Manage delivery locations"
            onPress={handleAddresses}
          />
          <MenuItem
            icon={<CardIcon />}
            title="Payment Methods"
            subtitle="Cards and payment options"
            onPress={handlePaymentMethods}
          />
          <MenuItem
            icon={<HeartIcon />}
            title="Wishlist"
            subtitle="Your saved items"
            onPress={handleWishlist}
            isLast={true}
          />
        </MenuSection>

        {/* Preferences Section */}
        <MenuSection title="Preferences">
          <MenuItem
            icon={<NotificationIcon />}
            title="Push Notifications"
            subtitle="App notifications"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E5E5', true: '#000000' }}
                thumbColor={'#FFFFFF'}
              />
            }
          />
          <MenuItem
            icon={<NotificationIcon />}
            title="Email Notifications"
            subtitle="Marketing and updates"
            rightComponent={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#E5E5E5', true: '#000000' }}
                thumbColor={'#FFFFFF'}
              />
            }
          />
          <MenuItem
            icon={<SettingsIcon />}
            title="App Settings"
            subtitle="Language, region, currency"
            onPress={handleSettings}
            isLast={true}
          />
        </MenuSection>

        {/* Support Section */}
        <MenuSection title="Support & Legal">
          <MenuItem
            icon={<HelpIcon />}
            title="Help & Support"
            subtitle="FAQs and contact support"
            onPress={handleHelp}
          />
          <MenuItem
            icon={<PrivacyIcon />}
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={handlePrivacy}
          />
          <MenuItem
            icon={<PrivacyIcon />}
            title="Terms of Service"
            subtitle="Terms and conditions"
            onPress={handleTerms}
            isLast={true}
          />
        </MenuSection>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogoutIcon />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>YORAA v1.0.0</Text>
          <Text style={styles.appBuild}>Build 123</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Header Styles
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    ...Shadows.medium,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...Shadows.small,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  editImageText: {
    fontSize: FontSizes.md,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileName: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: FontSizes.md,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: '#666666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
    marginHorizontal: Spacing.lg,
  },
  editProfileButton: {
    backgroundColor: '#000000',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
  },

  // Menu Styles
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginTop: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#000000',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  menuItemSubtitle: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },

  // Logout Styles
  logoutSection: {
    margin: Spacing.lg,
  },
  logoutButton: {
    backgroundColor: '#000000',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    ...Shadows.small,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
  },

  // App Info Styles
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  appVersion: {
    fontSize: FontSizes.sm,
    color: '#999999',
    marginBottom: Spacing.xs,
  },
  appBuild: {
    fontSize: FontSizes.xs,
    color: '#999999',
  },

  // Icon Styles
  userIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  userHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 2,
  },
  userBody: {
    width: 16,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 2,
  },
  orderIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  orderBox: {
    width: 16,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 2,
    position: 'absolute',
    bottom: 2,
  },
  orderTape: {
    width: 10,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 3,
  },
  locationIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  locationPin: {
    width: 12,
    height: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 0,
    position: 'absolute',
    top: 0,
    left: 4,
    transform: [{ rotate: '-45deg' }],
  },
  locationBase: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 3,
    left: 8,
  },
  cardIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  cardMain: {
    width: 18,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 2,
    position: 'absolute',
    top: 4,
    left: 1,
  },
  cardStripe: {
    width: 18,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 7,
    left: 1,
  },
  heartIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  heartLeft: {
    width: 6,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 0,
    position: 'absolute',
    left: 3,
    top: 3,
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    width: 6,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 0,
    position: 'absolute',
    right: 3,
    top: 3,
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000000',
    position: 'absolute',
    bottom: 3,
    left: 4,
  },
  notificationIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  bellBody: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    bottom: 4,
    left: 4,
  },
  bellTop: {
    width: 4,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
    position: 'absolute',
    top: 2,
    left: 8,
  },
  bellDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666666',
    position: 'absolute',
    top: 0,
    right: 2,
  },
  settingsIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  gearOuter: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  gearInner: {
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
    position: 'absolute',
    top: 6,
    left: 6,
  },
  helpIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  helpCircle: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  helpQuestion: {
    width: 2,
    height: 6,
    backgroundColor: '#000000',
    borderRadius: 1,
    position: 'absolute',
    top: 5,
    left: 9,
  },
  privacyIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  shieldMain: {
    width: 12,
    height: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    position: 'absolute',
    top: 2,
    left: 4,
  },
  shieldCheck: {
    width: 6,
    height: 3,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#000000',
    position: 'absolute',
    top: 8,
    left: 7,
    transform: [{ rotate: '45deg' }],
  },
  logoutIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  logoutArrow: {
    width: 8,
    height: 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 9,
    left: 2,
  },
  logoutDoor: {
    width: 10,
    height: 14,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderLeftWidth: 0,
    borderRadius: 2,
    position: 'absolute',
    top: 3,
    right: 2,
  },
  arrowIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  arrowLine: {
    width: 8,
    height: 2,
    backgroundColor: '#999999',
    position: 'absolute',
    top: 9,
    left: 6,
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftColor: '#999999',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 7,
    right: 2,
  },
});

export default ProfileScreen;