import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../constants';

// Icon Components
const StarIcon = ({ filled = false, size = 'small' }) => {
  const iconSize = size === 'large' ? 24 : 16;
  const starSize = size === 'large' ? 20 : 12;
  
  return (
    <View style={[styles.starContainer, { width: iconSize, height: iconSize }]}>
      <View style={[
        styles.starTop,
        { 
          borderLeftWidth: starSize / 2,
          borderRightWidth: starSize / 2,
          borderBottomWidth: starSize / 3,
          borderBottomColor: filled ? '#000000' : '#999999'
        }
      ]} />
      <View style={[
        styles.starBottom,
        { 
          borderLeftWidth: starSize / 2,
          borderRightWidth: starSize / 2,
          borderTopWidth: starSize / 3,
          borderTopColor: filled ? '#000000' : '#999999'
        }
      ]} />
    </View>
  );
};

const GiftIcon = () => (
  <View style={styles.giftContainer}>
    <View style={styles.giftBox} />
    <View style={styles.giftRibbon} />
    <View style={styles.giftBow} />
  </View>
);

const TrophyIcon = () => (
  <View style={styles.trophyContainer}>
    <View style={styles.trophyCup} />
    <View style={styles.trophyBase} />
    <View style={styles.trophyHandle1} />
    <View style={styles.trophyHandle2} />
  </View>
);

const CoinIcon = () => (
  <View style={styles.coinContainer}>
    <View style={styles.coinOuter} />
    <View style={styles.coinInner} />
  </View>
);

// Sample Data
const USER_POINTS = {
  current: 2450,
  lifetime: 5670,
  nextRewardAt: 3000,
  level: 'Gold',
  levelProgress: 0.82,
};

const ACHIEVEMENTS = [
  {
    id: '1',
    title: 'First Purchase',
    description: 'Make your first purchase',
    points: 100,
    completed: true,
    icon: 'gift',
    category: 'shopping',
  },
  {
    id: '2',
    title: 'Style Explorer',
    description: 'Browse 50 different products',
    points: 150,
    completed: true,
    icon: 'star',
    category: 'engagement',
  },
  {
    id: '3',
    title: 'Loyal Customer',
    description: 'Make 10 purchases',
    points: 500,
    completed: false,
    progress: 7,
    total: 10,
    icon: 'trophy',
    category: 'loyalty',
  },
  {
    id: '4',
    title: 'Review Master',
    description: 'Write 25 product reviews',
    points: 250,
    completed: false,
    progress: 12,
    total: 25,
    icon: 'star',
    category: 'engagement',
  },
];

const REWARDS = [
  {
    id: '1',
    title: '10% Off Next Purchase',
    description: 'Valid for 30 days',
    points: 500,
    available: true,
    category: 'discount',
  },
  {
    id: '2',
    title: 'Free Shipping',
    description: 'On orders over $50',
    points: 300,
    available: true,
    category: 'shipping',
  },
  {
    id: '3',
    title: 'Exclusive Early Access',
    description: 'New collection preview',
    points: 1000,
    available: true,
    category: 'access',
  },
  {
    id: '4',
    title: '$25 Store Credit',
    description: 'No minimum purchase',
    points: 2500,
    available: false,
    category: 'credit',
  },
];

const RECENT_ACTIVITIES = [
  {
    id: '1',
    action: 'Purchase Reward',
    points: '+150',
    description: 'Summer Floral Dress',
    date: '2 days ago',
    type: 'earned',
  },
  {
    id: '2',
    action: 'Achievement Unlocked',
    points: '+150',
    description: 'Style Explorer',
    date: '1 week ago',
    type: 'earned',
  },
  {
    id: '3',
    action: 'Reward Redeemed',
    points: '-300',
    description: 'Free Shipping',
    date: '2 weeks ago',
    type: 'redeemed',
  },
];

