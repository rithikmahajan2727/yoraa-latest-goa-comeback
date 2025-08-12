import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <View style={styles.backArrowContainer}>
    <Text style={styles.backArrowText}>‹</Text>
  </View>
);

// Mock data for invoices with different statuses
const invoiceData = [
  {
    id: 1,
    status: 'delivered',
    statusText: 'Order delivered',
    productName: 'Nike Everyday Plus Cushioned',
    productDetails: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    imageColor: '#F5F5F5', // Light gray
    date: 'Dec 15, 2024',
    orderNumber: 'YOR001234',
    amount: '$24.99',
  },
  {
    id: 2,
    status: 'cancelled',
    statusText: 'Order cancelled',
    productName: 'Nike Everyday Plus Cushioned',
    productDetails: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    imageColor: '#F5F5F5', // Light gray
    date: 'Dec 10, 2024',
    orderNumber: 'YOR001235',
    amount: '$24.99',
  },
  {
    id: 3,
    status: 'exchange',
    statusText: 'Exchange Requested',
    productName: 'Nike Everyday Plus Cushioned',
    productDetails: 'Training Crew Socks Mystic Navy/Worn Blue/Worn Bl...',
    size: 'Size L (W 10-13 / M 8-12)',
    imageColor: '#F5F5F5', // Light gray
    date: 'Dec 8, 2024',
    orderNumber: 'YOR001236',
    amount: '$24.99',
  },
];

const InvoiceScreen = ({ navigation }) => {
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // Animate slide in from right to left with ease in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleViewInvoice = (invoice) => {
    console.log('View Invoice pressed for:', {
      orderNumber: invoice.orderNumber,
      status: invoice.status,
      amount: invoice.amount,
      date: invoice.date
    });
    // Here you would typically navigate to a detailed invoice view
    // or open a modal with invoice details
    // For now, just show an alert or log
    Alert.alert(
      'Invoice Details',
      `Order: ${invoice.orderNumber}\nStatus: ${invoice.statusText}\nAmount: ${invoice.amount}\nDate: ${invoice.date}`,
      [{ text: 'OK' }]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50'; // Green for delivered
      case 'cancelled':
        return '#FF5252'; // Red for cancelled
      case 'exchange':
        return '#FF9800'; // Orange for exchange
      default:
        return '#666666';
    }
  };

  const renderInvoiceItem = (invoice) => (
    <View key={invoice.id} style={styles.invoiceItem}>
      {/* Status Header */}
      <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
        {invoice.statusText}
      </Text>

      {/* Product Content */}
      <View style={styles.productContainer}>
        {/* Product Image */}
        <View style={[styles.imageContainer, { backgroundColor: invoice.imageColor }]}>
          <Text style={styles.imagePlaceholder}>👕</Text>
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{invoice.productName}</Text>
          <Text style={styles.productDescription}>{invoice.productDetails}</Text>
          <Text style={styles.productSize}>{invoice.size}</Text>
        </View>
      </View>

      {/* View Invoice Button */}
      <TouchableOpacity 
        style={styles.viewInvoiceButton}
        onPress={() => handleViewInvoice(invoice)}
        activeOpacity={0.8}
      >
        <Text style={styles.viewInvoiceText}>view Invoice</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.animatedContainer,
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
          <Text style={styles.headerTitle}>Invoice</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {invoiceData.map(renderInvoiceItem)}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  animatedContainer: {
    flex: 1,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerSpacer: {
    width: 40,
  },

  // Content Styles
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  // Invoice Item Styles - Removed card styling
  invoiceItem: {
    backgroundColor: 'transparent',
    marginBottom: 32,
  },

  // Status Styles - Updated positioning
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  // Product Styles
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 24,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
    lineHeight: 22,
  },
  productDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
    lineHeight: 20,
  },
  productSize: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 18,
  },

  // Button Styles - Updated to match Figma
  viewInvoiceButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    minWidth: 140,
  },
  viewInvoiceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default InvoiceScreen;