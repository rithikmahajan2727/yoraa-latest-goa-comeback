import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Linking,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// Location Pin Icon Component
const LocationIcon = () => (
  <View style={styles.locationIcon}>
    <View style={styles.locationPin}>
      <View style={styles.locationDot} />
    </View>
  </View>
);

const ContactUsScreen = ({ navigation, visible = true }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in with 250ms ease in from bottom
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [slideAnim, opacityAnim, visible]);

  const handleClose = () => {
    // Animate out with 250ms ease out to bottom
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleBackdropPress = () => {
    handleClose();
  };

  const handleEmailPress = () => {
    const email = 'contact@yoraa.in';
    const subject = 'Contact Inquiry';
    const body = 'Hello Yoraa Team,\n\nI would like to inquire about...\n\nBest regards,';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.canOpenURL(mailtoUrl).then((supported) => {
      if (supported) {
        Linking.openURL(mailtoUrl);
      } else {
        Alert.alert(
          'Email App Not Available',
          'Please send an email to contact@yoraa.in',
          [{ text: 'OK' }]
        );
      }
    });
  };

  const handleCustomerSupport = () => {
    // You can implement this to open a chat, call, or other support method
    Alert.alert(
      'Customer Support',
      'We\'re here to help! Our support team is available Monday to Friday 10 AM - 4 PM IST.',
      [
        { text: 'Call Us', onPress: () => Linking.openURL('tel:+911234567890') },
        { text: 'Email Us', onPress: handleEmailPress },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <Animated.View 
          style={[
            styles.backdrop,
            {
              opacity: opacityAnim
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            {/* Top Handle */}
            <View style={styles.handle} />

            {/* Location Icon */}
            <View style={styles.iconContainer}>
              <LocationIcon />
            </View>

            {/* Office Address */}
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>Office address :</Text>
              <Text style={styles.addressText}>
                FORUM DLF CYBER CITY, PHASE 3 , SECTOR 24, DLF QE, 
                Dlf Qe, Gurgaon- 122002, Haryana
              </Text>
            </View>

            {/* Email */}
            <View style={styles.emailContainer}>
              <Text style={styles.emailLabel}>Email: </Text>
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.emailLink}>contact@yoraa.in</Text>
              </TouchableOpacity>
            </View>

            {/* Support Hours */}
            <Text style={styles.supportHours}>
              We're here to help Monday to friday 10 AM - 4 PM IST
            </Text>

            {/* Contact Customer Support Button */}
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={handleCustomerSupport}
            >
              <Text style={styles.supportButtonText}>Contact Customer Support</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    minHeight: 320,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  locationIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPin: {
    width: 40,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  locationDot: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: -5,
  },
  addressContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  emailLink: {
    fontSize: 16,
    color: '#000000',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  supportHours: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 250,
  },
  supportButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    minWidth: 280,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactUsScreen;
