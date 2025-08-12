import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <View style={styles.backArrowIcon}>
    <View style={styles.backArrowLine} />
    <View style={styles.backArrowHead} />
  </View>
);

// Right Arrow Icon Component
const RightArrowIcon = () => (
  <View style={styles.rightArrowIcon}>
    <View style={styles.rightArrowLine} />
    <View style={styles.rightArrowHead} />
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // Animate in with 300ms ease out
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleBack = () => {
    // Animate out then navigate back
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.back(1.7)),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleDeliveryAddresses = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('DeliveryAddressesSettings');
    }
  };

  const handleCommunicationPreferences = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('CommunicationPreferences');
    }
  };

  const handleProfileVisibility = () => {
    console.log('Profile visibility pressed');
  };

  const handleLinkedAccounts = () => {
    console.log('Linked accounts pressed');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Settings Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleDeliveryAddresses}>
            <Text style={styles.menuItemText}>Delivery addresses</Text>
            <RightArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleCommunicationPreferences}>
            <Text style={styles.menuItemText}>Communication preferences</Text>
            <RightArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleProfileVisibility}>
            <Text style={styles.menuItemText}>Profile visibility</Text>
            <RightArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLinkedAccounts}>
            <Text style={styles.menuItemText}>Linked accounts</Text>
            <RightArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={handleDeleteAccount}>
            <Text style={[styles.menuItemText, styles.deleteAccountText]}>Delete account</Text>
            <RightArrowIcon />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomWidth: 0,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40, // Same width as back button to center the title
  },

  // Back Arrow Icon
  backArrowIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backArrowLine: {
    width: 12,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
  },
  backArrowHead: {
    width: 0,
    height: 0,
    borderRightWidth: 6,
    borderLeftWidth: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightColor: '#000000',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    left: 6,
  },

  // Right Arrow Icon
  rightArrowIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rightArrowLine: {
    width: 8,
    height: 1.5,
    backgroundColor: '#666666',
    position: 'absolute',
  },
  rightArrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftColor: '#666666',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    right: 2,
  },

  // Menu Styles
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  deleteAccountText: {
    color: '#000000', // Same as other items based on the design
  },
});

export default SettingsScreen;