import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

const HomeScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.description}>Welcome to YORAA</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Featured Items</Text>
        <Text style={styles.cardText}>Discover the latest fashion trends</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>New Arrivals</Text>
        <Text style={styles.cardText}>Fresh styles just for you</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trending Now</Text>
        <Text style={styles.cardText}>What's popular this season</Text>
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

export default HomeScreen;
