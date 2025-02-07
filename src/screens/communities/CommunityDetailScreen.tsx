import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Text, Button, Chip, Avatar, IconButton, Surface, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/Header';
import { HorizontalCarousel } from '../../components/HorizontalCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 250;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type CommunityDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CommunityDetail'
>;

export const CommunityDetailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<CommunityDetailScreenNavigationProp>();
  const route = useRoute();
  const { community } = route.params;

  const upcomingEvents = [
    { id: 1, title: 'Reunión Mensual', date: '15 Feb 2025', attendees: 12 },
    { id: 2, title: 'Taller de Arte', date: '20 Feb 2025', attendees: 8 },
    { id: 3, title: 'Cena Comunitaria', date: '25 Feb 2025', attendees: 25 },
  ];

  const renderEventCard = ({ item }) => (
    <Surface style={styles.eventCard} elevation={2}>
      <Text variant="titleMedium" style={styles.eventTitle}>{item.title}</Text>
      <View style={styles.eventInfo}>
        <View style={styles.eventDetail}>
          <IconButton icon="calendar" size={20} />
          <Text variant="bodyMedium">{item.date}</Text>
        </View>
        <View style={styles.eventDetail}>
          <IconButton icon="account-group" size={20} />
          <Text variant="bodyMedium">{item.attendees} asistentes</Text>
        </View>
      </View>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
      >
        Ver Detalles
      </Button>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={community.name}
        showBack
        showMenu
        rightIcon="share-variant"
        onRightPress={() => {/* TODO: Implementar compartir */}}
      />
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={{ uri: community.coverImage }}
          style={styles.coverImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.communityInfo}>
            <Avatar.Image
              size={80}
              source={{ uri: community.avatar }}
              style={styles.avatar}
            />
            <View style={styles.infoContainer}>
              <Text variant="headlineMedium" style={styles.name}>
                {community.name}
              </Text>
              <Text variant="bodyLarge" style={styles.members}>
                {community.members} miembros
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              mode="contained"
              onPress={() => {/* TODO: Implementar unirse */}}
              style={styles.joinButton}
            >
              Unirse
            </Button>
            <IconButton
              icon="bell-outline"
              mode="contained"
              onPress={() => {/* TODO: Implementar notificaciones */}}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Sobre la Comunidad
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {community.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Intereses
            </Text>
            <View style={styles.tags}>
              {community.tags.map((tag) => (
                <Chip key={tag} style={styles.tag}>
                  {tag}
                </Chip>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Próximos Eventos
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Events')}
              >
                Ver Todos
              </Button>
            </View>
            <HorizontalCarousel
              data={upcomingEvents}
              renderItem={renderEventCard}
              itemWidth={SCREEN_WIDTH * 0.8}
            />
          </View>
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
  coverImage: {
    height: HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  communityInfo: {
    flexDirection: 'row',
    marginTop: -40,
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
    borderWidth: 4,
    borderColor: 'white',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  members: {
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  joinButton: {
    flex: 1,
    marginRight: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    margin: 4,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
  },
  eventTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventInfo: {
    marginBottom: 16,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
