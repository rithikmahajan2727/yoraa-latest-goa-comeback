import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius, Colors } from '../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateAccountMobileNumber = ({ navigation }) => {
  const [isPhoneSelected, setIsPhoneSelected] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const handleSkip = () => {
    // Navigate back or to next screen
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleSignUp = () => {
    // Handle sign up logic
    console.log('Sign up with mobile:', countryCode + mobileNumber);
    // You can add validation and API call here
    
    // Navigate to verification screen
    if (navigation) {
      navigation.navigate('CreateAccountMobileNumberVerification');
    }
  };

  const handleToggle = (type) => {
    setIsPhoneSelected(type === 'phone');
  };

  const handleSignUpLink = () => {
    // Handle "Sign Up" link in the footer
    console.log('Navigate to sign up');
  };

  const handleAppleLogin = () => {
    // Handle Apple login
    console.log('Apple login');
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Skip button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create your account</Text>
        </View>

        {/* Toggle between Phone and Email */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleBackground}>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                isPhoneSelected && styles.toggleOptionActive,
              ]}
              onPress={() => handleToggle('phone')}
            >
              <Text
                style={[
                  styles.toggleText,
                  isPhoneSelected && styles.toggleTextActive,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleOption,
                !isPhoneSelected && styles.toggleOptionActive,
              ]}
              onPress={() => handleToggle('email')}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isPhoneSelected && styles.toggleTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Number Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            {/* Country flag and code */}
            <View style={styles.countrySection}>
              <View style={styles.flagContainer}>
                <Text style={styles.flagEmoji}>🇮🇳</Text>
              </View>
              <Text style={styles.countryCode}>{countryCode}</Text>
              <View style={styles.chevronContainer}>
                <Text style={styles.chevronDown}>▼</Text>
              </View>
            </View>

            {/* Vertical divider */}
            <View style={styles.divider} />

            {/* Mobile number input */}
            <TextInput
              style={styles.textInput}
              placeholder="Mobile Number"
              placeholderTextColor="#848688"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Divider with "or log in with" */}
        <View style={styles.dividerSection}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or log in with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
            <Text style={styles.appleIcon}>🍎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Text style={styles.googleIcon}>G</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.footerLink} onPress={handleSignUpLink}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    textAlign: 'right',
  },
  titleContainer: {
    paddingHorizontal: 33,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 48,
  },
  toggleContainer: {
    alignItems: 'center',
    marginTop: 66,
  },
  toggleBackground: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    borderRadius: 15,
    height: 30,
    width: 124,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  toggleOptionActive: {
    backgroundColor: '#000000',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  toggleTextActive: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: 38,
    marginTop: 132,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    height: 47,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
  },
  flagContainer: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  chevronContainer: {
    marginLeft: 4,
  },
  chevronDown: {
    fontSize: 10,
    color: '#848688',
  },
  divider: {
    width: 1,
    height: 34,
    backgroundColor: '#E9E9E9',
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    paddingRight: 16,
  },
  signUpButton: {
    marginHorizontal: 38,
    marginTop: 64,
    backgroundColor: '#000000',
    borderRadius: 26.5,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  dividerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 38,
    marginTop: 149,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9E9E9',
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    opacity: 0.6,
    marginHorizontal: 16,
    letterSpacing: 0.24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
    gap: 20,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#332218',
    opacity: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleIcon: {
    fontSize: 18,
    color: '#332218',
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#332218',
  },
  footer: {
    alignItems: 'center',
    marginTop: 120,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  footerLink: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

export default CreateAccountMobileNumber;
