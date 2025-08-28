import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { Colors, FontFamilies } from '../constants';

const { height } = Dimensions.get('window');

const FavouritesSizeChartReference = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('sizeChart'); // 'sizeChart' or 'howToMeasure'
  const [selectedUnit, setSelectedUnit] = useState('cm'); // 'in' or 'cm'

  const sizeData = [
    { size: 'S', waist: '71.1', inseam: '70.1' },
    { size: 'M', waist: '71.1', inseam: '70.1' },
    { size: 'L', waist: '71.1', inseam: '70.1' },
    { size: 'XL', waist: '71.1', inseam: '70.1' },
    { size: 'XXL', waist: '71.1', inseam: '70.1' },
  ];

  const renderSizeChart = () => (
    <View style={styles.sizeChartContainer}>
      {/* Unit Selection */}
      <View style={styles.unitSelectionHeader}>
        <Text style={styles.unitSelectionLabel}>Select size in</Text>
        <View style={styles.unitToggleContainer}>
          <TouchableOpacity
            style={[
              styles.unitOption,
              selectedUnit === 'in' && styles.unitOptionInactive,
            ]}
            onPress={() => setSelectedUnit('in')}
          >
            <Text
              style={[
                styles.unitText,
                selectedUnit === 'in' && styles.unitTextInactive,
              ]}
            >
              in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitOptionActive,
              selectedUnit === 'cm' && styles.unitOptionActiveSelected,
            ]}
            onPress={() => setSelectedUnit('cm')}
          >
            <Text
              style={[
                styles.unitTextActive,
                selectedUnit === 'cm' && styles.unitTextActiveSelected,
              ]}
            >
              cm
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Size Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Size</Text>
          <Text style={styles.tableHeaderText}>To fit waist({selectedUnit})</Text>
          <Text style={styles.tableHeaderText}>Inseam Length({selectedUnit})</Text>
        </View>

        {/* Table Rows */}
        {sizeData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCellText}>{item.size}</Text>
            <Text style={styles.tableCellText}>{item.waist}</Text>
            <Text style={styles.tableCellText}>{item.inseam}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderHowToMeasure = () => (
    <View style={styles.howToMeasureContainer}>
      <Text style={styles.comingSoonText}>
        How To Measure instructions coming soon...
      </Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SIZE SELECTION</Text>
          </View>

          {/* Tab Container */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'sizeChart' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('sizeChart')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'sizeChart' && styles.activeTabText,
                ]}
              >
                Size Chart
              </Text>
              {activeTab === 'sizeChart' && <View style={styles.tabUnderline} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'howToMeasure' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('howToMeasure')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'howToMeasure' && styles.activeTabText,
                ]}
              >
                How To Measure
              </Text>
              {activeTab === 'howToMeasure' && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {activeTab === 'sizeChart' ? renderSizeChart() : renderHowToMeasure()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    maxHeight: height * 0.8,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FontFamilies.montserratMedium,
    color: Colors.black,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 51,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: Colors.white,
  },
  tabText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserratMedium,
    color: Colors.black,
  },
  activeTabText: {
    fontFamily: FontFamilies.montserratSemiBold,
    color: Colors.black,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: Colors.black,
    width: '88%',
    borderRadius: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  sizeChartContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  unitSelectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    height: 45,
  },
  unitSelectionLabel: {
    fontSize: 14,
    fontFamily: FontFamilies.montserratRegular,
    color: Colors.black,
  },
  unitToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
    width: 80,
    height: 30,
    position: 'relative',
  },
  unitOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  unitOptionActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: Colors.black,
  },
  unitOptionActiveSelected: {
    backgroundColor: Colors.black,
  },
  unitOptionInactive: {
    backgroundColor: 'transparent',
  },
  unitText: {
    fontSize: 12,
    fontFamily: FontFamilies.montserratRegular,
    color: Colors.black,
  },
  unitTextActive: {
    fontSize: 12,
    fontFamily: FontFamilies.montserratSemiBold,
    color: Colors.white,
  },
  unitTextActiveSelected: {
    color: Colors.white,
  },
  unitTextInactive: {
    color: Colors.black,
  },
  tableContainer: {
    marginTop: 0,
    backgroundColor: Colors.white,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 13,
    fontFamily: FontFamilies.montserratSemiBold,
    color: Colors.white,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  tableCellText: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamilies.montserratRegular,
    color: Colors.black,
    textAlign: 'left',
  },
  howToMeasureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserratMedium,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default FavouritesSizeChartReference;
