import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';

const { width } = Dimensions.get('window');

const ProductDetailsReviewThreePointSelection = ({ navigation, route }) => {
  const [sizeRating, setSizeRating] = useState(null); // 0-4 scale (Perfect = 2)
  const [comfortRating, setComfortRating] = useState(null);
  const [durabilityRating, setDurabilityRating] = useState(null);

  // Check if all ratings are selected
  const isAllSelected = sizeRating !== null && comfortRating !== null && durabilityRating !== null;

  const BackIcon = () => (
    <View style={styles.backIcon}>
      <View style={styles.backArrow} />
    </View>
  );

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleNext = () => {
    // Only proceed if all ratings are selected
    if (!isAllSelected) {
      return;
    }
    
    // Navigate to written user review screen
    const reviewData = {
      size: sizeRating,
      comfort: comfortRating,
      durability: durabilityRating
    };
    
    navigation.navigate('ProductDetailsWrittenUserReview', { 
      reviewData,
      order: route?.params?.order // Pass order data if it exists
    });
  };

  const renderRatingScale = (rating, setRating, labels) => (
    <View style={styles.ratingScale}>
      <View style={styles.ratingDots}>
        {[0, 1, 2, 3, 4].map((index) => (
          <TouchableOpacity
            key={index}
            style={styles.ratingDotContainer}
            onPress={() => setRating(index)}
          >
            <View style={[
              styles.ratingDot,
              rating === index && styles.ratingDotSelected
            ]} />
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Rating lines */}
      <View style={styles.ratingLines}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={styles.ratingLine} />
        ))}
      </View>
      
      {/* Labels */}
      <View style={styles.ratingLabels}>
        <Text style={styles.ratingLabelLeft}>{labels.left}</Text>
        {labels.center && <Text style={styles.ratingLabelCenter}>{labels.center}</Text>}
        <Text style={styles.ratingLabelRight}>{labels.right}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      
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
        
        <Text style={styles.headerTitle}>How was your product</Text>
        
        <View style={styles.headerButton} />
      </View>

      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <View style={styles.productImage}>
          {/* Nike shoe placeholder with the Nike swoosh symbol */}
          <View style={styles.imagePlaceholder}>
            <View style={styles.nikeSwoosh} />
          </View>
        </View>
      </View>

      {/* Size Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was the size?</Text>
        {renderRatingScale(sizeRating, setSizeRating, {
          left: 'Too Small',
          center: 'Perfect',
          right: 'Too Big'
        })}
      </View>

      {/* Comfort Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was the comfort?</Text>
        {renderRatingScale(comfortRating, setComfortRating, {
          left: 'Uncomfortable',
          right: 'Comfortable'
        })}
      </View>

      {/* Durability Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>How was the durability?</Text>
        {renderRatingScale(durabilityRating, setDurabilityRating, {
          left: 'Non-Durable',
          center: 'Perfect',
          right: 'Durable'
        })}
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={[
          styles.nextButton,
          !isAllSelected && styles.nextButtonDisabled
        ]} 
        onPress={handleNext}
        disabled={!isAllSelected}
      >
        <Text style={[
          styles.nextButtonText,
          !isAllSelected && styles.nextButtonTextDisabled
        ]}>Next</Text>
      </TouchableOpacity>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.indicatorLine} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  // System Bar
  systemBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 17,
    height: 39,
    backgroundColor: '#FFFFFF',
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
    borderRadius: 2,
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 2,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 10,
  },
  headerButton: {
    width: 68,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat',
    letterSpacing: -0.4,
    textAlign: 'center',
    flex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 8,
    height: 14,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000000',
    transform: [{ rotate: '-45deg' }],
    marginRight: 2,
  },

  // Product Image
  productImageContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  productImage: {
    width: 122,
    height: 123,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nikeSwoosh: {
    width: 40,
    height: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
    transform: [{ skewX: '-20deg' }],
  },

  // Rating Container
  ratingContainer: {
    paddingHorizontal: 31,
    marginBottom: 40,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121420',
    fontFamily: 'Montserrat',
    letterSpacing: -0.08,
    textAlign: 'center',
    marginBottom: 22,
  },

  // Rating Scale
  ratingScale: {
    position: 'relative',
  },
  ratingDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  ratingDotContainer: {
    padding: 8, // Increase touch area
  },
  ratingDot: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
  },
  ratingDotSelected: {
    backgroundColor: '#1A1A1A',
  },
  ratingLines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  ratingLine: {
    width: 51,
    height: 1,
    backgroundColor: '#000000',
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  ratingLabelLeft: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat',
    letterSpacing: -0.06,
  },
  ratingLabelCenter: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat',
    letterSpacing: -0.06,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -20 }],
  },
  ratingLabelRight: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Montserrat',
    letterSpacing: -0.06,
  },

  // Next Button
  nextButton: {
    marginHorizontal: 30,
    marginTop: 'auto',
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
  },
  nextButtonTextDisabled: {
    color: '#999999',
  },

  // Bottom Indicator
  bottomIndicator: {
    height: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorLine: {
    width: 135,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    marginBottom: 8,
  },
});

export default ProductDetailsReviewThreePointSelection;
