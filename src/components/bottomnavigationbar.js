import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Custom Icons using SVG-like components (since we don't have vector icons installed)
const HomeIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.homeIcon, active && styles.activeIcon]} />
    <View style={[styles.homeIconRoof, active && styles.activeIcon]} />
  </View>
);

const SearchIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.searchCircle, active && styles.activeIcon]} />
    <View style={[styles.searchHandle, active && styles.activeIcon]} />
  </View>
);

const HeartIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.heart, active && styles.activeIcon]} />
  </View>
);

const CartIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.cartBase, active && styles.activeIcon]} />
    <View style={[styles.cartHandle, active && styles.activeIcon]} />
  </View>
);

const ProfileIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.profileHead, active && styles.activeIcon]} />
    <View style={[styles.profileBody, active && styles.activeIcon]} />
  </View>
);

const BottomNavigationBar = ({ activeTab = 'Home', onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState('Home');
  
  // Use external activeTab if provided, otherwise use internal state
  const currentActiveTab = activeTab || internalActiveTab;

  const tabs = [
    {
      name: 'Home',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      name: 'Search',
      label: 'Search',
      icon: SearchIcon,
    },
    {
      name: 'Favorites',
      label: 'Favorites',
      icon: HeartIcon,
    },
    {
      name: 'Cart',
      label: 'Cart',
      icon: CartIcon,
    },
    {
      name: 'Profile',
      label: 'Profile',
      icon: ProfileIcon,
    },
  ];

  const handleTabPress = (tabName) => {
    // Update internal state if no external handler provided
    if (!onTabChange) {
      setInternalActiveTab(tabName);
    } else {
      // Use external handler
      onTabChange(tabName);
    }
    console.log(`Navigating to ${tabName}`);
  };

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.navigationBar}>
            {tabs.map((tab) => {
              const isActive = currentActiveTab === tab.name;
              const IconComponent = tab.icon;          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.name)}
              activeOpacity={0.7}
            >
              <IconComponent active={isActive} />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#999999',
    marginTop: 4,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 24,
    height: 3,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    // Additional styling for active icon container if needed
  },
  
  // Home Icon
  homeIcon: {
    width: 18,
    height: 14,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
  },
  homeIconRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#999999',
    position: 'absolute',
    top: 0,
  },
  
  // Search Icon
  searchCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#999999',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 8,
    height: 2,
    backgroundColor: '#999999',
    position: 'absolute',
    bottom: 2,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  
  // Heart Icon
  heart: {
    width: 20,
    height: 18,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  
  // Cart Icon
  cartBase: {
    width: 18,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'absolute',
    bottom: 0,
  },
  cartHandle: {
    width: 12,
    height: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'absolute',
    top: 0,
    left: 3,
  },
  
  // Profile Icon
  profileHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    position: 'absolute',
    top: 0,
  },
  profileBody: {
    width: 16,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
  },
  
  // Active Icon Styles
  activeIcon: {
    borderColor: '#FF6B6B',
    backgroundColor: 'transparent',
  },
});

// Custom Heart Icon with proper heart shape
const HeartShape = ({ active }) => (
  <View style={styles.iconContainer}>
    <View style={styles.heartWrapper}>
      <View style={[styles.heartLeftCircle, active && styles.activeIcon]} />
      <View style={[styles.heartRightCircle, active && styles.activeIcon]} />
      <View style={[styles.heartBottom, active && styles.activeIcon]} />
    </View>
  </View>
);

// Update the heart icon styles
const heartStyles = StyleSheet.create({
  heartWrapper: {
    width: 20,
    height: 18,
    position: 'relative',
  },
  heartLeftCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ rotate: '-45deg' }],
  },
  heartRightCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#999999',
    position: 'absolute',
    bottom: 0,
    left: 3,
  },
});

// Enhanced Bottom Navigation with better styling and animations
const EnhancedBottomNavigationBar = ({ activeTab = 'Home', onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState('Home');
  
  // Use external activeTab if provided, otherwise use internal state
  const currentActiveTab = activeTab || internalActiveTab;

  const tabs = [
    {
      name: 'Home',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      name: 'Search',
      label: 'Search',
      icon: SearchIcon,
    },
    {
      name: 'Favorites',
      label: 'Favorites',
      icon: HeartShape,
    },
    {
      name: 'Cart',
      label: 'Cart',
      icon: CartIcon,
    },
    {
      name: 'Profile',
      label: 'Profile',
      icon: ProfileIcon,
    },
  ];

  const handleTabPress = (tabName) => {
    // Update internal state if no external handler provided
    if (!onTabChange) {
      setInternalActiveTab(tabName);
    } else {
      // Use external handler
      onTabChange(tabName);
    }
    // Add haptic feedback for iOS
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log(`Navigating to ${tabName}`);
  };

  return (
    <View style={enhancedStyles.container}>
      <View style={enhancedStyles.navigationBar}>
        {tabs.map((tab) => {
          const isActive = currentActiveTab === tab.name;
          const IconComponent = tab.icon;
          
          return (
            <TouchableOpacity
              key={tab.name}
              style={[enhancedStyles.tabButton, isActive && enhancedStyles.activeTabButton]}
              onPress={() => handleTabPress(tab.name)}
              activeOpacity={0.6}
            >
              <View style={[enhancedStyles.iconWrapper, isActive && enhancedStyles.activeIconWrapper]}>
                <IconComponent active={isActive} />
              </View>
              <Text style={[enhancedStyles.tabLabel, isActive && enhancedStyles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const enhancedStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  activeTabButton: {
    backgroundColor: '#FFF5F5',
  },
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  activeIconWrapper: {
    backgroundColor: '#FFE5E5',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8E8E93',
    marginTop: 6,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});

// Merge heart styles with main styles
Object.assign(styles, heartStyles);

export default BottomNavigationBar;
export { EnhancedBottomNavigationBar };
