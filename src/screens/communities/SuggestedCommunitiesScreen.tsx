import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Button, Chip, Avatar, Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

type SuggestedCommunitiesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SuggestedCommunities'
>;

export const SuggestedCommunitiesScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<SuggestedCommunitiesScreenNavigationProp>();

  // TODO: Fetch suggested communities from API
  const suggestedCommunities = [
    {
      id: 1,
      name: 'Artistas Locales',
      description: 'Comunidad de artistas locales compartiendo obras, organizando exposiciones y colaborando en proyectos creativos.',
      members: 1250,
      category: 'Arte y Cultura',
      tags: ['Arte', 'Creatividad', 'Local'],
      image: 'https://picsum.photos/800/400',
      avatar: 'https://picsum.photos/200',
      matchScore: 95,
    },
    {
      id: 2,
      name: 'Huertos Urbanos',
      description: 'Grupo dedicado a promover la agricultura urbana y compartir conocimientos sobre cultivo en espacios reducidos.',
      members: 850,
      category: 'Ecología',
      tags: ['Agricultura', 'Sostenibilidad', 'Urbano'],
      image: 'https://picsum.photos/800/400',
      avatar: 'https://picsum.photos/200',
      matchScore: 88,
    },
    {
      id: 3,
      name: 'Emprendedores Sociales',
      description: 'Red de emprendedores comprometidos con el impacto social y el desarrollo comunitario.',
      members: 2100,
      category: 'Negocios',
      tags: ['Emprendimiento', 'Social', 'Innovación'],
      image: 'https://picsum.photos/800/400',
      avatar: 'https://picsum.photos/200',
      matchScore: 82,
    },
  ];

  const renderCommunityCard = (community) => (
    <Card
      key={community.id}
      style={styles.card}
      onPress={() => navigation.navigate('CommunityDetail', { community })}
    >
      <Card.Cover source={{ uri: community.image }} />
      <View style={styles.matchBadge}>
        <Text style={styles.matchText}>{community.matchScore}% match</Text>
      </View>
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <Avatar.Image
            size={60}
            source={{ uri: community.avatar }}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Text variant="titleLarge" style={styles.name}>
              {community.name}
            </Text>
            <Text variant="bodyMedium" style={styles.category}>
              {community.category}
            </Text>
          </View>
        </View>

        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {community.description}
        </Text>

        <View style={styles.tags}>
          {community.tags.map((tag) => (
            <Chip key={tag} style={styles.tag}>
              {tag}
            </Chip>
          ))}
        </View>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.members}>
            {community.members} miembros
          </Text>
          <Button mode="contained-tonal">
            Ver Más
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Comunidades Sugeridas"
        showBack
        showSearch
        showFilter
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.subtitle}>
            Basado en tus intereses y actividad
          </Text>
          {suggestedCommunities.map(renderCommunityCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  subtitle: {
    marginBottom: 16,
    opacity: 0.7,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  matchText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  category: {
    opacity: 0.7,
  },
  description: {
    marginBottom: 16,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    margin: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  members: {
    opacity: 0.7,
  },
});