const RewardsScreen = () => {
  const [activeTab, setActiveTab] = useState('rewards');

  const renderIconByType = (type) => {
    switch (type) {
      case 'gift':
        return <GiftIcon />;
      case 'trophy':
        return <TrophyIcon />;
      case 'star':
        return <StarIcon filled size="large" />;
      default:
        return <CoinIcon />;
    }
  };

  const renderAchievementItem = ({ item }) => (
    <TouchableOpacity style={[styles.achievementCard, item.completed && styles.completedAchievement]}>
      <View style={styles.achievementIcon}>
        {renderIconByType(item.icon)}
      </View>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
        {!item.completed && item.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${(item.progress / item.total) * 100}%` }
              ]} />
            </View>
            <Text style={styles.progressText}>{item.progress}/{item.total}</Text>
          </View>
        )}
        <View style={styles.pointsBadge}>
          <CoinIcon />
          <Text style={styles.pointsText}>{item.points} pts</Text>
        </View>
      </View>
      {item.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderRewardItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.rewardCard, !item.available && styles.unavailableReward]}
      disabled={!item.available}
    >
      <View style={styles.rewardHeader}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <View style={styles.pointsRequired}>
          <CoinIcon />
          <Text style={styles.pointsRequiredText}>{item.points}</Text>
        </View>
      </View>
      <Text style={styles.rewardDescription}>{item.description}</Text>
      <TouchableOpacity 
        style={[styles.redeemButton, !item.available && styles.disabledButton]}
        disabled={!item.available}
      >
        <Text style={[styles.redeemButtonText, !item.available && styles.disabledButtonText]}>
          {item.available ? 'Redeem' : 'Insufficient Points'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <CoinIcon />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityAction}>{item.action}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
        <Text style={styles.activityDate}>{item.date}</Text>
      </View>
      <Text style={[
        styles.activityPoints,
        item.type === 'earned' ? styles.pointsEarned : styles.pointsRedeemed
      ]}>
        {item.points}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subtitle}>Your loyalty points</Text>
      </View>

      {/* Points Card */}
      <View style={styles.pointsCard}>
        <View style={styles.pointsHeader}>
          <View style={styles.pointsInfo}>
            <Text style={styles.currentPoints}>{USER_POINTS.current.toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>Points Available</Text>
          </View>
          <View style={styles.levelBadge}>
            <StarIcon filled size="large" />
            <Text style={styles.levelText}>{USER_POINTS.level}</Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>
              {USER_POINTS.nextRewardAt - USER_POINTS.current} points to next reward
            </Text>
          </View>
          <View style={styles.levelProgressBar}>
            <View style={[
              styles.levelProgressFill,
              { width: `${USER_POINTS.levelProgress * 100}%` }
            ]} />
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'rewards' && styles.activeTab]}
          onPress={() => setActiveTab('rewards')}
        >
          <Text style={[styles.tabText, activeTab === 'rewards' && styles.activeTabText]}>
            Rewards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
            Achievements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
          onPress={() => setActiveTab('activity')}
        >
          <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'rewards' && (
          <FlatList
            data={REWARDS}
            renderItem={renderRewardItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {activeTab === 'achievements' && (
          <FlatList
            data={ACHIEVEMENTS}
            renderItem={renderAchievementItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {activeTab === 'activity' && (
          <FlatList
            data={RECENT_ACTIVITIES}
            renderItem={renderActivityItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: '#666666',
  },
  pointsCard: {
    backgroundColor: '#000000',
    marginHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.medium,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  pointsInfo: {
    flex: 1,
  },
  currentPoints: {
    fontSize: FontSizes.xxxl + 4,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  pointsLabel: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.8)',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
  },
  levelText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: '#FFFFFF',
  },
  progressSection: {
    gap: Spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  levelProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.xl,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    ...Shadows.small,
  },
  tabText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: FontWeights.semiBold,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: Spacing.xl,
  },
  
  // Rewards
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...Shadows.small,
  },
  unavailableReward: {
    opacity: 0.6,
    backgroundColor: '#F8F8F8',
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  rewardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    flex: 1,
    marginRight: Spacing.md,
  },
  pointsRequired: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pointsRequiredText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
  },
  rewardDescription: {
    fontSize: FontSizes.md,
    color: '#666666',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  redeemButton: {
    backgroundColor: '#000000',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#999999',
  },
  redeemButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#FFFFFF',
  },

  // Achievements
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    ...Shadows.small,
  },
  completedAchievement: {
    borderColor: '#000000',
    backgroundColor: '#F8F8F8',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  achievementDescription: {
    fontSize: FontSizes.md,
    color: '#666666',
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F8F8F8',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  progressText: {
    fontSize: FontSizes.sm,
    color: '#666666',
    textAlign: 'right',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  pointsText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  completedBadge: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },

  // Activity
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.xl,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semiBold,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  activityDescription: {
    fontSize: FontSizes.sm,
    color: '#666666',
    marginBottom: Spacing.xs,
  },
  activityDate: {
    fontSize: FontSizes.xs,
    color: '#999999',
  },
  activityPoints: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  pointsEarned: {
    color: '#000000',
  },
  pointsRedeemed: {
    color: '#666666',
  },

  // Icons
  starContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    top: 2,
  },
  starBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    bottom: 2,
    transform: [{ rotate: '180deg' }],
  },
  giftContainer: {
    width: 20,
    height: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftBox: {
    width: 16,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  giftRibbon: {
    width: 2,
    height: 16,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 2,
  },
  giftBow: {
    width: 8,
    height: 4,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
  },
  trophyContainer: {
    width: 20,
    height: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyCup: {
    width: 12,
    height: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    top: 2,
  },
  trophyBase: {
    width: 16,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  trophyHandle1: {
    width: 4,
    height: 6,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderRightWidth: 0,
    position: 'absolute',
    left: -2,
    top: 4,
  },
  trophyHandle2: {
    width: 4,
    height: 6,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderLeftWidth: 0,
    position: 'absolute',
    right: -2,
    top: 4,
  },
  coinContainer: {
    width: 16,
    height: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    position: 'absolute',
  },
  coinInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
    position: 'absolute',
  },
});

export default RewardsScreen;
