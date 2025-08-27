import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';
import BottomNavigationBar from '../components/bottomnavigationbar';
import BagQuantitySelectorModalOverlay from './bagquantityselectormodaloverlay';

const BagScreen = ({ navigation }) => {
  const [promoCodeExpanded, setPromoCodeExpanded] = useState(false);
  const [pointsApplied, setPointsApplied] = useState(false);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample bag items data
  const bagItems = [
    {
      id: 1,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null, // Placeholder - you can add actual product images later
    },
    {
      id: 2,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
    {
      id: 3,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
    {
      id: 4,
      name: 'Nike Everyday Plus Cushioned',
      description: 'Training Ankle Socks (6 Pairs)\nSize L (W 10-13 / M 8-12)',
      price: 'US$10.00',
      quantity: 1,
      size: 'M',
      image: null,
    },
  ];

  const deliveryInfo = {
    dateRange: 'Wed, 11 May to Fri, 13 May',
    location: 'Edit Location',
  };

  const priceBreakdown = {
    delivery: 'Standard - Free',
    internationalDelivery: 'Standard - $200',
    promo: 'US$1.0',
    pointsDiscount: 'US$1.0',
    total: 'US$10.00',
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Handle quantity change logic
    if (newQuantity === 0) {
      // Remove item from bag
      console.log(`Removing item ${itemId} from bag`);
      // Here you would typically update your state to remove the item
    } else {
      console.log(`Changing quantity for item ${itemId} to ${newQuantity}`);
      // Here you would typically update your state with the new quantity
    }
  };

  const handleOpenQuantityModal = (item) => {
    setSelectedItem(item);
    setQuantityModalVisible(true);
  };

  const handleCloseQuantityModal = () => {
    setQuantityModalVisible(false);
    setSelectedItem(null);
  };

  const handleSizeChange = (itemId, newSize) => {
    // Handle size change logic
    console.log(`Changing size for item ${itemId} to ${newSize}`);
  };

  const handleCheckout = () => {
    // Navigate to delivery options
    navigation.navigate('DeliveryOptionsStepOneScreen');
  };

  const togglePromoCode = () => {
    setPromoCodeExpanded(!promoCodeExpanded);
  };

  const togglePoints = () => {
    setPointsApplied(!pointsApplied);
  };

  const BagItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.productRow}>
        <View style={styles.productImageContainer}>
          <View style={styles.productImagePlaceholder}>
            {/* Add your product image here */}
            <Text style={styles.imagePlaceholderText}>IMG</Text>
          </View>
        </View>
        <View style={styles.productDetailsContainer}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.productActionsContainer}>
        <TouchableOpacity 
          style={styles.quantityContainer}
          onPress={() => handleOpenQuantityModal(item)}
        >
          <Text style={styles.quantityText}>Qty {item.quantity}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeText}>{item.size}</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  const PromoCodeSection = () => (
    <View style={styles.voucherContainer}>
      <View style={styles.voucherCard}>
        <View style={styles.voucherContent}>
          <Text style={styles.voucherTitle}>30% OFF</Text>
          <Text style={styles.voucherCode}>COUPON30</Text>
          <Text style={styles.voucherDate}>08/08/2023 - 12/08/2023</Text>
          <View style={styles.voucherDivider} />
          <TouchableOpacity style={styles.voucherApplyButton}>
            <Text style={styles.voucherApplyText}>Apply</Text>
          </TouchableOpacity>
        </View>
        {/* Voucher perforated edges - simplified for React Native */}
        <View style={styles.voucherLeftEdge} />
        <View style={styles.voucherRightEdge} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bag</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Bag Items */}
        {bagItems.map((item, index) => (
          <BagItem key={item.id} item={item} />
        ))}

        {/* Delivery Information */}
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryTitle}>Delivery</Text>
          <Text style={styles.deliveryDate}>Arrives {deliveryInfo.dateRange}</Text>
          <View style={styles.deliveryLocationContainer}>
            <Text style={styles.deliveryLocationText}>to Fri, 13 May</Text>
            <TouchableOpacity>
              <Text style={styles.editLocationText}>{deliveryInfo.location}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Apply Points Section */}
        <View style={styles.applyPointsContainer}>
          <View style={styles.pointsRow}>
            <TouchableOpacity 
              style={styles.pointsCheckbox}
              onPress={togglePoints}
            >
              {pointsApplied && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <View style={styles.pointsIcon}>
              <Text style={styles.pointsIconText}>⚡</Text>
            </View>
            <Text style={styles.pointsText}>Apply Points</Text>
          </View>
          <Text style={styles.availablePoints}>Available Points: 100</Text>
        </View>

        {/* Promo Code Section */}
        <TouchableOpacity 
          style={styles.promoToggleContainer}
          onPress={togglePromoCode}
        >
          <Text style={styles.promoToggleText}>Have a Promo Code?</Text>
          <Text style={styles.promoToggleIcon}>+</Text>
        </TouchableOpacity>

        {promoCodeExpanded && <PromoCodeSection />}

        {/* Price Breakdown */}
        <View style={styles.priceBreakdownContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>{priceBreakdown.delivery}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>International Delivery</Text>
            <Text style={styles.priceValue}>{priceBreakdown.internationalDelivery}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Promo</Text>
            <Text style={styles.priceValue}>{priceBreakdown.promo}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Points Discount</Text>
            <Text style={styles.priceValue}>{priceBreakdown.pointsDiscount}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{priceBreakdown.total}</Text>
          </View>
        </View>

        {/* Payment Icons */}
        <View style={styles.paymentIconsContainer}>
          <View style={styles.paymentIconsRow}>
            {/* Simplified representation of payment method icons */}
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <View style={styles.paymentIcon} />
            <Text style={styles.codText}>COD</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigationBar activeTab="Home" />

      {/* Quantity Selector Modal */}
      <BagQuantitySelectorModalOverlay
        visible={quantityModalVisible}
        onClose={handleCloseQuantityModal}
        item={selectedItem}
        onQuantityChange={handleQuantityChange}
      />
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
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 68,
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  headerRight: {
    width: 68,
  },
  scrollContainer: {
    flex: 1,
  },
  productContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  productRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  productImageContainer: {
    flex: 1,
  },
  productImagePlaceholder: {
    height: 154,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#999999',
    fontSize: 16,
  },
  productDetailsContainer: {
    flex: 1,
    paddingTop: 4,
  },
  productInfo: {
    gap: 3,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.14,
    lineHeight: 16.8,
  },
  productDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    letterSpacing: -0.14,
    lineHeight: 16.8,
  },
  productActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
  },
  dropdownButton: {
    padding: 4,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#000000',
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right',
    lineHeight: 19.2,
  },
  deliveryContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
  },
  deliveryDate: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  deliveryLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryLocationText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  editLocationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textDecorationLine: 'underline',
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  applyPointsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  pointsCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#111111',
  },
  pointsIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsIconText: {
    fontSize: 16,
    color: '#848688',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  availablePoints: {
    fontSize: 10,
    fontWeight: '400',
    color: '#6C6C6C',
    lineHeight: 12,
    marginLeft: 32,
  },
  promoToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },
  promoToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
  },
  promoToggleIcon: {
    fontSize: 14,
    color: '#000000',
  },
  // Replace the old promo code styles with voucher styles
  voucherContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  voucherCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    height: 137,
    position: 'relative',
    overflow: 'hidden',
  },
  voucherContent: {
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
  },
  voucherTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 30,
  },
  voucherCode: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6C6C6C',
    position: 'absolute',
    left: 24,
    bottom: 49,
  },
  voucherDate: {
    fontSize: 10,
    fontWeight: '400',
    color: '#6C6C6C',
    position: 'absolute',
    top: 16,
    right: 24,
  },
  voucherDivider: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: '50%',
    height: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'dashed',
    marginTop: 16.5,
  },
  voucherApplyButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -23.5 }],
  },
  voucherApplyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7F7F7F',
  },
  voucherLeftEdge: {
    position: 'absolute',
    left: -8,
    top: '50%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginTop: -8,
  },
  voucherRightEdge: {
    position: 'absolute',
    right: -8,
    top: '50%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginTop: -8,
  },
  priceBreakdownContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#767676',
    letterSpacing: -0.4,
    lineHeight: 16,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#767676',
    textAlign: 'right',
    letterSpacing: -0.32,
    lineHeight: 16,
  },
  totalRow: {
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 19.2,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right',
    lineHeight: 19.2,
  },
  paymentIconsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  paymentIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentIcon: {
    width: 24,
    height: 14,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
  },
  codText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#848688',
    letterSpacing: -0.25,
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 120,
  },
  checkoutContainer: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  checkoutButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 19.2,
  },
});

export default BagScreen;
