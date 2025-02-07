import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={theme.colors.gradients.sunset}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text variant="displayLarge" style={styles.title}>Commie</Text>
          <Text variant="headlineSmall" style={styles.subtitle}>Construye tu comunidad</Text>
        </View>

        <View style={styles.featuresContainer}>
          <FeatureCard
            title="Descubre Comunidades"
            description="Explora grupos y eventos que comparten tus intereses y pasiones"
          />
          <FeatureCard
            title="Crea Eventos"
            description="Organiza encuentros y actividades para conectar con personas afines"
          />
          <FeatureCard
            title="Construye Conexiones"
            description="Forma parte de una red de personas que buscan hacer la diferencia"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
            contentStyle={styles.buttonContent}
            buttonColor={theme.colors.accent}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Explore')}
            style={[styles.button, styles.buttonOutline]}
            contentStyle={styles.buttonContent}
            textColor={theme.colors.surfaceLight}
          >
            <Text style={styles.buttonOutlineText}>Explorar Comunidades</Text>
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>Registrate</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <View style={styles.featureCard}>
    <Text variant="titleLarge" style={styles.featureTitle}>{title}</Text>
    <Text variant="bodyLarge" style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.l,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: theme.spacing.l,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.spacing.m,
    textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
    lineHeight: 26,
  },
  buttonsContainer: {
    gap: theme.spacing.m,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonOutlineText: {
    color: theme.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
  },
  footerText: {
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.s,
  },
  footerLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  featureCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.m,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featureTitle: {
    color: theme.colors.textLight,
    marginBottom: theme.spacing.s,
    fontWeight: '600',
  },
  featureDescription: {
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.1,
    paddingBottom: height * 0.05,
  },
  featuresContainer: {
    padding: theme.spacing.l,
    gap: theme.spacing.l,
  },
  actionContainer: {
    padding: theme.spacing.l,
    gap: theme.spacing.m,
  },
  buttonContent: {
    paddingVertical: theme.spacing.m,
  },
});
