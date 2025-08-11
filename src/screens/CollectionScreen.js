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

const PlusIcon = () => (
  <View style={styles.plusIconContainer}>
    <View style={styles.plusHorizontal} />
    <View style={styles.plusVertical} />
  </View>
);

const HeartIcon = ({ filled = false }) => (
  <View style={styles.heartIconContainer}>
    <View style={[styles.heartLeft, filled && styles.heartFilled]} />
    <View style={[styles.heartRight, filled && styles.heartFilled]} />
    <View style={[styles.heartBottom, filled && styles.heartFilled]} />
  </View>
);

// Sample collection data
const SAMPLE_COLLECTIONS = [
  {
    id: '1',
    name: 'Summer Vibes',
    itemCount: 12,
    thumbnail: null,
    color: '#FFE5E5',
  },
  {
    id: '2',
    name: 'Vintage Classics',
    itemCount: 8,
    thumbnail: null,
    color: '#E5F2FF',
  },
  {
    id: '3',
    name: 'Street Style',
    itemCount: 15,
    thumbnail: null,
    color: '#E5FFE5',
  },
  {
    id: '4',
    name: 'Evening Wear',
    itemCount: 6,
    thumbnail: null,
    color: '#FFF5E5',
  },
];

const SAMPLE_ITEMS = [
  {
    id: '1',
    name: 'Floral Summer Dress',
    brand: 'YORAA',
    price: '$89',
    image: null,
    category: 'dresses',
  },
  {
    id: '2',
    name: 'Vintage Denim Jacket',
    brand: 'Classic Co.',
    price: '$125',
    image: null,
    category: 'jackets',
  },
  {
    id: '3',
    name: 'Silk Blouse',
    brand: 'Elegant',
    price: '$68',
    image: null,
    category: 'tops',
  },
  {
    id: '4',
    name: 'High-waisted Jeans',
    brand: 'Denim Plus',
    price: '$92',
    image: null,
    category: 'bottoms',
  },
];

const CATEGORIES = ['All', 'Dresses', 'Tops', 'Bottoms', 'Jackets', 'Accessories'];

const CollectionScreen = () => {
  const [activeTab, setActiveTab] = useState('Collections');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity style={styles.collectionCard}>
      <View style={[styles.collectionThumbnail, { backgroundColor: item.color }]}>
        <View style={styles.collectionPlaceholder}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.imagePlaceholderSmall} />
        </View>
      </View>
      <View style={styles.collectionInfo}>
        <Text style={styles.collectionName}>{item.name}</Text>
        <Text style={styles.collectionCount}>{item.itemCount} items</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItemCard = ({ item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImagePlaceholder}>
          <View style={styles.itemPlaceholderIcon} />
        </View>
        <TouchableOpacity style={styles.heartButton}>
          <HeartIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.activeCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.activeCategoryText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Collection</Text>
        <TouchableOpacity style={styles.iconButton}>
          <SearchIcon />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search collections & items..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Collections' && styles.activeTab]}
          onPress={() => setActiveTab('Collections')}
        >
          <Text style={[styles.tabText, activeTab === 'Collections' && styles.activeTabText]}>
            Collections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Items' && styles.activeTab]}
          onPress={() => setActiveTab('Items')}
        >
          <Text style={[styles.tabText, activeTab === 'Items' && styles.activeTabText]}>
            All Items
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'Collections' ? (
          <View style={styles.collectionsContainer}>
            {/* Create New Collection Button */}
            <TouchableOpacity style={styles.createCollectionButton}>
              <PlusIcon />
              <Text style={styles.createCollectionText}>Create New Collection</Text>
            </TouchableOpacity>

            {/* Collections Grid */}
            <FlatList
              data={SAMPLE_COLLECTIONS}
              renderItem={renderCollectionItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.collectionRow}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            {/* Category Filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {CATEGORIES.map(renderCategoryButton)}
            </ScrollView>

            {/* Items Grid */}
            <FlatList
              data={SAMPLE_ITEMS}
              renderItem={renderItemCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.itemRow}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
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
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: '#000000',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    ...Shadows.small,
  },
  tabText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: FontWeights.semiBold,
  },
  content: {
    flex: 1,
  },
  collectionsContainer: {
    paddingHorizontal: Spacing.xl,
  },
  createCollectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 2,
    borderColor: '#000000',
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  createCollectionText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
  },
  collectionRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  collectionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  collectionThumbnail: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionPlaceholder: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  imagePlaceholder: {
    width: 40,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: BorderRadius.sm,
  },
  imagePlaceholderSmall: {
    width: 24,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: BorderRadius.sm,
  },
  collectionInfo: {
    padding: Spacing.lg,
  },
  collectionName: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  collectionCount: {
    fontSize: FontSizes.sm,
    color: '#666666',
  },
  itemsContainer: {
    paddingHorizontal: Spacing.xl,
  },
  categoryContainer: {
    marginBottom: Spacing.xl,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.xl,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeCategoryButton: {
    backgroundColor: '#000000',
  },
  categoryText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: FontWeights.semiBold,
  },
  itemRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemImageContainer: {
    position: 'relative',
  },
  itemImagePlaceholder: {
    height: 180,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemPlaceholderIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#E0E0E0',
    borderRadius: BorderRadius.md,
  },
  heartButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  itemInfo: {
    padding: Spacing.lg,
  },
  itemBrand: {
    fontSize: FontSizes.sm,
    color: '#666666',
    marginBottom: Spacing.xs,
  },
  itemName: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: '#000000',
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
  plusIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusHorizontal: {
    width: 16,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
  },
  plusVertical: {
    width: 2,
    height: 16,
    backgroundColor: '#000000',
    position: 'absolute',
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
});

export default CollectionScreen;
