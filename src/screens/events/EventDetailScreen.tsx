import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Button, Chip, Avatar, IconButton, Surface, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 200;

type EventDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventDetail'
>;

export const EventDetailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<EventDetailScreenNavigationProp>();
  const route = useRoute();
  const { eventId } = route.params;

  // TODO: Fetch event data from API
  const event = {
    id: eventId,
    title: 'Reunión Mensual de la Comunidad',
    date: '15 Feb 2025',
    time: '19:00 - 21:00',
    location: 'Centro Cultural La Casa',
    address: 'Av. Principal #123, Col. Centro',
    description: 'Únete a nuestra reunión mensual donde discutiremos los avances del proyecto y planearemos las actividades del próximo mes. Habrá café y bocadillos para todos los asistentes.',
    organizer: {
      name: 'María González',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Coordinadora',
    },
    attendees: [
      { id: 1, name: 'Juan Pérez', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 2, name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=25' },
      { id: 3, name: 'Carlos Ruiz', avatar: 'https://i.pravatar.cc/150?img=32' },
    ],
    coverImage: 'https://picsum.photos/800/400',
    tags: ['Reunión', 'Mensual', 'Planificación'],
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={event.title}
        showBack
        showMenu
        rightIcon="share-variant"
        onRightPress={() => {/* TODO: Implementar compartir */}}
      />
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={{ uri: event.coverImage }}
          style={styles.coverImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <View style={styles.content}>
          <Surface style={styles.dateCard} elevation={2}>
            <Text variant="headlineMedium" style={styles.date}>
              {event.date.split(' ')[0]}
            </Text>
            <Text variant="titleMedium" style={styles.month}>
              {event.date.split(' ')[1]}
            </Text>
          </Surface>

          <View style={styles.eventInfo}>
            <Text variant="headlineMedium" style={styles.title}>
              {event.title}
            </Text>

            <View style={styles.infoRow}>
              <IconButton icon="clock" size={24} />
              <Text variant="bodyLarge">{event.time}</Text>
            </View>

            <View style={styles.infoRow}>
              <IconButton icon="map-marker" size={24} />
              <View>
                <Text variant="bodyLarge">{event.location}</Text>
                <Text variant="bodyMedium" style={styles.address}>
                  {event.address}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Descripción
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {event.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Organizador
            </Text>
            <Surface style={styles.organizerCard} elevation={1}>
              <Avatar.Image
                size={50}
                source={{ uri: event.organizer.avatar }}
              />
              <View style={styles.organizerInfo}>
                <Text variant="titleMedium">{event.organizer.name}</Text>
                <Text variant="bodyMedium" style={styles.role}>
                  {event.organizer.role}
                </Text>
              </View>
              <Button
                mode="contained-tonal"
                onPress={() => {/* TODO: Implementar mensaje */}}
              >
                Mensaje
              </Button>
            </Surface>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Asistentes ({event.attendees.length})
              </Text>
              <Button
                mode="text"
                onPress={() => {/* TODO: Ver todos los asistentes */}}
              >
                Ver Todos
              </Button>
            </View>
            <View style={styles.attendees}>
              {event.attendees.map((attendee) => (
                <Avatar.Image
                  key={attendee.id}
                  size={40}
                  source={{ uri: attendee.avatar }}
                  style={styles.attendeeAvatar}
                />
              ))}
              <Avatar.Icon
                size={40}
                icon="plus"
                style={styles.moreAttendees}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Etiquetas
            </Text>
            <View style={styles.tags}>
              {event.tags.map((tag) => (
                <Chip key={tag} style={styles.tag}>
                  {tag}
                </Chip>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <Surface style={styles.bottomBar} elevation={4}>
        <Button
          mode="contained"
          style={styles.attendButton}
          contentStyle={styles.attendButtonContent}
          onPress={() => {/* TODO: Implementar asistencia */}}
        >
          Confirmar Asistencia
        </Button>
      </Surface>
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
  dateCard: {
    position: 'absolute',
    top: -40,
    right: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  date: {
    fontWeight: 'bold',
  },
  month: {
    opacity: 0.7,
  },
  eventInfo: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    opacity: 0.7,
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
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  organizerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  role: {
    opacity: 0.7,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    marginRight: 8,
  },
  moreAttendees: {
    opacity: 0.7,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    margin: 4,
  },
  bottomBar: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  attendButton: {
    borderRadius: 12,
  },
  attendButtonContent: {
    paddingVertical: 8,
  },
});
