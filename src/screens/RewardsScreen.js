import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

const RewardsScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.description}>Your loyalty points and benefits</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Points</Text>
        <Text style={styles.cardText}>0 Points Available</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ways to Earn</Text>
        <Text style={styles.cardText}>• Make purchases</Text>
        <Text style={styles.cardText}>• Refer friends</Text>
        <Text style={styles.cardText}>• Complete challenges</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Redeem Rewards</Text>
        <Text style={styles.cardText}>Exchange points for exclusive benefits</Text>
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

export default RewardsScreen;
