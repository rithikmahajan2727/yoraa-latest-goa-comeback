import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import BottomNavigationBar from '../components/bottomnavigationbar';

const ProductViewOne = ({ navigation }) => {
  const [likedProducts, setLikedProducts] = useState(new Set(['3', '4'])); // Some products pre-liked

  // Mock product data based on the Figma design
  const products = [
    {
      id: '1',
      name: 'Nike Everyday Plus Cushioned',
      subtitle: 'Training Crew Socks (3 Pairs)',
      price: 'US$22',
      colors: ['#8B4513', '#CD853F', '#F5F5DC'],
    },
    {
      id: '2',
      name: 'Nike Everyday Plus Cushioned',
      subtitle: 'Training Crew Socks (6 Pairs)',
      price: 'US$28',
      colors: ['#F5F5DC', '#DEB887', '#D2691E', '#8B4513'],
    },
    {
      id: '3',
      name: 'Nike Elite Crew',
      subtitle: 'Basketball Socks',
      price: 'US$16',
      colors: ['#000000'],
    },
    {
      id: '4',
      name: 'Nike Everyday Plus Cushioned',
      subtitle: 'Training Ankle Socks (6 Pairs)',
      price: 'US$28',
      colors: ['#F5F5DC', '#DEB887', '#D2691E', '#8B4513'],
    },
  ];

  const toggleLike = (productId) => {
    const newLikedProducts = new Set(likedProducts);
    if (newLikedProducts.has(productId)) {
      newLikedProducts.delete(productId);
    } else {
      newLikedProducts.add(productId);
    }
    setLikedProducts(newLikedProducts);
  };

  const BackIcon = () => (
    <View style={styles.backIcon}>
      <View style={styles.backArrow} />
    </View>
  );

  const SearchIcon = () => (
    <View style={styles.searchIcon}>
      <View style={styles.searchCircle} />
      <View style={styles.searchHandle} />
    </View>
  );

  const GridIcon = () => (
    <View style={styles.gridIcon}>
      <View style={[styles.gridSquare, styles.topLeft]} />
      <View style={[styles.gridSquare, styles.topRight]} />
      <View style={[styles.gridSquare, styles.bottomLeft]} />
      <View style={[styles.gridSquare, styles.bottomRight]} />
    </View>
  );

  const FilterIcon = () => (
    <View style={styles.filterIcon}>
      <View style={styles.filterDot1} />
      <View style={styles.filterLine1} />
      <View style={styles.filterDot2} />
      <View style={styles.filterLine2} />
      <View style={styles.filterDot3} />
      <View style={styles.filterLine3} />
    </View>
  );

  const HeartIcon = ({ filled = false }) => (
    <View style={styles.heartIcon}>
      <View style={[styles.heartShape, filled && styles.heartFilled]} />
    </View>
  );

  const ShoppingBagIcon = () => (
    <View style={styles.bagIcon}>
      <View style={styles.bagBody} />
      <View style={styles.bagHandle} />
    </View>
  );

  const ColorDots = ({ colors }) => (
    <View style={styles.colorDotsContainer}>
      {colors.map((color, index) => (
        <View 
          key={index} 
          style={[styles.colorDot, { backgroundColor: color }]} 
        />
      ))}
    </View>
  );

  const renderProduct = (product, index) => {
    const isLiked = likedProducts.has(product.id);
    const isFirstInRow = index % 2 === 0;
    
    return (
      <View key={product.id} style={[
        styles.productContainer,
        !isFirstInRow && styles.productContainerRight
      ]}>
        {/* Product Image */}
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => navigation.navigate('ProductDetailsMain', { product, previousScreen: 'ProductViewOne' })}
        >
          <View style={styles.imagePlaceholder} />
          
          {/* Heart Icon */}
          <TouchableOpacity 
            style={styles.heartButton}
            onPress={() => toggleLike(product.id)}
          >
            <View style={styles.heartIconContainer}>
              <HeartIcon filled={isLiked} />
            </View>
          </TouchableOpacity>

          {/* Shopping Bag Icon */}
          <TouchableOpacity style={styles.bagButton}>
            <View style={styles.bagIconContainer}>
              <ShoppingBagIcon />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productSubtitle}>{product.subtitle}</Text>
          
          {/* Color Dots */}
          <ColorDots colors={product.colors} />
          
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
      </View>
    );
  };

  const handleTabChange = (tabName) => {
    if (navigation) {
      navigation.navigate(tabName);
    }
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Control Bar / Header */}
      <View style={styles.controlBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}></Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <SearchIcon />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ProductViewTwo')}>
            <GridIcon />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {products.map((product, index) => renderProduct(product, index))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigationBar 
        activeTab="Home" 
        onTabChange={handleTabChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Control Bar / Header Styles
  controlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    height: 90,
  },
  headerLeft: {
    width: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  iconButton: {
    padding: 4,
  },

  // Icon Styles
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 10,
    height: 17,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
    marginRight: 2,
  },

  searchIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  searchCircle: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#262626',
  },
  searchHandle: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 6,
    height: 2,
    backgroundColor: '#262626',
    transform: [{ rotate: '45deg' }],
  },

  gridIcon: {
    width: 30,
    height: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridSquare: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  topLeft: {
    top: 5,
    left: 5,
  },
  topRight: {
    top: 5,
    right: 5,
  },
  bottomLeft: {
    bottom: 5,
    left: 5,
  },
  bottomRight: {
    bottom: 5,
    right: 5,
  },
  
  filterIcon: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterDot1: {
    position: 'absolute',
    top: 3,
    left: 1,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
  },
  filterLine1: {
    position: 'absolute',
    top: 4.5,
    left: 7,
    width: 17,
    height: 1.5,
    backgroundColor: '#262626',
  },
  filterDot2: {
    position: 'absolute',
    top: 11,
    left: 9,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
  },
  filterLine2: {
    position: 'absolute',
    top: 12.5,
    left: 1,
    width: 6,
    height: 1.5,
    backgroundColor: '#262626',
  },
  filterDot3: {
    position: 'absolute',
    top: 19,
    left: 12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
  },
  filterLine3: {
    position: 'absolute',
    top: 20.5,
    left: 1,
    width: 9,
    height: 1.5,
    backgroundColor: '#262626',
  },

  // Content Styles
  content: {
    flex: 1,
    paddingTop: 10,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    paddingBottom: 40,
  },

  // Product Styles
  productContainer: {
    width: 184,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 40,
  },
  productContainerRight: {
    marginLeft: 6,
  },
  
  imageContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  imagePlaceholder: {
    width: 184,
    height: 184,
    backgroundColor: '#EEEEEE',
    borderRadius: 0,
  },
  
  // Icon Buttons on Product
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  heartIconContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  bagButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  bagIconContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Heart Icon
  heartIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartShape: {
    width: 16,
    height: 14,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
  },
  heartFilled: {
    backgroundColor: '#CA3327',
    borderColor: '#CA3327',
  },

  // Shopping Bag Icon
  bagIcon: {
    width: 19,
    height: 19,
    position: 'relative',
  },
  bagBody: {
    position: 'absolute',
    bottom: 0,
    left: 2,
    width: 15,
    height: 13,
    borderWidth: 1,
    borderColor: '#14142B',
    backgroundColor: 'transparent',
  },
  bagHandle: {
    position: 'absolute',
    top: 1,
    left: 5,
    width: 9,
    height: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#14142B',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: 'transparent',
  },

  // Product Info Styles
  productInfo: {
    paddingHorizontal: 14,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    lineHeight: 17,
  },
  productSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    lineHeight: 17,
  },
  
  // Color Dots
  colorDotsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    gap: 4,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.14,
    fontFamily: 'Montserrat-Medium',
    lineHeight: 17,
  },
});

export default ProductViewOne;
