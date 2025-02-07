import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Surface, Chip, Button, FAB, useTheme, Avatar, Divider } from 'react-native-paper';
import type { AppTheme } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header, HorizontalCarousel } from '../../components';
import { myCommunities, suggestedCommunities } from '../../data/mockData';
import { categories } from '../../data/categories';
import { Community } from '../../types/data';

const { width: screenWidth } = Dimensions.get('window');

type CommunitiesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CommunitiesScreen = () => {
  const navigation = useNavigation<CommunitiesScreenNavigationProp>();
  const theme = useTheme<AppTheme>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
    },
    categoriesContainer: {
      paddingVertical: theme.spacing.s,
      paddingHorizontal: theme.spacing.m,
    },
    categoryChip: {
      marginRight: theme.spacing.s,
      marginBottom: theme.spacing.s,
    },
    section: {
      marginVertical: theme.spacing.m,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.m,
      marginBottom: theme.spacing.s,
    },
    sectionTitle: {
      color: theme.colors.onSurface,
    },
    carouselCard: {
      width: screenWidth * 0.8,
      marginHorizontal: theme.spacing.s,
      borderRadius: theme.borderRadius.l,
      overflow: 'hidden',
      elevation: theme.elevation.small,
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    feedCard: {
      marginHorizontal: theme.spacing.m,
      marginBottom: theme.spacing.m,
      borderRadius: theme.borderRadius.l,
      overflow: 'hidden',
      elevation: theme.elevation.small,
      backgroundColor: theme.colors.surface,
    },
    imageContainer: {
      padding: theme.spacing.m,
      alignItems: 'center',
    },
    image: {
      backgroundColor: 'transparent',
    },
    cardContent: {
      padding: theme.spacing.m,
    },
    cardTitle: {
      marginBottom: theme.spacing.s,
      color: theme.colors.onSurface,
    },
    cardDescription: {
      marginBottom: theme.spacing.s,
      color: theme.colors.onSurfaceVariant,
    },
    statsContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.s,
    },
    stat: {
      marginRight: theme.spacing.m,
      color: theme.colors.onSurfaceVariant,
    },
    categoryChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      marginRight: theme.spacing.s,
      marginBottom: theme.spacing.s,
    },
    fab: {
      position: 'absolute',
      right: theme.spacing.m,
      bottom: theme.spacing.m,
      backgroundColor: theme.colors.primary,
    },
    divider: {
      marginVertical: theme.spacing.m,
    },
  });

  const renderCommunityCard = (community: Community, isCarousel: boolean = false) => {
    const cardStyle = isCarousel ? styles.carouselCard : styles.feedCard;
    return (
      <Surface key={community.id} style={cardStyle}>
        <TouchableOpacity
          onPress={() => handleCommunityPress(community.id)}
        >
          {community.image && (
            <View style={styles.imageContainer}>
              <Avatar.Image
                size={80}
                source={{ uri: community.image }}
                style={styles.image}
              />
            </View>
          )}
          <View style={styles.cardContent}>
            <Text variant="titleMedium" style={styles.cardTitle}>
              {community.name}
            </Text>
            <Text variant="bodySmall" style={styles.cardDescription} numberOfLines={2}>
              {community.description}
            </Text>
            <View style={styles.statsContainer}>
              <Text variant="bodySmall" style={styles.stat}>
                {community.members.toLocaleString()} miembros
              </Text>
              <Text variant="bodySmall" style={styles.stat}>
                {community.posts.toLocaleString()} publicaciones
              </Text>
            </View>
            <View style={styles.categoryChips}>
              {community.categories.slice(0, 2).map((category, index) => (
                <Chip
                  key={index}
                  style={[styles.chip, { backgroundColor: theme.colors.surfaceVariant }]}
                  textStyle={{ color: theme.colors.onSurfaceVariant }}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Surface>
    );
  };

  const renderCarouselItem = ({ item }: { item: Community }) => renderCommunityCard(item, true);

  const filteredSuggestedCommunities = selectedCategory
    ? suggestedCommunities.filter(community => community.categories.includes(selectedCategory))
    : suggestedCommunities;

  const handleMyCommunities = () => {
    navigation.navigate('MyCommunities');
  };

  const handleCommunityPress = (communityId: string) => {
    navigation.navigate('CommunityDetail', { communityId });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Comunidades"
        showBack={false}
        rightIcon="magnify"
        onRightPress={() => navigation.navigate('Search')}
      />

      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      selectedCategory === category.name
                        ? theme.colors.primary
                        : theme.colors.surfaceVariant,
                  },
                ]}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                  )
                }
                textStyle={{
                  color:
                    selectedCategory === category.name
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant,
                }}
              >
                {category.name}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Mis Comunidades
            </Text>
            <Button
              mode="text"
              onPress={handleMyCommunities}
              textColor={theme.colors.primary}
            >
              Ver todas
            </Button>
          </View>
          <HorizontalCarousel
            data={myCommunities}
            renderItem={renderCarouselItem}
            itemWidth={screenWidth * 0.8}
            containerStyle={{ marginHorizontal: -theme.spacing.m }}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Comunidades Sugeridas
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('SuggestedCommunities')}
              textColor={theme.colors.primary}
            >
              Ver todas
            </Button>
          </View>
          {filteredSuggestedCommunities.slice(0, 5).map(community => renderCommunityCard(community, false))}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateCommunity')}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};
