import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Searchbar, SegmentedButtons, Text, Chip, Surface, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type SearchType = 'communities' | 'events';
type SortBy = 'relevance' | 'date' | 'location' | 'members';

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('communities');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const communityFilters = [
    { label: 'Tecnología', value: 'tech' },
    { label: 'Arte', value: 'art' },
    { label: 'Deportes', value: 'sports' },
    { label: 'Música', value: 'music' },
    { label: 'Emprendimiento', value: 'business' },
    { label: 'CDMX', value: 'cdmx' },
    { label: 'Guadalajara', value: 'gdl' },
    { label: 'Monterrey', value: 'mty' },
  ];

  const eventFilters = [
    { label: 'Meetups', value: 'meetup' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Conferencias', value: 'conference' },
    { label: 'Esta semana', value: 'this_week' },
    { label: 'Este mes', value: 'this_month' },
    { label: 'CDMX', value: 'cdmx' },
    { label: 'Guadalajara', value: 'gdl' },
    { label: 'Monterrey', value: 'mty' },
  ];

  const sortOptions = {
    communities: [
      { label: 'Relevancia', value: 'relevance' },
      { label: 'Miembros', value: 'members' },
      { label: 'Ubicación', value: 'location' },
    ],
    events: [
      { label: 'Relevancia', value: 'relevance' },
      { label: 'Fecha', value: 'date' },
      { label: 'Ubicación', value: 'location' },
    ],
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={2}>
        <View style={styles.searchContainer}>
          <Button
            mode="text"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Regresar
          </Button>
          <Searchbar
            placeholder="Buscar"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchInput}
            iconColor={theme.colors.primary}
          />
        </View>
        <SegmentedButtons
          value={searchType}
          onValueChange={value => setSearchType(value as SearchType)}
          buttons={[
            { value: 'communities', label: 'Comunidades' },
            { value: 'events', label: 'Eventos' },
          ]}
          style={styles.segmentedButtons}
        />
      </Surface>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Ordenar por
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sortButtons}
          >
            {sortOptions[searchType].map((option) => (
              <Button
                key={option.value}
                mode={sortBy === option.value ? 'contained' : 'outlined'}
                onPress={() => setSortBy(option.value as SortBy)}
                style={styles.sortButton}
              >
                {option.label}
              </Button>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Filtros
          </Text>
          <View style={styles.filters}>
            {(searchType === 'communities' ? communityFilters : eventFilters)
              .map((filter) => (
                <Chip
                  key={filter.value}
                  selected={selectedFilters.includes(filter.value)}
                  onPress={() => toggleFilter(filter.value)}
                  style={styles.chip}
                  showSelectedOverlay
                >
                  {filter.label}
                </Chip>
              ))}
          </View>
        </View>

        <View style={styles.results}>
          {/* Aquí irán los resultados de la búsqueda */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingTop: 40,
    paddingBottom: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    height: 40,
    color: 'white',
  },
  backButton: {
    marginRight: theme.spacing.s,
  },
  segmentedButtons: {
    marginTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
  section: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  sectionTitle: {
    marginBottom: theme.spacing.s,
    color: 'white',
    fontWeight: '600',
    textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    marginRight: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  chip: {
    backgroundColor: theme.colors.surfaceVariant,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  chipText: {
    color: 'white',
    fontSize: 12,
  },
  emptyStateText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.m,
    fontSize: 16,
  },
  results: {
    padding: theme.spacing.m,
  },
});
