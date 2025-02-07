import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, Button, Card, Chip } from 'react-native-paper';
import { theme } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Datos de ejemplo
const featuredCommunities = [
  {
    id: '1',
    name: 'Club de Fotografía CDMX',
    description: 'Grupo de entusiastas de la fotografía. Organizamos salidas fotográficas y talleres.',
    members: 234,
    category: 'Arte',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848'
  },
  {
    id: '2',
    name: 'Emprendedores Tech',
    description: 'Comunidad de emprendedores en tecnología. Networking y mentorías.',
    members: 456,
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998'
  },
  {
    id: '3',
    name: 'Ecología Urbana',
    description: 'Grupo dedicado a la conservación y mejora del medio ambiente en la ciudad.',
    members: 189,
    category: 'Medio Ambiente',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'
  },
];

export const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const CommunityCard = ({ community }) => (
    <Card style={styles.trendingCard}>
      <Image source={{ uri: community.image }} style={styles.cardImage} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge" style={styles.cardTitle}>{community.name}</Text>
        <Text variant="bodyMedium" style={styles.cardDescription}>
          {community.description}
        </Text>
        <View style={styles.metaContainer}>
          <MaterialCommunityIcons name="account-group" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.metaText}>{community.members}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, 'transparent']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => navigation.navigate('Onboarding')}
      >
        <MaterialCommunityIcons 
          name="close" 
          size={28} 
          color={theme.colors.textLight} 
        />
      </TouchableOpacity>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text variant="headlineMedium" style={styles.title}>Comunidades Destacadas</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Explora grupos increíbles en tu ciudad</Text>
          <View style={styles.categoryGrid}>
            {featuredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </View>
        </View>

        <View style={styles.createCommunityContainer}>
          <Text variant="titleMedium" style={styles.createCommunityTitle}>
            ¿Quieres crear tu propia comunidad?
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
            buttonColor={theme.colors.accent}
          >
            Crear una cuenta
          </Button>
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
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingTop: 40,
    paddingBottom: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: theme.spacing.m,
    textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
  },
  trendingCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    height: 150,
  },
  cardContent: {
    padding: theme.spacing.m,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.s,
    textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.m,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.m,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  createCommunityContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
    elevation: 4,
  },
  createCommunityTitle: {
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  button: {
    width: '100%',
    borderRadius: theme.borderRadius.m,
  },
});
