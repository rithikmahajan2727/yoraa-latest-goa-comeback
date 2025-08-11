import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

const CollectionScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Collection</Text>
      <Text style={styles.description}>Your curated items</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Collections</Text>
        <Text style={styles.cardText}>Create and organize your collections</Text>
      </View>
      
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No collections yet</Text>
        <Text style={styles.emptyStateSubtext}>
          Start creating collections to organize your favorite items
        </Text>
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 200,
  },
});

export default CollectionScreen;
