import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, FontFamilies, Spacing, Shadows } from '../constants';

// Custom Icons using SVG-like components (since we don't have vector icons installed)
const HomeIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.homeIcon, active && styles.activeIcon]} />
    <View style={[styles.homeIconRoof, active && styles.activeIcon]} />
  </View>
);

const ShopIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.shopBag, active && styles.activeIcon]} />
    <View style={[styles.shopHandle, active && styles.activeIcon]} />
  </View>
);

const CollectionIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.collectionRect1, active && styles.activeIcon]} />
    <View style={[styles.collectionRect2, active && styles.activeIcon]} />
    <View style={[styles.collectionRect3, active && styles.activeIcon]} />
  </View>
);

const RewardsIcon = ({ active }) => (
  <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
    <View style={[styles.starContainer]}>
      <View style={[styles.starTop, active && styles.activeIcon]} />
      <View style={[styles.starBottom, active && styles.activeIcon]} />
    </View>
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
      name: 'Shop',
      label: 'Shop',
      icon: ShopIcon,
    },
    {
      name: 'Collection',
      label: 'Collection',
      icon: CollectionIcon,
    },
    {
      name: 'Rewards',
      label: 'Rewards',
      icon: RewardsIcon,
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
    // Log the tab change but stay on the same page as requested
    console.log(`Tab selected: ${tabName} - staying on the same page`);
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
    backgroundColor: Colors.background,
    ...Shadows.medium,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    position: 'relative',
  },
  tabLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    fontFamily: FontFamilies.medium,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: FontWeights.semiBold,
    fontFamily: FontFamilies.semiBold,
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 24,
    height: 3,
    backgroundColor: Colors.primary,
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

  // Shop Icon
  shopBag: {
    width: 16,
    height: 14,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'absolute',
    bottom: 0,
  },
  shopHandle: {
    width: 10,
    height: 6,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    top: 0,
    left: 3,
  },

  // Collection Icon
  collectionRect1: {
    width: 14,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 5,
  },
  collectionRect2: {
    width: 12,
    height: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 2,
    position: 'absolute',
    top: 4,
    left: 0,
  },
  collectionRect3: {
    width: 10,
    height: 6,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 2,
    position: 'absolute',
    top: 8,
    left: 7,
  },

  // Rewards Icon (Star)
  starContainer: {
    width: 20,
    height: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#999999',
    position: 'absolute',
    top: 2,
  },
  starBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#999999',
    position: 'absolute',
    bottom: 2,
    transform: [{ rotate: '180deg' }],
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
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
});

export default BottomNavigationBar;
