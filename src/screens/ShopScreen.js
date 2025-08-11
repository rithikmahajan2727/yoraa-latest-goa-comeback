import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

// Icon Components
const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    <View style={styles.searchCircle} />
    <View style={styles.searchHandle} />
  </View>
);

const FilterIcon = () => (
  <View style={styles.filterIconContainer}>
    <View style={styles.filterLine1} />
    <View style={styles.filterLine2} />
    <View style={styles.filterLine3} />
  </View>
);

const HeartIcon = ({ filled = false }) => (
  <View style={styles.heartIconContainer}>
    <View style={[styles.heartLeft, filled && styles.heartFilled]} />
    <View style={[styles.heartRight, filled && styles.heartFilled]} />
    <View style={[styles.heartBottom, filled && styles.heartFilled]} />
  </View>
);

const CartIcon = () => (
  <View style={styles.cartIconContainer}>
    <View style={styles.cartBody} />
    <View style={styles.cartHandle} />
    <View style={styles.cartWheel1} />
    <View style={styles.cartWheel2} />
  </View>
);

// Sample data
const CATEGORIES = [
  { id: '1', name: 'All', icon: '🏷️' },
  { id: '2', name: 'Dresses', icon: '👗' },
  { id: '3', name: 'Tops', icon: '👕' },
  { id: '4', name: 'Bottoms', icon: '👖' },
  { id: '5', name: 'Shoes', icon: '👠' },
  { id: '6', name: 'Bags', icon: '👜' },
];

const FEATURED_BRANDS = [
  { id: '1', name: 'YORAA', logo: null, color: '#FFE5E5' },
  { id: '2', name: 'Chic Co.', logo: null, color: '#E5F2FF' },
  { id: '3', name: 'Urban Style', logo: null, color: '#E5FFE5' },
  { id: '4', name: 'Elegance', logo: null, color: '#FFF5E5' },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Summer Floral Dress',
    brand: 'YORAA',
    price: '$89',
    originalPrice: '$120',
    discount: '25%',
    rating: 4.8,
    reviews: 124,
    image: null,
    isNew: true,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Casual Denim Jacket',
    brand: 'Urban Style',
    price: '$125',
    originalPrice: null,
    discount: null,
    rating: 4.6,
    reviews: 89,
    image: null,
    isNew: false,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Silk Blouse',
    brand: 'Elegance',
    price: '$68',
    originalPrice: '$85',
    discount: '20%',
    rating: 4.9,
    reviews: 201,
    image: null,
    isNew: false,
    isFavorite: false,
  },
  {
    id: '4',
    name: 'High-waisted Jeans',
    brand: 'Chic Co.',
    price: '$92',
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 156,
    image: null,
    isNew: true,
    isFavorite: false,
  },
];

const ShopScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set(['2']));

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.activeCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.activeCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity style={styles.brandCard}>
      <View style={[styles.brandLogo, { backgroundColor: item.color }]}>
        <View style={styles.brandLogoPlaceholder}>
          <Text style={styles.brandLogoText}>{item.name.charAt(0)}</Text>
        </View>
      </View>
      <Text style={styles.brandName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity style={[styles.productCard, index % 2 === 0 ? styles.leftProduct : styles.rightProduct]}>
      {item.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <View style={styles.productPlaceholderIcon} />
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIcon filled={favorites.has(item.id)} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            <Text style={styles.starText}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewText}>({item.reviews})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Shop</Text>
          <Text style={styles.subtitle}>Find your perfect style</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <CartIcon />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={'#999999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Brands */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Brands</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={FEATURED_BRANDS}
            renderItem={renderBrandItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsList}
          />
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={PRODUCTS}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: '#666666',
  },
  cartButton: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: '#000000',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#000000',
  },
  seeAllText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  categoriesList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.xl,
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeCategoryItem: {
    backgroundColor: '#000000',
  },
  categoryIcon: {
    fontSize: FontSizes.xl,
    marginBottom: Spacing.xs,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: FontWeights.semiBold,
  },
  brandsList: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  brandCard: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  brandLogo: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  brandLogoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogoText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#000000',
  },
  brandName: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  productsList: {
    paddingHorizontal: Spacing.xl,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.small,
    position: 'relative',
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  leftProduct: {
    marginRight: Spacing.md / 2,
  },
  rightProduct: {
    marginLeft: Spacing.md / 2,
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: '#000000',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    zIndex: 1,
  },
  newBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: '#000000',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    zIndex: 1,
  },
  discountText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },
  productImageContainer: {
    position: 'relative',
  },
  productImagePlaceholder: {
    height: 200,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPlaceholderIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: BorderRadius.md,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  productInfo: {
    padding: Spacing.lg,
  },
  productBrand: {
    fontSize: FontSizes.sm,
    color: '#666666',
    marginBottom: Spacing.xs,
  },
  productName: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  starText: {
    fontSize: FontSizes.sm,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  reviewText: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  currentPrice: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#000000',
  },
  originalPrice: {
    fontSize: FontSizes.md,
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  
  // Icon Styles
  searchIconContainer: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  searchCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#999999',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 6,
    height: 2,
    backgroundColor: '#999999',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  filterIconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'space-between',
  },
  filterLine1: {
    height: 2,
    backgroundColor: '#999999',
    borderRadius: 1,
    width: '100%',
  },
  filterLine2: {
    height: 2,
    backgroundColor: '#999999',
    borderRadius: 1,
    width: '70%',
  },
  filterLine3: {
    height: 2,
    backgroundColor: '#999999',
    borderRadius: 1,
    width: '85%',
  },
  heartIconContainer: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  heartLeft: {
    width: 6,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#999999',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 0,
    position: 'absolute',
    left: 2,
    top: 2,
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    width: 6,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#999999',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 0,
    position: 'absolute',
    right: 2,
    top: 2,
    transform: [{ rotate: '45deg' }],
  },
  heartBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#999999',
    position: 'absolute',
    bottom: 2,
    left: 2,
  },
  heartFilled: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  cartIconContainer: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  cartBody: {
    width: 16,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'absolute',
    bottom: 4,
    left: 2,
  },
  cartHandle: {
    width: 10,
    height: 6,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999999',
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    top: 0,
    left: 5,
  },
  cartWheel1: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#999999',
    position: 'absolute',
    bottom: 0,
    left: 4,
  },
  cartWheel2: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#999999',
    position: 'absolute',
    bottom: 0,
    right: 4,
  },
});

export default ShopScreen;
