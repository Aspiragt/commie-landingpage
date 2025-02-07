import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { theme } from '../../styles/theme';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return false;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (!email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert(
        'Registro exitoso',
        'Tu cuenta ha sido creada correctamente',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Register error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Ya existe una cuenta con este correo');
      } else if (error.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es muy débil');
      } else {
        setError('Error al registrarse');
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
              Crear cuenta
            </Text>
            <Text variant="titleLarge" style={styles.subtitle}>
              Únete a la comunidad
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
                error={!!error && (error.includes('contraseña') || error.includes('coinciden'))}
              />
              <TextInput
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError('');
                }}
                secureTextEntry
                mode="outlined"
                style={styles.input}
                disabled={loading}
                error={!!error && error.includes('coinciden')}
              />

              {error ? (
                <Text style={styles.error} variant="bodySmall">
                  {error}
                </Text>
              ) : null}

              <Button 
                mode="contained" 
                onPress={handleRegister}
                style={styles.button}
                loading={loading}
                disabled={loading}
              >
                Crear cuenta
              </Button>

              <View style={styles.loginContainer}>
                <Text variant="bodyMedium" style={styles.loginText}>
                  ¿Ya tienes una cuenta?
                </Text>
                <Button 
                  mode="text"
                  onPress={() => navigation.goBack()}
                  style={styles.textButton}
                  disabled={loading}
                >
                  Inicia sesión
                </Button>
              </View>
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.s,
  },
  loginText: {
    color: theme.colors.onSurfaceVariant,
  },
});
