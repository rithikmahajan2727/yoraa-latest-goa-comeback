import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

// Mock order data - in a real app, this would come from an API
const mockOrders = [
  {
    id: '1',
    orderNumber: '#YR001',
    date: '2024-08-10',
    status: 'delivered',
    total: 189.99,
    itemCount: 2,
    estimatedDelivery: '2024-08-12',
    items: [
      {
        id: '1',
        name: 'Floral Summer Dress',
        brand: 'YORAA',
        size: 'M',
        color: 'Rose Pink',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      },
      {
        id: '2',
        name: 'Leather Crossbody Bag',
        brand: 'YORAA',
        size: 'One Size',
        color: 'Black',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      }
    ]
  },
  {
    id: '2',
    orderNumber: '#YR002',
    date: '2024-08-08',
    status: 'shipped',
    total: 259.99,
    itemCount: 1,
    estimatedDelivery: '2024-08-15',
    trackingNumber: 'TR1234567890',
    items: [
      {
        id: '3',
        name: 'Designer Evening Gown',
        brand: 'YORAA Premium',
        size: 'S',
        color: 'Midnight Blue',
        price: 259.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1566479179817-c9ecf6c3e47b?w=400&h=400&fit=crop',
      }
    ]
  },
  {
    id: '3',
    orderNumber: '#YR003',
    date: '2024-08-05',
    status: 'processing',
    total: 149.99,
    itemCount: 3,
    estimatedDelivery: '2024-08-18',
    items: [
      {
        id: '4',
        name: 'Casual Blouse',
        brand: 'YORAA',
        size: 'L',
        color: 'White',
        price: 49.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1564257577154-75bf45bb30dc?w=400&h=400&fit=crop',
      },
      {
        id: '5',
        name: 'Wide-leg Trousers',
        brand: 'YORAA',
        size: 'M',
        color: 'Navy',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      }
    ]
  },
  {
    id: '4',
    orderNumber: '#YR004',
    date: '2024-08-02',
    status: 'cancelled',
    total: 79.99,
    itemCount: 1,
    items: [
      {
        id: '6',
        name: 'Vintage T-Shirt',
        brand: 'YORAA Basics',
        size: 'M',
        color: 'Grey',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      }
    ]
  }
];

const getStatusText = (status) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'shipped':
      return 'Shipped';
    case 'processing':
      return 'Processing';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const OrderStatusIndicator = ({ status }) => {
  const statusConfig = {
    delivered: { icon: '✓', color: '#000000', bg: '#F5F5F5' },
    shipped: { icon: '🚚', color: '#333333', bg: '#E8E8E8' },
    processing: { icon: '⏳', color: '#666666', bg: '#F0F0F0' },
    cancelled: { icon: '✕', color: '#999999', bg: '#F8F8F8' },
  };
  
  const config = statusConfig[status] || statusConfig.processing;
  
  return (
    <View style={[styles.statusIndicator, { backgroundColor: config.bg }]}>
      <Text style={[styles.statusIcon, { color: config.color }]}>{config.icon}</Text>
      <Text style={[styles.statusLabel, { color: config.color }]}>
        {getStatusText(status)}
      </Text>
    </View>
  );
};

