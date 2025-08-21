import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  Animated,
  Modal,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import BottomNavigationBar from '../components/bottomnavigationbar';
import SizeSelectionModal from './productdetailsmainsizeselectionchart';

const { width } = Dimensions.get('window');

const ProductDetailsMain = ({ navigation, route }) => {
  const [activeSize, setActiveSize] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    sizeAndFit: false,
    manufacturing: false,
    shipping: false,
  });
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const imageSliderRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Product variants data with different images
  const productVariants = [
    {
      id: '1',
      name: 'Nike Everyday Plus Cushioned',
      subtitle: 'Training Crew Socks (3 Pairs)',
      price: 'US$22',
      originalPrice: 'US$10',
      discountedPrice: 'US$10',
      images: [
        { id: '1-1', backgroundColor: '#F5F5F5' },
        { id: '1-2', backgroundColor: '#EEEEEE' },
        { id: '1-3', backgroundColor: '#E8E8E8' },
      ],
      colors: ['#8B4513', '#CD853F', '#F5F5DC'],
      thumbnailColor: '#F0F0F0',
    },
    {
      id: '2',
      name: 'Nike Everyday Max Cushioned',
      subtitle: 'Training Crew Socks (3 Pairs)',
      price: 'US$24',
      originalPrice: 'US$12',
      discountedPrice: 'US$12',
      images: [
        { id: '2-1', backgroundColor: '#DCDCDC' },
        { id: '2-2', backgroundColor: '#D0D0D0' },
        { id: '2-3', backgroundColor: '#C8C8C8' },
      ],
      colors: ['#000000', '#FFFFFF', '#808080'],
      thumbnailColor: '#D8D8D8',
    },
    {
      id: '3',
      name: 'Nike Performance Cushioned',
      subtitle: 'Training Crew Socks (3 Pairs)',
      price: 'US$26',
      originalPrice: 'US$14',
      discountedPrice: 'US$14',
      images: [
        { id: '3-1', backgroundColor: '#E6E6E6' },
        { id: '3-2', backgroundColor: '#E0E0E0' },
        { id: '3-3', backgroundColor: '#DADADA' },
      ],
      colors: ['#FF0000', '#00FF00', '#0000FF'],
      thumbnailColor: '#E3E3E3',
    },
  ];

  // Get current selected product
  const currentProduct = productVariants[selectedProductIndex];

  // Get product data from route params or use default
  const product = route?.params?.product || currentProduct;

  // Mock related products data
  const youMightAlsoLike = [
    {
      id: '1',
      name: 'Nike Everyday Max Cushioned',
      price: 'US$24',
    },
    {
      id: '2',
      name: 'Nike Dunk Low',
      price: 'US$55',
    },
    {
      id: '3',
      name: 'Nike Air Max 90',
      price: 'US$120',
    },
    {
      id: '4',
      name: 'Nike Revolution 5',
      price: 'US$65',
    },
  ];

  const similarItems = [
    {
      id: '1',
      name: 'Nike Everyday Max Cushioned',
      price: 'US$24',
    },
    {
      id: '2',
      name: 'Nike Dunk Low',
      price: 'US$55',
    },
    {
      id: '3',
      name: 'Adidas Ultraboost 22',
      price: 'US$190',
    },
    {
      id: '4',
      name: 'Puma RS-X',
      price: 'US$100',
    },
  ];

  const othersAlsoBought = [
    {
      id: '1',
      name: 'Nike Everyday Max Cushioned',
      price: 'US$24',
    },
    {
      id: '2',
      name: 'Nike Dunk Low',
      price: 'US$55',
    },
    {
      id: '3',
      name: 'Nike Air Force 1',
      price: 'US$110',
    },
    {
      id: '4',
      name: 'Nike Blazer Mid',
      price: 'US$100',
    },
  ];

  // Legacy related products for backward compatibility
  const relatedProducts = [
    {
      id: '1',
      name: 'Nike Everyday Max Cushioned',
      price: 'US$24',
    },
    {
      id: '2',
      name: 'Nike Dunk Low',
      price: 'US$55',
    },
  ];

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

  const HeartIcon = () => (
    <View style={styles.heartIcon}>
      <View style={styles.heartShape} />
    </View>
  );

  const ShoppingBagIcon = () => (
    <View style={styles.bagIcon}>
      <View style={styles.bagBody} />
      <View style={styles.bagHandle} />
    </View>
  );

  const ShareIcon = () => (
    <View style={styles.shareIcon}>
      <View style={styles.shareArrow} />
      <View style={styles.shareBox} />
    </View>
  );

  const UpArrowIcon = () => (
    <View style={styles.upArrow}>
      <View style={styles.arrowLine} />
    </View>
  );

  const StarIcon = ({ filled = true }) => (
    <View style={styles.starIcon}>
      <View style={[styles.star, filled && styles.starFilled]} />
    </View>
  );

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTabChange = (tabName) => {
    if (navigation) {
      navigation.navigate(tabName);
    }
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleProductSelection = (index) => {
    if (index !== selectedProductIndex) {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        // Update the product
        setSelectedProductIndex(index);
        setActiveImageIndex(0);
        
        // Reset to first image when changing product
        if (imageSliderRef.current) {
          imageSliderRef.current.scrollToIndex({ index: 0, animated: false });
        }
        
        // Fade in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const renderThumbnailImages = () => (
    <View style={styles.thumbnailContainer}>
      {productVariants.map((variant, index) => (
        <TouchableOpacity
          key={variant.id}
          style={[
            styles.thumbnailImage,
            selectedProductIndex === index && styles.activeThumbnail
          ]}
          onPress={() => handleProductSelection(index)}
          activeOpacity={0.7}
        >
          <View 
            style={[
              styles.thumbnailImageContent,
              { backgroundColor: variant.thumbnailColor }
            ]} 
          />
          {selectedProductIndex === index && (
            <View style={styles.selectedIndicator} />
          )}
        </TouchableOpacity>
      ))}
      {/* Strike through effect (keeping original design element) */}
      {/* <View style={styles.thumbnailStrike} /> */}
    </View>
  );

  const renderProductImages = () => {
    const renderImageItem = ({ item, index }) => (
      <View style={styles.imageSlide}>
        <View style={[styles.mainProductImage, { backgroundColor: item.backgroundColor }]} />
      </View>
    );

    const onImageScroll = (event) => {
      const slideSize = width;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
      setActiveImageIndex(index);
    };

    return (
      <View style={styles.productImagesContainer}>
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <FlatList
            ref={imageSliderRef}
            data={currentProduct.images}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onImageScroll}
            scrollEventThrottle={16}
            style={styles.imageSlider}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
        </Animated.View>
        
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {currentProduct.images.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                index === activeImageIndex && styles.paginationDotActive
              ]}
              onPress={() => {
                if (imageSliderRef.current) {
                  imageSliderRef.current.scrollToIndex({ index, animated: true });
                }
              }}
            />
          ))}
        </View>

        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton}>
          <View style={styles.heartButtonContainer}>
            <HeartIcon />
          </View>
        </TouchableOpacity>

        {/* Shopping Bag Icon */}
        <TouchableOpacity 
          style={styles.bagButton}
          onPress={() => navigation.navigate('Bag')}
        >
          <View style={styles.bagButtonContainer}>
            <ShoppingBagIcon />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProductInfo = () => (
    <View style={styles.productInfoContainer}>
      <View style={styles.productDescription}>
        <Text style={styles.productSubtitle}>{currentProduct.subtitle}</Text>
        <Text style={styles.productTitle}>{currentProduct.name}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>{currentProduct.originalPrice}</Text>
        <Text style={styles.discountedPrice}>{currentProduct.discountedPrice}</Text>
      </View>

      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Product Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <ShareIcon />
        </TouchableOpacity>
      </TouchableOpacity>

      <Text style={styles.outOfStockText}>Out of Stock</Text>
    </View>
  );

  const renderStarRating = () => (
    <View style={styles.starRatingContainer}>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= 4} />
        ))}
      </View>
    </View>
  );

  const renderRatingBars = () => (
    <View style={styles.ratingBarsContainer}>
      <View style={styles.ratingCategory}>
        <Text style={styles.ratingCategoryTitle}>Size</Text>
        <View style={styles.ratingBarContainer}>
          <View style={styles.ratingBar} />
          <View style={[styles.ratingIndicator, { left: 203 }]} />
        </View>
        <View style={styles.ratingLabels}>
          <Text style={styles.ratingLabel}>Fits Small</Text>
          <Text style={styles.ratingLabel}>Run Large</Text>
        </View>
      </View>

      <View style={styles.ratingCategory}>
        <Text style={styles.ratingCategoryTitle}>Comfort</Text>
        <View style={styles.ratingBarContainer}>
          <View style={styles.ratingBar} />
          <View style={[styles.ratingIndicator, { left: 254 }]} />
        </View>
        <View style={styles.ratingLabels}>
          <Text style={styles.ratingLabel}>Uncomfortable</Text>
          <Text style={styles.ratingLabel}>Comfortable</Text>
        </View>
      </View>

      <View style={styles.ratingCategory}>
        <Text style={styles.ratingCategoryTitle}>Durability</Text>
        <View style={styles.ratingBarContainer}>
          <View style={styles.ratingBar} />
          <View style={[styles.ratingIndicator, { left: 219 }]} />
        </View>
        <View style={styles.ratingLabels}>
          <Text style={styles.ratingLabel}>Non-Durable</Text>
          <Text style={styles.ratingLabel}>Durable</Text>
        </View>
      </View>
    </View>
  );

  const renderRatingSection = () => (
    <View style={styles.ratingSectionContainer}>
      <Text style={styles.ratingSectionTitle}>Rating & Reviews</Text>
      
      <View style={styles.ratingScoresContainer}>
        <View style={styles.leftRatingScore}>
          <Text style={styles.ratingScoreMain}>4.5</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= 4} />
            ))}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsMainReview')}>
            <Text style={styles.reviewsLink}>20 Reviews</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.rightRatingScore}>
          <Text style={styles.recommendPercent}>91%</Text>
          <Text style={styles.recommendText}>of customer recommend{'\n'}this product</Text>
        </View>
      </View>
    </View>
  );

  const renderSizeAndFitSection = () => (
    <TouchableOpacity 
      style={styles.expandableSectionContainer}
      onPress={() => toggleSection('sizeAndFit')}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Size and Fit</Text>
        <View style={[styles.sectionArrow, !expandedSections.sizeAndFit && styles.sectionArrowRotated]}>
          <UpArrowIcon />
        </View>
      </View>
      {expandedSections.sizeAndFit && (
        <View style={styles.sectionContent}>
          {renderRatingBars()}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderExpandableSection = (title, section, content) => (
    <TouchableOpacity 
      style={styles.expandableSectionContainer}
      onPress={() => toggleSection(section)}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={[styles.sectionArrow, !expandedSections[section] && styles.sectionArrowRotated]}>
          <UpArrowIcon />
        </View>
      </View>
      {expandedSections[section] && (
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>{content}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderContentSections = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Description & Specifications</Text>
      <Text style={styles.contentDescription}>
        The Nike Everyday Plus Cushioned Socks bring comfort to your workout with extra cushioning under the heel and forefoot and a snug, supportive arch band. Sweat-wicking power and breathability up top help keep your feet dry and cool to help push you through that extra set.
      </Text>

      {renderExpandableSection(
        'Manufacturing Details',
        'manufacturing',
        'Cushioning under the forefoot and heel helps soften the impact of your workout.\n\nDri-FIT technology helps your feet stay dry and comfortable.\n\nBand around the arch feels snug and supportive.\n\nBreathable knit pattern on top adds ventilation.\n\nReinforced heel and toe are made to last.'
      )}

      {renderExpandableSection(
        'Shipping,Return & Exchanges',
        'shipping',
        'Fabric: 61-67% cotton/30-36% polyester/2% spandex/1% nylon\n\nMachine wash\n\nImported\n\nNote: Material percentages may vary slightly depending on color. Check label for actual content.\n\nShown: Multi-Color\n\nStyle: SX6897-965'
      )}

      <View style={styles.buyNowContainer}>
        <TouchableOpacity 
          style={styles.buyNowButton}
          onPress={() => setShowSizeModal(true)}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Size and Fit Section */}
      {renderSizeAndFitSection()}

      {/* Rating Section */}
      {renderRatingSection()}
    </View>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder} />
        <TouchableOpacity style={styles.favoriteButton}>
          <View style={styles.favoriteButtonContainer}>
            <HeartIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Bag')}
        >
          <View style={styles.cartButtonContainer}>
            <ShoppingBagIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderScrollableProductSection = (title, data) => (
    <View style={styles.scrollableProductsContainer}>
      <Text style={styles.scrollableProductsTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const renderRelatedProducts = (title) => (
    <View style={styles.relatedProductsContainer}>
      <Text style={styles.relatedProductsTitle}>{title}</Text>
      <View style={styles.relatedProductsRow}>
        {relatedProducts.map((relatedProduct) => (
          <View key={relatedProduct.id} style={styles.relatedProductCard}>
            <View style={styles.relatedProductImage} />
            <Text style={styles.relatedProductName}>{relatedProduct.name}</Text>
            <Text style={styles.relatedProductPrice}>{relatedProduct.price}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* System Bar */}
      <View style={styles.systemBar}>
        <Text style={styles.systemTime}>9:41</Text>
        <View style={styles.systemIcons}>
          <View style={styles.signalIcon} />
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Nike Everyday Plus Cush...</Text>
        
        <TouchableOpacity style={styles.headerButton}>
          <SearchIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        {renderProductImages()}

        {/* Star Rating */}
        {renderStarRating()}

        {/* Thumbnail Images */}
        {renderThumbnailImages()}

        {/* Product Info */}
        {renderProductInfo()}

        {/* Content Sections */}
        {renderContentSections()}

        {/* Scrollable Product Sections */}
        {renderScrollableProductSection('You Might Also Like', youMightAlsoLike)}
        {renderScrollableProductSection('Similar Items', similarItems)}
        {renderScrollableProductSection('Other Also Bought', othersAlsoBought)}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigationBar 
        activeTab="Home" 
        onTabChange={handleTabChange}
      />

      {/* Size Selection Modal */}
      <SizeSelectionModal
        visible={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        product={currentProduct}
        activeSize={activeSize}
        setActiveSize={setActiveSize}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // System Bar
  systemBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 17,
    height: 39,
  },
  systemTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'SF Pro Display',
    letterSpacing: -0.28,
  },
  systemIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    width: 17,
    height: 11,
    backgroundColor: '#000000',
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: '#000000',
  },
  batteryIcon: {
    width: 25,
    height: 13,
    backgroundColor: '#000000',
    borderRadius: 2,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    height: 66,
  },
  headerButton: {
    width: 68,
    alignItems: 'center',
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.4,
  },

  scrollContainer: {
    flex: 1,
  },

  // Product Images
  productImagesContainer: {
    position: 'relative',
    height: 465,
    backgroundColor: '#EEEEEE',
  },
  imageContainer: {
    flex: 1,
  },
  imageSlider: {
    flex: 1,
  },
  imageSlide: {
    width: width,
    height: 465,
  },
  mainProductImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEEEEE',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  heartButton: {
    position: 'absolute',
    top: 14,
    right: 12,
  },
  heartButtonContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bagButton: {
    position: 'absolute',
    bottom: 48,
    right: 12,
  },
  bagButtonContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Star Rating
  starRatingContainer: {
    position: 'absolute',
    top: 479,
    left: width / 2 - 48,
    width: 96,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },

  // Thumbnail Images
  thumbnailContainer: {
    flexDirection: 'row',
    height: 123,
    marginTop: 4,
    paddingHorizontal: 4,
    gap: 4,
  },
  thumbnailImage: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailImageContent: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeThumbnail: {
    borderColor: '#000000',
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 1.5,
  },
  thumbnailStrike: {
    position: 'absolute',
    top: '50%',
    left: '33.33%',
    width: 153,
    height: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },

  // Product Info
  productInfoContainer: {
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 35,
  },
  productDescription: {
    marginBottom: 16,
  },
  productSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.168,
    lineHeight: 33.6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  originalPrice: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'line-through',
    letterSpacing: -0.5,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: -0.5,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  viewDetailsText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#767676',
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  shareButton: {
    marginLeft: 196,
    padding: 4,
  },
  outOfStockText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#848688',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginTop: -3,
  },

  // Expandable Sections
  expandableSectionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
    paddingHorizontal: 24,
    paddingVertical: 37,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 24,
  },
  sectionArrow: {
    transform: [{ rotate: '180deg' }],
  },
  sectionArrowRotated: {
    transform: [{ rotate: '0deg' }],
  },
  sectionContent: {
    marginTop: 20,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    letterSpacing: -0.384,
  },

  // Rating Bars
  ratingBarsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },
  ratingCategory: {
    marginBottom: 42,
  },
  ratingCategoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 9,
    lineHeight: 19.2,
  },
  ratingBarContainer: {
    position: 'relative',
    height: 10,
    marginBottom: 9,
  },
  ratingBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E4E4E4',
    position: 'absolute',
    top: 3,
  },
  ratingIndicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
    top: 0,
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.14,
    lineHeight: 16.8,
  },

  // Rating Section
  ratingSectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  ratingSectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 24,
    marginBottom: 48,
  },
  ratingScoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftRatingScore: {
    alignItems: 'flex-start',
  },
  ratingScoreMain: {
    fontSize: 48,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#000000',
    fontFamily: 'Montserrat-ExtraBold',
    lineHeight: 57.6,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 37,
  },
  reviewsLink: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
    letterSpacing: -0.35,
  },
  rightRatingScore: {
    alignItems: 'flex-start',
  },
  recommendPercent: {
    fontSize: 48,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#000000',
    fontFamily: 'Montserrat-ExtraBold',
    lineHeight: 57.6,
    marginBottom: 16,
  },
  recommendText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 16.8,
    letterSpacing: -0.35,
  },

  // Content
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 24,
    marginBottom: 40,
  },
  contentDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 24,
    letterSpacing: -0.384,
    marginBottom: 30,
  },
  buyNowContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  buyNowButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 19.2,
  },

  // Related Products
  relatedProductsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 38,
  },
  relatedProductsTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 24,
    marginBottom: 38,
  },
  relatedProductsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  relatedProductCard: {
    flex: 1,
  },
  relatedProductImage: {
    width: 246,
    height: 246,
    backgroundColor: '#EEEEEE',
    marginBottom: 12,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 16.8,
    letterSpacing: -0.14,
    marginBottom: 4,
  },
  relatedProductPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },

  // Scrollable Products Sections
  scrollableProductsContainer: {
    marginBottom: 38,
    paddingLeft: 24,
  },
  scrollableProductsTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 24,
    marginBottom: 38,
    paddingRight: 24,
  },
  horizontalList: {
    paddingRight: 24,
    gap: 6,
  },
  productCard: {
    width: 246,
    marginRight: 6,
  },
  productImageContainer: {
    position: 'relative',
    height: 246,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 12,
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  favoriteButtonContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  cartButtonContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    paddingHorizontal: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: 16.8,
    letterSpacing: -0.14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 16.8,
    letterSpacing: -0.14,
  },

  // Icons
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

  heartIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartShape: {
    width: 13,
    height: 12,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
  },

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

  shareIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareArrow: {
    width: 10,
    height: 17,
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: '#767676',
    transform: [{ rotate: '45deg' }],
  },
  shareBox: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    width: 18,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#767676',
    backgroundColor: 'transparent',
  },

  upArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 8,
    height: 14,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#14142B',
    transform: [{ rotate: '45deg' }],
  },

  starIcon: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    width: 15,
    height: 14,
    backgroundColor: '#848688',
  },
  starFilled: {
    backgroundColor: '#FBBC05',
  },
});

export default ProductDetailsMain;
