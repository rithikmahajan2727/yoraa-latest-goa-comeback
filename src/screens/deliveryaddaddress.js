import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors } from '../constants/colors';

const DeliveryAddAddressScreen = ({ navigation, route }) => {
  const selectedOption = route?.params?.selectedOption || 'free';

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getOptionDetails = (option) => {
    if (option === 'free') {
      return {
        title: 'Free Delivery',
        subtitle: 'Arrives Wed, 11 May to Fri, 13 May',
        price: null,
      };
    } else if (option === 'international') {
      return {
        title: 'International Delivery',
        subtitle: 'Arrives Wed, 18 May to Fri, 13 May',
        price: '$50 + Delivery Charges',
      };
    }
    return {
      title: 'Unknown Option',
      subtitle: '',
      price: null,
    };
  };

  const optionDetails = getOptionDetails(selectedOption);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Delivery Address</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selected Delivery Option Display */}
        <View style={styles.optionContainer}>
          <View style={styles.lockIconContainer}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
          <View style={styles.optionDetails}>
            <Text style={styles.optionTitle}>{optionDetails.title}</Text>
            <Text style={styles.optionSubtitle}>{optionDetails.subtitle}</Text>
            {optionDetails.price && (
              <Text style={styles.optionPrice}>{optionDetails.price}</Text>
            )}
          </View>
        </View>

        <Text style={styles.description}>
          This delivery option has been locked for your order. Please add your delivery address below.
        </Text>

        {/* Address Form Placeholder */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Delivery Address</Text>
          {/* Add address form fields here */}
          <Text style={styles.placeholderText}>Address form will be implemented here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  lockIconContainer: {
    marginRight: 16,
  },
  lockIcon: {
    fontSize: 24,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 2,
  },
  optionPrice: {
    fontSize: 14,
    color: Colors.gray600,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  formContainer: {
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.gray600,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default DeliveryAddAddressScreen;
