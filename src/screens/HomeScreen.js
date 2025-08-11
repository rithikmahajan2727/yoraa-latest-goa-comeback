import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '1', name: 'Tops', icon: '👕' },
    { id: '2', name: 'Bottoms', icon: '👖' },
    { id: '3', name: 'Dresses', icon: '👗' },
    { id: '4', name: 'Shoes', icon: '👠' },
    { id: '5', name: 'Accessories', icon: '👜' },
  ];

  const featuredProducts = [
    { id: '1', name: 'Summer Dress', price: '$89', image: null, brand: 'YORAA' },
    { id: '2', name: 'Casual Jeans', price: '$65', image: null, brand: 'Denim Co' },
    { id: '3', name: 'Silk Blouse', price: '$120', image: null, brand: 'Elegance' },
  ];

  const trendingItems = [
    { id: '1', name: 'Vintage Tee', price: '$45', discount: '20%', image: null },
    { id: '2', name: 'Leather Jacket', price: '$199', discount: '15%', image: null },
    { id: '3', name: 'Floral Skirt', price: '$75', discount: '30%', image: null },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImage}>
        <Text style={styles.productImagePlaceholder}>👕</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity style={styles.trendingCard}>
      <View style={styles.trendingImage}>
        <Text style={styles.trendingImagePlaceholder}>🔥</Text>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
      <Text style={styles.trendingName}>{item.name}</Text>
      <Text style={styles.trendingPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good Morning! 👋</Text>
            <Text style={styles.userName}>Welcome to YORAA</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search fashion, brands, styles..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Try Before You Buy</Text>
          <Text style={styles.heroSubtitle}>Virtual fitting room now available</Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Explore AR Try-On</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.heroImageContainer}>
          <Text style={styles.heroImage}>👗</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredProducts}
          renderItem={renderFeaturedProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
      </View>

      {/* Trending Now */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={trendingItems}
          renderItem={renderTrendingItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingList}
        />
      </View>

      {/* Collections Banner */}
      <View style={styles.collectionsBanner}>
        <Text style={styles.collectionsTitle}>New Collections</Text>
        <Text style={styles.collectionsSubtitle}>Discover our latest curated fashion collections</Text>
        <TouchableOpacity style={styles.collectionsButton}>
          <Text style={styles.collectionsButtonText}>Browse Collections</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Header Styles
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: FontSizes.lg,
  },

  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchIcon: {
    fontSize: FontSizes.lg,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: FontSizes.lg,
    color: Colors.background,
  },

  // Hero Banner Styles
  heroBanner: {
    backgroundColor: Colors.primaryLighter,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  heroButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: Colors.background,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
  },
  heroImageContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  heroImage: {
    fontSize: 40,
  },

  // Section Styles
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },

  // Categories Styles
  categoriesList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryEmoji: {
    fontSize: FontSizes.xxl,
  },
  categoryName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: FontWeights.medium,
  },

  // Product Card Styles
  productsList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  productCard: {
    width: 160,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  productImagePlaceholder: {
    fontSize: FontSizes.xxxl,
  },
  productInfo: {
    gap: Spacing.xs,
  },
  productBrand: {
    fontSize: FontSizes.xs,
    color: Colors.textTertiary,
    fontWeight: FontWeights.medium,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.medium,
  },
  productPrice: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },

  // Trending Styles
  trendingList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  trendingCard: {
    width: 140,
    alignItems: 'flex-start',
  },
  trendingImage: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  trendingImagePlaceholder: {
    fontSize: FontSizes.xxl,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    color: Colors.background,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
  },
  trendingName: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  trendingPrice: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },

  // Collections Banner Styles
  collectionsBanner: {
    backgroundColor: Colors.textPrimary,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  collectionsTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.background,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  collectionsSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.backgroundSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  collectionsButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  collectionsButtonText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
  },

  // Utility Styles
  bottomSpacing: {
    height: Spacing.xxl,
  },
});

export default HomeScreen;
