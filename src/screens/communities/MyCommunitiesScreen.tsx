import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Text, Surface, Button, SegmentedButtons, Menu, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from '../../components/Header';
import { theme } from '../../styles/theme';
import { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - theme.spacing.l * 3) / 2;

type MyCommunitiesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type SortBy = 'name' | 'members' | 'recent' | 'activity';
type ViewMode = 'grid' | 'list';

const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Desarrolladores React Native',
    description: 'Comunidad de desarrolladores React Native en México',
    members: 1234,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    categories: ['Tecnología', 'Desarrollo'],
    lastActivity: '2025-02-06T10:00:00',
    joined: '2024-12-01T00:00:00',
  },
  {
    id: '2',
    name: 'Diseñadores UX/UI',
    description: 'Espacio para compartir conocimientos de diseño',
    members: 856,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    categories: ['Diseño', 'UX'],
    lastActivity: '2025-02-05T15:30:00',
    joined: '2025-01-15T00:00:00',
  },
  {
    id: '3',
    name: 'JavaScript México',
    description: 'La comunidad más grande de JavaScript en México',
    members: 2341,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    categories: ['Tecnología', 'JavaScript'],
    lastActivity: '2025-02-06T09:00:00',
    joined: '2024-11-01T00:00:00',
  },
  {
    id: '4',
    name: 'Emprendedores Tech',
    description: 'Red de emprendedores tecnológicos',
    members: 1567,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
    categories: ['Emprendimiento', 'Tecnología'],
    lastActivity: '2025-02-04T16:45:00',
    joined: '2025-01-20T00:00:00',
  },
];

const CommunityCard = ({ community, viewMode }: { community: typeof MOCK_COMMUNITIES[0], viewMode: ViewMode }) => (
  <Surface 
    style={[
      styles.communityCard,
      viewMode === 'grid' ? styles.gridCard : styles.listCard,
    ]}
  >
    <Image 
      source={{ uri: community.image }} 
      style={viewMode === 'grid' ? styles.gridImage : styles.listImage}
    />
    <View style={styles.cardContent}>
      <Text variant="titleMedium" style={styles.cardTitle}>
        {community.name}
      </Text>
      {viewMode === 'list' && (
        <Text variant="bodyMedium" style={styles.cardDescription} numberOfLines={2}>
          {community.description}
        </Text>
      )}
      <View style={styles.metaContainer}>
        <MaterialCommunityIcons 
          name="account-group" 
          size={16} 
          color={theme.colors.textSecondary}
        />
        <Text style={styles.metaText}>
          {community.members.toLocaleString()} miembros
        </Text>
      </View>
      {viewMode === 'list' && (
        <View style={styles.metaContainer}>
          <MaterialCommunityIcons 
            name="clock-outline" 
            size={16} 
            color={theme.colors.textSecondary}
          />
          <Text style={styles.metaText}>
            Última actividad: {new Date(community.lastActivity).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  </Surface>
);

export const MyCommunitiesScreen = () => {
  const navigation = useNavigation<MyCommunitiesScreenNavigationProp>();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { label: 'Nombre', value: 'name' as SortBy },
    { label: 'Miembros', value: 'members' as SortBy },
    { label: 'Reciente', value: 'recent' as SortBy },
    { label: 'Actividad', value: 'activity' as SortBy },
  ];

  const getSortedCommunities = () => {
    return [...MOCK_COMMUNITIES].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'members':
          return b.members - a.members;
        case 'recent':
          return new Date(b.joined).getTime() - new Date(a.joined).getTime();
        case 'activity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        default:
          return 0;
      }
    });
  };

  const renderItem = ({ item }: { item: { community: typeof MOCK_COMMUNITIES[0]; viewMode: ViewMode } }) => (
    <CommunityCard
      community={item.community}
      viewMode={item.viewMode}
    />
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Mis Comunidades"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.toolbar}>
        <View style={styles.sortContainer}>
          <Text variant="bodyMedium" style={styles.toolbarText}>
            Ordenar por:
          </Text>
          <Menu
            visible={showSortMenu}
            onDismiss={() => setShowSortMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowSortMenu(true)}
                icon="sort"
                contentStyle={styles.sortButton}
              >
                {sortOptions.find(opt => opt.value === sortBy)?.label}
              </Button>
            }
          >
            {sortOptions.map((option) => (
              <Menu.Item
                key={option.value}
                onPress={() => {
                  setSortBy(option.value);
                  setShowSortMenu(false);
                }}
                title={option.label}
              />
            ))}
          </Menu>
        </View>

        <SegmentedButtons
          value={viewMode}
          onValueChange={value => setViewMode(value as ViewMode)}
          buttons={[
            {
              value: 'grid',
              icon: 'grid',
              style: styles.viewModeButton,
            },
            {
              value: 'list',
              icon: 'format-list-bulleted',
              style: styles.viewModeButton,
            },
          ]}
        />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          styles.contentContainer,
          viewMode === 'grid' && styles.gridContainer
        ]}
      >
        {getSortedCommunities().map(community => (
          <CommunityCard 
            key={community.id} 
            community={community}
            viewMode={viewMode}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
  },
  toolbarText: {
    color: theme.colors.textSecondary,
  },
  sortButton: {
    height: 36,
  },
  viewModeButton: {
    borderColor: theme.colors.surfaceVariant,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.m,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.m,
  },
  communityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    overflow: 'hidden',
    elevation: 2,
  },
  gridCard: {
    width: CARD_WIDTH,
  },
  listCard: {
    marginBottom: theme.spacing.m,
  },
  gridImage: {
    width: '100%',
    height: 120,
  },
  listImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: theme.spacing.m,
  },
  cardTitle: {
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.s,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.s,
  },
  metaText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
