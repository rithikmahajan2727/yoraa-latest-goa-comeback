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

const ProductViewTwo = ({ navigation }) => {
  const [likedProducts, setLikedProducts] = useState(new Set(['3', '4'])); // Some products pre-liked

  // Mock product data for the 3-column grid layout
  const products = [
    {
      id: '1',
      image: 'chair_jeans1',
    },
    {
      id: '2',
      image: 'orange_jeans',
    },
    {
      id: '3',
      image: 'black_pants1',
    },
    {
      id: '4',
      image: 'chair_jeans2',
    },
    {
      id: '5',
      image: 'orange_jeans2',
    },
    {
      id: '6',
      image: 'black_pants2',
    },
    {
      id: '7',
      image: 'chair_jeans3',
    },
    {
      id: '8',
      image: 'orange_jeans3',
    },
    {
      id: '9',
      image: 'black_pants3',
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

  const renderProduct = (product) => {
    const isLiked = likedProducts.has(product.id);
    
    return (
      <View key={product.id} style={styles.productContainer}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
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
      navigation.navigate('ProductViewOne');
    }
  };

  const handleGridPress = () => {
    if (navigation) {
      navigation.navigate('ProductViewThree');
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
          
          <TouchableOpacity style={styles.iconButton} onPress={handleGridPress}>
            <GridIcon />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid - 3 Columns */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {products.map((product) => renderProduct(product))}
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
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  iconButton: {
    padding: 8,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 2,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },

  // Product Styles
  productContainer: {
    width: '33%', // 3 columns layout
    marginBottom: 2,
    paddingHorizontal: 1,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1, // Square aspect ratio
    backgroundColor: '#F5F5F5',
    borderRadius: 0,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 0,
  },

  // Heart Button
  heartButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  heartIconContainer: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Shopping Bag Button
  bagButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bagIconContainer: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Icons
  backIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    width: 8,
    height: 15,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },

  searchIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#262626',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 6,
    height: 1.5,
    backgroundColor: '#262626',
    position: 'absolute',
    bottom: 2,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },

  gridIcon: {
    width: 22,
    height: 22,
    position: 'relative',
  },
  gridSquare: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#000000',
  },
  topLeft: {
    top: 1,
    left: 1,
  },
  topRight: {
    top: 1,
    right: 1,
  },
  bottomLeft: {
    bottom: 1,
    left: 1,
  },
  bottomRight: {
    bottom: 1,
    right: 1,
  },

  filterIcon: {
    width: 26,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterDot1: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
    left: 2,
    top: 3,
  },
  filterLine1: {
    position: 'absolute',
    width: 18,
    height: 1.5,
    backgroundColor: '#262626',
    left: 6,
    top: 4.5,
  },
  filterDot2: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
    left: 10,
    top: 8.5,
  },
  filterLine2: {
    position: 'absolute',
    width: 18,
    height: 1.5,
    backgroundColor: '#262626',
    left: 2,
    top: 10,
  },
  filterDot3: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
    left: 15,
    top: 14,
  },
  filterLine3: {
    position: 'absolute',
    width: 18,
    height: 1.5,
    backgroundColor: '#262626',
    left: 2,
    top: 15.5,
  },

  heartIcon: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartOutline: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
    position: 'relative',
  },
  heartFilled: {
    width: 8,
    height: 8,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },

  bagIcon: {
    width: 10,
    height: 10,
    position: 'relative',
  },
  bagBody: {
    position: 'absolute',
    bottom: 0,
    left: 1,
    right: 1,
    height: 7,
    borderWidth: 1,
    borderColor: '#14142B',
    borderRadius: 1,
  },
  bagHandle: {
    position: 'absolute',
    top: 1,
    left: 3,
    right: 3,
    height: 3,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#14142B',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default ProductViewTwo;
