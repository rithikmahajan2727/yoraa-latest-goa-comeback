import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import BottomNavigationBar from '../components/bottomnavigationbar';

const ProductViewThree = ({ navigation }) => {
  const [likedProducts, setLikedProducts] = useState(new Set(['1', '3'])); // Some products pre-liked

  // Mock product data for the Pinterest-style layout
  const products = [
    {
      id: '1',
      image: 'product1',
      height: 300,
    },
    {
      id: '2',
      image: 'product2',
      height: 200,
    },
    {
      id: '3',
      image: 'product3',
      height: 280,
    },
    {
      id: '4',
      image: 'product4',
      height: 240,
    },
    {
      id: '5',
      image: 'product5',
      height: 320,
    },
    {
      id: '6',
      image: 'product6',
      height: 260,
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

  // Icon Components
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
      <View style={[styles.gridSquare, { top: 3, left: 5 }]} />
      <View style={[styles.gridSquare, { top: 3, right: 4 }]} />
      <View style={[styles.gridSquare, { bottom: 3, left: 5 }]} />
      <View style={[styles.gridSquare, { bottom: 3, right: 4 }]} />
    </View>
  );

  const FilterIcon = () => (
    <View style={styles.filterIcon}>
      <View style={[styles.filterLine, { top: 3, width: 19 }]} />
      <View style={[styles.filterCircle, { top: 1, right: 2 }]} />
      <View style={[styles.filterLine, { top: 10, width: 12, left: 0 }]} />
      <View style={[styles.filterCircle, { top: 8, left: 12 }]} />
      <View style={[styles.filterLine, { bottom: 3, width: 16, right: 0 }]} />
      <View style={[styles.filterCircle, { bottom: 5, left: 12 }]} />
    </View>
  );

  const HeartIcon = ({ filled = false }) => (
    <View style={styles.heartIcon}>
      {filled ? (
        <View style={styles.heartFilled} />
      ) : (
        <View style={styles.heartOutline} />
      )}
    </View>
  );

  const ShoppingBagIcon = () => (
    <View style={styles.bagIcon}>
      <View style={styles.bagBody} />
      <View style={styles.bagHandle} />
    </View>
  );

  const renderProduct = (product, index) => {
    const isLiked = likedProducts.has(product.id);
    
    return (
      <View 
        key={product.id} 
        style={[
          styles.productContainer,
          { height: product.height }
        ]}
      >
        {/* Product Image */}
        <TouchableOpacity 
          style={[styles.imageContainer, { height: product.height }]}
          onPress={() => navigation.navigate('ProductDetailsMain', { product, previousScreen: 'ProductViewThree' })}
        >
          <View style={[styles.imagePlaceholder, { height: product.height }]} />
          
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
      </View>
    );
  };

  const renderColumn = (columnProducts) => (
    <View style={styles.column}>
      {columnProducts.map((product, index) => renderProduct(product, index))}
    </View>
  );

  const handleTabChange = (tabName) => {
    if (navigation) {
      navigation.navigate(tabName);
    }
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.navigate('ProductViewTwo');
    }
  };

  const handleGridPress = () => {
    if (navigation) {
      navigation.navigate('ProductViewOne');
    }
  };

  // Split products into two columns for Pinterest-style layout
  const leftColumnProducts = products.filter((_, index) => index % 2 === 0);
  const rightColumnProducts = products.filter((_, index) => index % 2 === 1);

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
          
          <TouchableOpacity style={styles.iconButton} onPress={handleGridPress}>
            <GridIcon />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid - Pinterest Style */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.pinterestGrid}>
          {renderColumn(leftColumnProducts)}
          {renderColumn(rightColumnProducts)}
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
  
  controlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 68,
  },
  
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Icon Styles
  backIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  backArrow: {
    width: 10,
    height: 17,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '-45deg' }],
    marginRight: 4,
  },
  
  searchIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  searchCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#262626',
    marginBottom: 2,
  },
  
  searchHandle: {
    width: 6,
    height: 2,
    backgroundColor: '#262626',
    position: 'absolute',
    bottom: 3,
    right: 3,
    transform: [{ rotate: '45deg' }],
  },
  
  gridIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  
  gridSquare: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderWidth: 1,
    borderColor: '#000000',
  },
  
  filterIcon: {
    width: 26,
    height: 20,
    position: 'relative',
  },
  
  filterLine: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: '#262626',
  },
  
  filterCircle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#262626',
    backgroundColor: '#FFFFFF',
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  
  pinterestGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 100, // Add space for bottom navigation
  },
  
  column: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 4,
  },
  
  productContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  
  imagePlaceholder: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  
  heartButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
  },
  
  heartIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  bagButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    zIndex: 2,
  },
  
  bagIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  heartIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  heartOutline: {
    width: 12,
    height: 11,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  
  heartFilled: {
    width: 12,
    height: 11,
    backgroundColor: '#FF4444',
  },
  
  bagIcon: {
    width: 20,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  bagBody: {
    width: 16,
    height: 14,
    borderWidth: 1,
    borderColor: '#14142B',
    borderTopWidth: 0,
    borderRadius: 2,
    marginTop: 4,
  },
  
  bagHandle: {
    position: 'absolute',
    top: 0,
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#14142B',
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default ProductViewThree;