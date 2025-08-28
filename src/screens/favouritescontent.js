import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Colors, FontFamilies } from '../constants';
import HeartFilledIcon from '../assets/icons/HeartFilledIcon';
import GlobalBackButton from '../components/GlobalBackButton';
import { useFavorites } from '../contexts/FavoritesContext';

const FavouritesContent = ({ navigation }) => {
  const { favorites, getFavoritesCount } = useFavorites();

  // Navigate back to empty favorites screen if no favorites left
  useEffect(() => {
    if (getFavoritesCount() === 0) {
      navigation.goBack();
    }
  }, [getFavoritesCount, navigation]);

  // Mock product data - in a real app, you would fetch full product details based on IDs
  const allProducts = [
    {
      id: '1',
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
    {
      id: '2', 
      name: 'Air Jordan 1 Mid',
      price: 'US$125',
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
    {
      id: '3',
      name: 'Air Jordan 1 Mid', 
      price: 'US$125',
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
    {
      id: '4',
      name: 'Air Jordan 1 Mid',
      price: 'US$125', 
      colors: ['#FFFFFF', '#F5F5F5'],
      image: null,
    },
  ];

  // Filter products to show only favorited ones
  const favouritedProducts = allProducts.filter(product => 
    favorites.has(product.id)
  );

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const handleEditPress = () => {
    navigation.navigate('FavouritesContentEditView');
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailsMain', { 
      product, 
      previousScreen: 'FavouritesContent' 
    });
  };

  const renderProductItem = ({ item, index }) => {
    const isLeftColumn = index % 2 === 0;
    
    return (
      <View style={[
        styles.productContainer,
        isLeftColumn ? styles.leftProduct : styles.rightProduct
      ]}>
        {/* Product Image */}
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => handleProductPress(item)}
        >
          <View style={styles.imagePlaceholder} />
        </TouchableOpacity>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <GlobalBackButton />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourites</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditPress}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <View style={styles.content}>
        {favouritedProducts.length > 0 ? (
          <FlatList
            data={favouritedProducts}
            renderItem={renderProductItem}
            numColumns={2}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.row}
          />
        ) : (
          // Empty state
          <View style={styles.emptyContainer}>
            <View style={styles.heartIconCircle}>
              <HeartFilledIcon color="#14142B" />
            </View>
            <Text style={styles.emptyText}>
              Your <Text style={styles.boldText}>Favourites</Text> is empty.
            </Text>
            <Text style={styles.descriptionText}>
              When you add products, they'll appear here.
            </Text>
            <TouchableOpacity 
              style={styles.addFavouritesButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Add Favourites Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.4,
    flex: 1,
  },
  editButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    letterSpacing: -0.4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  productContainer: {
    width: '48%',
  },
  leftProduct: {
    marginRight: 8,
  },
  rightProduct: {
    marginLeft: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  productInfo: {
    paddingHorizontal: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.black,
    lineHeight: 20,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heartIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserrat,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.384,
    lineHeight: 24,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: '400',
    fontFamily: FontFamilies.montserrat,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamilies.montserrat,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.384,
    lineHeight: 24,
    marginBottom: 40,
  },
  addFavouritesButton: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FontFamilies.montserrat,
    color: Colors.white,
    lineHeight: 19.2,
  },
});

export default FavouritesContent;
