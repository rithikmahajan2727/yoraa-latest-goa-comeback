import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

const ShopScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.description}>Discover amazing products</Text>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchPlaceholder}>Search for products...</Text>
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Featured Categories</Text>
        <Text style={styles.cardText}>• Clothing</Text>
        <Text style={styles.cardText}>• Accessories</Text>
        <Text style={styles.cardText}>• Footwear</Text>
        <Text style={styles.cardText}>• Beauty</Text>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  content: {
    padding: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  searchContainer: {
    marginBottom: Spacing.xxl,
  },
  searchBox: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: {
    fontSize: FontSizes.lg,
    color: Colors.textTertiary,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  cardTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  cardText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default ShopScreen;
