import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { theme } from '../../styles/theme';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        'Correo enviado',
        'Se ha enviado un correo para restablecer tu contraseña',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      console.error('Reset password error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo');
      } else if (error.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido');
      } else {
        setError('Error al enviar el correo');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Surface style={styles.surface}>
            <Text variant="headlineMedium" style={styles.title}>
              Recuperar contraseña
            </Text>
            <Text variant="titleLarge" style={styles.subtitle}>
              Te enviaremos un correo para restablecer tu contraseña
            </Text>

            <View style={styles.form}>
              <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={(text) => {
                  setEmail(text.trim());
                  setError('');
                }}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                disabled={loading}
                error={!!error}
              />

              {error ? (
                <Text style={styles.error} variant="bodySmall">
                  {error}
                </Text>
              ) : null}

              <Button 
                mode="contained" 
                onPress={handleResetPassword}
                style={styles.button}
                loading={loading}
                disabled={loading}
              >
                Enviar correo
              </Button>

              <Button 
                mode="text"
                onPress={() => navigation.goBack()}
                style={styles.textButton}
                disabled={loading}
              >
                Volver
              </Button>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.m,
  },
  surface: {
    padding: theme.spacing.l,
    borderRadius: 16,
    elevation: 2,
  },
  form: {
    gap: theme.spacing.m,
  },
  title: {
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  input: {
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 20,
  },
  textButton: {
    borderRadius: 20,
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
  },
});
