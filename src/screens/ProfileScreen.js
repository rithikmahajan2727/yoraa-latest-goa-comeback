import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

// Component definitions moved outside to fix React best practices
const ProfileHeader = ({ profileData, onEditProfile }) => (
  <View style={styles.headerContainer}>
    <View style={styles.profileImageContainer}>
      {profileData.profileImage ? (
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
      ) : (
        <View style={styles.profileImagePlaceholder}>
          <Text style={styles.profileImageText}>
            {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.editImageButton}>
        <Text style={styles.editImageText}>✏️</Text>
      </TouchableOpacity>
    </View>
    
    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>{profileData.name}</Text>
      <Text style={styles.profileEmail}>{profileData.email}</Text>
      <Text style={styles.profileJoinDate}>{profileData.joinDate}</Text>
    </View>
    
    <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfile}>
      <Text style={styles.editProfileText}>Edit Profile</Text>
    </TouchableOpacity>
  </View>
);

const MenuSection = ({ title, children }) => (
  <View style={styles.menuSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const MenuItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {rightComponent || (
      <Text style={styles.menuItemArrow}>›</Text>
    )}
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Profile data (in a real app, this would come from state management or API)
  const profileData = {
    name: 'Rithik Mahajan',
    email: 'rithik@yoraa.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'Member since Jan 2024',
    profileImage: null, // Will use placeholder
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'This feature will be implemented soon!');
  };

  const handleOrderHistory = () => {
    Alert.alert('Order History', 'Loading your order history...');
  };

  const handleAddresses = () => {
    Alert.alert('Addresses', 'Manage your shipping addresses');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Manage your payment methods');
  };

  const handleWishlist = () => {
    Alert.alert('Wishlist', 'View your saved items');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'App settings');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Get help with your account');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ProfileHeader profileData={profileData} onEditProfile={handleEditProfile} />
        
        <MenuSection title="Account">
          <MenuItem
            icon="📦"
            title="Order History"
            subtitle="View your past orders"
            onPress={handleOrderHistory}
          />
          <MenuItem
            icon="📍"
            title="Shipping Addresses"
            subtitle="Manage delivery addresses"
            onPress={handleAddresses}
          />
          <MenuItem
            icon="💳"
            title="Payment Methods"
            subtitle="Manage payment options"
            onPress={handlePaymentMethods}
          />
          <MenuItem
            icon="❤️"
            title="Wishlist"
            subtitle="Your saved items"
            onPress={handleWishlist}
          />
        </MenuSection>

        <MenuSection title="Preferences">
          <MenuItem
            icon="🔔"
            title="Push Notifications"
            subtitle="Get notified about updates"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E5E5', true: '#FF6B6B' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <MenuItem
            icon="📧"
            title="Email Notifications"
            subtitle="Receive emails about orders"
            rightComponent={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#E5E5E5', true: '#FF6B6B' }}
                thumbColor={emailNotifications ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <MenuItem
            icon="🌙"
            title="Dark Mode"
            subtitle="Switch app appearance"
            rightComponent={
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: '#E5E5E5', true: '#FF6B6B' }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </MenuSection>

        <MenuSection title="Support">
          <MenuItem
            icon="⚙️"
            title="Settings"
            subtitle="App preferences"
            onPress={handleSettings}
          />
          <MenuItem
            icon="❓"
            title="Help & Support"
            subtitle="Get help or contact us"
            onPress={handleHelp}
          />
          <MenuItem
            icon="📋"
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy Policy', 'View our privacy policy')}
          />
          <MenuItem
            icon="📄"
            title="Terms of Service"
            onPress={() => Alert.alert('Terms of Service', 'View terms of service')}
          />
        </MenuSection>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Header Styles
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E5E5E5',
  },
  profileImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editImageText: {
    fontSize: 14,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  profileJoinDate: {
    fontSize: 14,
    color: '#999999',
  },
  editProfileButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Menu Styles
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#CCCCCC',
    fontWeight: 'bold',
  },

  // Logout Styles
  logoutSection: {
    margin: 16,
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // App Info Styles
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  appVersion: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  appBuild: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default ProfileScreen;