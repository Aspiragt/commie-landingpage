import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { theme } from '../../styles/theme';
import { Header } from '../../components/Header';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header 
        title="Inicio"
        showBack={false}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text variant="headlineMedium" style={styles.welcomeText}>
            ¡Bienvenido a Commie!
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Tu espacio para conectar con comunidades
          </Text>
        </View>

        <Surface style={styles.featuredSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Actividad Reciente
          </Text>
          <Text variant="bodyMedium" style={styles.emptyStateText}>
            Aquí aparecerá la actividad de tus comunidades
          </Text>
        </Surface>

        <Surface style={styles.featuredSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Eventos Próximos
          </Text>
          <Text variant="bodyMedium" style={styles.emptyStateText}>
            No hay eventos próximos
          </Text>
        </Surface>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.m,
  },
  welcomeText: {
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
  },
  featuredSection: {
    margin: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  sectionTitle: {
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.m,
  },
  emptyStateText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    padding: theme.spacing.l,
  },
});
