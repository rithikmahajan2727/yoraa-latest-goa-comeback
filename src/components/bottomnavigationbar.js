import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
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
                color={isActive ? '#000000' : '#848688'}
                size={18}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
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
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 13,
    paddingHorizontal: 15,
    height: 54,
    alignItems: 'flex-start',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    position: 'relative',
    minHeight: 37,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: FontWeights.normal,
    fontFamily: FontFamilies.regular,
    color: '#848688',
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: -0.2,
    lineHeight: 12,
  },
  activeTabLabel: {
    color: '#000000',
    fontWeight: FontWeights.bold,
    fontFamily: FontFamilies.bold,
  },
});

export default BottomNavigationBar;
