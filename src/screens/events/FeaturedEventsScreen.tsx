import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Header } from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

type FeaturedEventsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FeaturedEvents'
>;

export const FeaturedEventsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<FeaturedEventsScreenNavigationProp>();

  // TODO: Fetch featured events from API
  const featuredEvents = [
    {
      id: 1,
      title: 'Festival Cultural 2025',
      date: '20 Mar 2025',
      time: '10:00 - 22:00',
      location: 'Parque Central',
      description: 'Gran festival cultural con música en vivo, exposiciones de arte, gastronomía local y actividades para toda la familia.',
      image: 'https://picsum.photos/800/400',
      tags: ['Festival', 'Cultura', 'Música'],
      attendees: 250,
    },
    {
      id: 2,
      title: 'Taller de Agricultura Urbana',
      date: '15 Feb 2025',
      time: '16:00 - 19:00',
      location: 'Jardín Botánico',
      description: 'Aprende técnicas de agricultura urbana y cómo crear tu propio huerto en casa.',
      image: 'https://picsum.photos/800/400',
      tags: ['Taller', 'Ecología', 'Agricultura'],
      attendees: 30,
    },
    {
      id: 3,
      title: 'Foro de Innovación Social',
      date: '5 Mar 2025',
      time: '09:00 - 18:00',
      location: 'Centro de Convenciones',
      description: 'Únete a expertos y emprendedores sociales para discutir soluciones innovadoras a problemas comunitarios.',
      image: 'https://picsum.photos/800/400',
      tags: ['Foro', 'Innovación', 'Social'],
      attendees: 150,
    },
  ];

  const renderEventCard = (event) => (
    <Card
      key={event.id}
      style={styles.card}
      onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
    >
      <Card.Cover source={{ uri: event.image }} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.dateChip}>
          <Chip icon="calendar">{event.date}</Chip>
        </View>
        <Text variant="titleLarge" style={styles.title}>
          {event.title}
        </Text>
        <View style={styles.eventInfo}>
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.time}>
              {event.time}
            </Text>
            <Text variant="bodyMedium" style={styles.location}>
              {event.location}
            </Text>
          </View>
          <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
            {event.description}
          </Text>
        </View>
        <View style={styles.tags}>
          {event.tags.map((tag) => (
            <Chip key={tag} style={styles.tag}>
              {tag}
            </Chip>
          ))}
        </View>
        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.attendees}>
            {event.attendees} asistentes
          </Text>
          <Button mode="contained-tonal">
            Ver Detalles
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Eventos Destacados"
        showBack
        showSearch
        showFilter
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {featuredEvents.map(renderEventCard)}
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  dateChip: {
    position: 'absolute',
    top: -20,
    left: 16,
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  eventInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  time: {
    marginRight: 16,
    opacity: 0.7,
  },
  location: {
    opacity: 0.7,
  },
  description: {
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
  attendees: {
    opacity: 0.7,
  },
});
