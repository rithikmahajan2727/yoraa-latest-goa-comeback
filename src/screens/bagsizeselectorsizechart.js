import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const BagSizeSelectorSizeChart = ({ visible, onClose }) => {
  console.log('BagSizeSelectorSizeChart rendered, visible:', visible);

  useEffect(() => {
    console.log('useEffect triggered, visible:', visible);
    if (visible) {
      Alert.alert('Test', 'Size Chart Modal is visible!');
    }
  }, [visible]);

  const handleClose = () => {
    Alert.alert('Test', 'Size Chart Modal Close button pressed!');
    onClose();
  };

  console.log('About to render modal, visible:', visible);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(255, 0, 0, 0.8)' }]}>
        <View style={[styles.modalContainer, { backgroundColor: 'white', padding: 20 }]}>
          <Text style={[styles.headerTitle, { fontSize: 24, color: 'black', textAlign: 'center' }]}>
            SIZE CHART TEST MODAL
          </Text>
          <TouchableOpacity onPress={handleClose} style={[styles.doneButton, { marginTop: 20 }]}>
            <Text style={styles.doneButtonText}>Close Size Chart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    minHeight: screenHeight * 0.7,
    maxHeight: screenHeight * 0.9,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 51,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
  },
  activeTabText: {
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 11,
    right: 11,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 50,
  },
  contentContainer: {
    flex: 1,
  },
  unitSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 24,
    height: 45,
  },
  selectSizeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.4,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
    height: 30,
    width: 80,
    padding: 0,
  },
  unitOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  activeUnit: {
    backgroundColor: '#000000',
  },
  inactiveUnit: {
    backgroundColor: 'transparent',
  },
  unitText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  activeUnitText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveUnitText: {
    color: '#000000',
    fontWeight: '400',
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#000000',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  tableRow: {
    backgroundColor: '#FFFFFF',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  cellText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.4,
  },
  measurementText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    marginTop: 50,
    letterSpacing: -0.4,
  },
  doneButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 19.2,
  },
});

export default BagSizeSelectorSizeChart;
