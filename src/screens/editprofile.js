import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <View style={styles.backIcon}>
    <View style={styles.backArrowLine} />
    <View style={styles.backArrowHead1} />
    <View style={styles.backArrowHead2} />
  </View>
);

const EditProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: 'Jhin Doe',
    email: 'dsajklsaj@gamil.com',
    changePassword: '',
    confirmPassword: '',
    phone: '843783489937',
    dateOfBirth: new Date(1999, 4, 6), // May 6, 1999
    gender: 'Female',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    changePassword: false,
    confirmPassword: false,
  });

  const [otherDetailsExpanded, setOtherDetailsExpanded] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const genderOptions = ['Male', 'Female'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordPlaceholder = (field) => {
    return field === 'changePassword' ? 'Enter new password' : 'Confirm new password';
  };

  const getPasswordDisplayValue = (field) => {
    return formData[field];
  };

  const shouldSecureEntry = (field) => {
    return !passwordVisible[field];
  };

  const handleSave = () => {
    console.log('Save profile:', formData);
    // Add save logic here
    // You can add validation and API calls here
  };

  const handleAddOtherDetails = () => {
    setOtherDetailsExpanded(!otherDetailsExpanded);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        dateOfBirth: selectedDate
      }));
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
    setShowGenderDropdown(false);
  };

  const handleAddAddress = () => {
    console.log('Add address');
    // Add navigation or modal for address
  };

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      // Add animation with 300ms ease-out
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
          activeOpacity={0.7}
        >
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your name"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Change Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Change Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                value={getPasswordDisplayValue('changePassword')}
                onChangeText={(value) => handleInputChange('changePassword', value)}
                placeholder={getPasswordPlaceholder('changePassword')}
                secureTextEntry={shouldSecureEntry('changePassword')}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('changePassword')}
              >
                <Text style={styles.eyeText}>
                  {passwordVisible.changePassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                value={getPasswordDisplayValue('confirmPassword')}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder={getPasswordPlaceholder('confirmPassword')}
                secureTextEntry={shouldSecureEntry('confirmPassword')}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('confirmPassword')}
              >
                <Text style={styles.eyeText}>
                  {passwordVisible.confirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phone Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Additional Sections */}
        <View style={styles.additionalContainer}>
          {/* Other Details */}
          <View style={styles.additionalSection}>
            <TouchableOpacity style={styles.additionalItem} onPress={handleAddOtherDetails}>
              <Text style={styles.additionalTitle}>Other Details</Text>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
            
            {otherDetailsExpanded && (
              <View style={styles.expandedContent}>
                {/* Date of Birth */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Date of Birth</Text>
                  <View style={styles.datePickerContainer}>
                    <DateTimePicker
                      value={formData.dateOfBirth}
                      mode="date"
                      display="compact"
                      onChange={handleDateChange}
                      style={styles.datePickerStyle}
                    />
                  </View>
                </View>

                {/* Gender */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <TouchableOpacity 
                    style={styles.dropdownContainer}
                    onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                  >
                    <Text style={styles.dropdownText}>{formData.gender}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  
                  {showGenderDropdown && (
                    <View style={styles.dropdownOptions}>
                      {genderOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={styles.dropdownOption}
                          onPress={() => handleGenderSelect(option)}
                        >
                          <Text style={[
                            styles.dropdownOptionText,
                            formData.gender === option && styles.selectedOption
                          ]}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Address */}
          <TouchableOpacity style={styles.additionalItem} onPress={handleAddAddress}>
            <Text style={styles.additionalTitle}>Address</Text>
            <Text style={styles.addButton}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer for Save Button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 2,
  },
  backArrowLine: {
    width: 14,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 4,
  },
  backArrowHead1: {
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: -3,
    transform: [{ rotate: '45deg' }],
    transformOrigin: 'left center',
  },
  backArrowHead2: {
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: 3,
    transform: [{ rotate: '-45deg' }],
    transformOrigin: 'left center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    marginLeft: 5,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    top: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  eyeText: {
    fontSize: 16,
    color: '#666666',
  },
  additionalContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  additionalSection: {
    marginBottom: 15,
  },
  additionalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  additionalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  expandedContent: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  datePickerContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  datePickerStyle: {
    flex: 1,
    height: 40,
  },
  dateText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666666',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 15,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedOption: {
    fontWeight: '600',
    color: '#007AFF',
  },
  spacer: {
    height: 100,
  },
  saveButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfile;