const OrderCard = ({ order, onPress }) => (
  <TouchableOpacity style={styles.orderCard} onPress={() => onPress(order)} activeOpacity={0.7}>
    {/* Order Header */}
    <View style={styles.orderCardHeader}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
      </View>
      <OrderStatusIndicator status={order.status} />
    </View>

    {/* Main Item Preview */}
    <View style={styles.mainItemContainer}>
      <Image source={{ uri: order.items[0].image }} style={styles.mainItemImage} />
      <View style={styles.mainItemDetails}>
        <Text style={styles.mainItemName} numberOfLines={1}>{order.items[0].name}</Text>
        <Text style={styles.mainItemBrand}>{order.items[0].brand}</Text>
        <Text style={styles.mainItemSpecs}>
          {order.items[0].size} • {order.items[0].color}
        </Text>
        {order.itemCount > 1 && (
          <Text style={styles.additionalItems}>+{order.itemCount - 1} more item{order.itemCount - 1 > 1 ? 's' : ''}</Text>
        )}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.orderTotal}>${order.total}</Text>
        {order.status === 'shipped' && order.trackingNumber && (
          <Text style={styles.trackingText}>Track: {order.trackingNumber}</Text>
        )}
      </View>
    </View>

    {/* Order Actions */}
    <View style={styles.orderActions}>
      {order.status === 'delivered' && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Review</Text>
        </TouchableOpacity>
      )}
      {order.status === 'shipped' && (
        <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
          <Text style={[styles.actionButtonText, styles.primaryActionText]}>Track Order</Text>
        </TouchableOpacity>
      )}
      {order.status === 'processing' && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const FilterChip = ({ title, value, isActive, onPress, count }) => (
  <TouchableOpacity
    style={[styles.filterChip, isActive && styles.filterChipActive]}
    onPress={() => onPress(value)}
    activeOpacity={0.7}
  >
    <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
      {title}
    </Text>
    {count > 0 && (
      <View style={[styles.filterCount, isActive && styles.filterCountActive]}>
        <Text style={[styles.filterCountText, isActive && styles.filterCountTextActive]}>
          {count}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const OrderSeparator = () => <View style={styles.orderSeparator} />;

const OrdersScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getFilteredOrders = () => {
    return selectedFilter === 'all' 
      ? mockOrders 
      : mockOrders.filter(order => order.status === selectedFilter);
  };

  const getFilterCounts = () => {
    return {
      all: mockOrders.length,
      processing: mockOrders.filter(order => order.status === 'processing').length,
      shipped: mockOrders.filter(order => order.status === 'shipped').length,
      delivered: mockOrders.filter(order => order.status === 'delivered').length,
      cancelled: mockOrders.filter(order => order.status === 'cancelled').length,
    };
  };

  const filteredOrders = getFilteredOrders();
  const filterCounts = getFilterCounts();

  const handleOrderPress = (order) => {
    // Navigate to order details screen
    console.log('Order pressed:', order.orderNumber);
    // navigation.navigate('OrderDetails', { orderId: order.id });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
      </View>
      <Text style={styles.emptyTitle}>No Orders Found</Text>
      <Text style={styles.emptySubtitle}>
        {selectedFilter === 'all' 
          ? 'You haven\'t placed any orders yet.\nStart shopping to see your orders here!'
          : `No ${selectedFilter} orders found.\nTry selecting a different filter.`
        }
      </Text>
      {selectedFilter === 'all' && (
        <TouchableOpacity style={styles.shopNowButton}>
          <Text style={styles.shopNowText}>Start Shopping</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{mockOrders.length}</Text>
          <Text style={styles.summaryLabel}>Total Orders</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{filterCounts.delivered}</Text>
          <Text style={styles.summaryLabel}>Delivered</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Total Spent</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterScrollContent}
        >
          <FilterChip 
            title="All" 
            value="all" 
            isActive={selectedFilter === 'all'} 
            onPress={setSelectedFilter}
            count={filterCounts.all}
          />
          <FilterChip 
            title="Processing" 
            value="processing" 
            isActive={selectedFilter === 'processing'} 
            onPress={setSelectedFilter}
            count={filterCounts.processing}
          />
          <FilterChip 
            title="Shipped" 
            value="shipped" 
            isActive={selectedFilter === 'shipped'} 
            onPress={setSelectedFilter}
            count={filterCounts.shipped}
          />
          <FilterChip 
            title="Delivered" 
            value="delivered" 
            isActive={selectedFilter === 'delivered'} 
            onPress={setSelectedFilter}
            count={filterCounts.delivered}
          />
          <FilterChip 
            title="Cancelled" 
            value="cancelled" 
            isActive={selectedFilter === 'cancelled'} 
            onPress={setSelectedFilter}
            count={filterCounts.cancelled}
          />
        </ScrollView>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} onPress={handleOrderPress} />}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={OrderSeparator}
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: '#F8F8F8',
  },
  backIcon: {
    fontSize: FontSizes.lg,
    color: '#000000',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: '#F8F8F8',
  },
  searchIcon: {
    fontSize: FontSizes.md,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xs,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  summaryNumber: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    color: '#666666',
    textAlign: 'center',
  },
  filterContainer: {
    paddingVertical: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterScrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterChipText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  filterCount: {
    marginLeft: Spacing.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#E0E0E0',
  },
  filterCountActive: {
    backgroundColor: '#FFFFFF30',
  },
  filterCountText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  filterCountTextActive: {
    color: '#FFFFFF',
  },
  ordersList: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Shadows.small,
  },
  orderSeparator: {
    height: Spacing.md,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  statusIcon: {
    fontSize: FontSizes.sm,
    marginRight: 4,
  },
  statusLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  mainItemContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  mainItemImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  mainItemDetails: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  mainItemName: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: '#000000',
    marginBottom: 2,
  },
  mainItemBrand: {
    fontSize: FontSizes.sm,
    color: '#333333',
    marginBottom: 2,
  },
  mainItemSpecs: {
    fontSize: FontSizes.sm,
    color: '#666666',
    marginBottom: 4,
  },
  additionalItems: {
    fontSize: FontSizes.sm,
    color: '#999999',
    fontStyle: 'italic',
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  orderTotal: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: 2,
  },
  trackingText: {
    fontSize: FontSizes.xs,
    color: '#333333',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  primaryAction: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  actionButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  primaryActionText: {
    color: '#FFFFFF',
  },
  detailsButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  detailsButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  shopNowButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: '#000000',
    borderRadius: BorderRadius.md,
  },
  shopNowText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: '#FFFFFF',
  },
});

export default OrdersScreen;
