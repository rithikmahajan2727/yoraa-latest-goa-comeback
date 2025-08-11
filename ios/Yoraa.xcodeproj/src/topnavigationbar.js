import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const TopNavigationBar = ({ 
  title = "YORAA", 
  showBackButton = false, 
  onBackPress = () => {},
  showSearchIcon = true,
  showNotificationIcon = true,
  showProfileIcon = true,
  onSearchPress = () => {},
  onNotificationPress = () => {},
  onProfilePress = () => {},
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>

        {/* Center Section - Logo/Title */}
        <View style={styles.centerSection}>
          <Text style={styles.logo}>{title}</Text>
          <Text style={styles.tagline}>Fashion Forward</Text>
        </View>

        {/* Right Section - Action Icons */}
        <View style={styles.rightSection}>
          {showSearchIcon && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onSearchPress}
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>🔍</Text>
            </TouchableOpacity>
          )}
          
          {showNotificationIcon && (
            <TouchableOpacity 
              style={[styles.iconButton, styles.notificationButton]} 
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>🔔</Text>
              {/* Notification Badge */}
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
          )}
          
          {showProfileIcon && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onProfilePress}
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>👤</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Elegant Separator Line */}
      <View style={styles.separator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    height: 70,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 10,
    color: '#888888',
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  backIcon: {
    fontSize: 24,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
    color: '#1A1A1A',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
  },
});

export default TopNavigationBar;