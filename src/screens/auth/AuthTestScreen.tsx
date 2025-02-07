import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, Surface } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AuthTestScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, logout, user } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (!email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError('');
      await signIn(email, password);
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
      } else {
        setError(error.message || 'Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      console.log('Attempting to sign up with:', { email, password });
      await signUp(email, password);
      Alert.alert(
        'Registro exitoso',
        'Tu cuenta ha sido creada correctamente',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Sign up error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Ya existe una cuenta con este correo');
      } else if (error.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es muy débil');
      } else {
        setError(error.message || 'Error al registrarse');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError('');
      await logout();
    } catch (error: any) {
      console.error('Logout error:', error);
      setError(error.message || 'Error al cerrar sesión');
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
              Bienvenido a Commie
            </Text>
            <Text variant="titleLarge" style={styles.subtitle}>
              Tu espacio para conectar con comunidades
            </Text>

            {user ? (
              <View style={styles.container}>
                <Text variant="bodyLarge" style={styles.userInfo}>
                  Sesión iniciada como: {user.email}
                </Text>
                <Button 
                  mode="contained" 
                  onPress={handleLogout}
                  style={styles.button}
                  loading={loading}
                  disabled={loading}
                >
                  Cerrar Sesión
                </Button>
              </View>
            ) : (
              <View style={styles.container}>
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
                  error={!!error && error.includes('correo')}
                />
                <TextInput
                  label="Contraseña"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError('');
                  }}
                  secureTextEntry
                  mode="outlined"
                  style={styles.input}
                  disabled={loading}
                  error={!!error && error.includes('contraseña')}
                />
                {error ? (
                  <Text style={styles.error} variant="bodySmall">
                    {error}
                  </Text>
                ) : null}
                <Button 
                  mode="contained" 
                  onPress={handleSignIn}
                  style={styles.button}
                  loading={loading}
                  disabled={loading}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  mode="outlined" 
                  onPress={handleSignUp}
                  style={styles.button}
                  loading={loading}
                  disabled={loading}
                >
                  Registrarse
                </Button>
              </View>
            )}
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
  container: {
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
  error: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  userInfo: {
    textAlign: 'center',
    color: theme.colors.onSurface,
  },
});
