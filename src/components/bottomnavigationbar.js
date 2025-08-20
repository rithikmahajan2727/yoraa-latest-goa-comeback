import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, FontFamilies, Spacing, Shadows } from '../constants';
import {
  HomeIcon,
  ShopIcon,
  CollectionIcon,
  RewardsIcon,
  ProfileIcon,
} from '../assets/icons';

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
              
              return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.name)}
              activeOpacity={0.7}
            >
              <tab.icon 
                active={isActive} 
                color={isActive ? Colors.primary : Colors.textTertiary}
                size={24}
              />
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
    paddingVertical: Spacing.md,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 24,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});

export default BottomNavigationBar;
