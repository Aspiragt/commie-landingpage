import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a237e', '#0d47a1', '#01579b']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInUp.delay(200).springify()} 
            style={styles.logoContainer}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <Text variant="headlineLarge" style={styles.title}>
                Commie
              </Text>
              <Text variant="titleLarge" style={styles.subtitle}>
                Tu espacio para conectar con comunidades
              </Text>
            </Animated.View>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(600).springify()}
            style={styles.buttonContainer}
          >
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Auth')}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Comenzar
            </Button>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.l,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: theme.spacing.l,
  },
  title: {
    color: theme.colors.surfaceLight,
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    color: theme.colors.surfaceLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: theme.spacing.l,
  },
  button: {
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceLight,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
