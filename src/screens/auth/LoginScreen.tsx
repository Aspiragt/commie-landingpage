import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, TextInput, Text, Surface, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { theme } from '../../styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1006980871771-7k5c0vq7q4kf0ld4c7oo9aqk2vf9l0uh.apps.googleusercontent.com',
    });
  }, []);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
      } else {
        setError('Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error('Google login error:', error);
      setError('Error al iniciar sesión con Google');
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
                error={!!error && error.includes('contraseña')}
              />

              {error ? (
                <Text style={styles.error} variant="bodySmall">
                  {error}
                </Text>
              ) : null}

              <Button 
                mode="contained" 
                onPress={handleEmailLogin}
                style={styles.button}
                loading={loading}
                disabled={loading}
              >
                Iniciar Sesión
              </Button>

              <Button 
                mode="text"
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.textButton}
                disabled={loading}
              >
                ¿Olvidaste tu contraseña?
              </Button>

              <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
                <Text variant="bodySmall" style={styles.dividerText}>O</Text>
                <Divider style={styles.divider} />
              </View>

              <Button 
                mode="outlined"
                onPress={handleGoogleLogin}
                style={styles.googleButton}
                disabled={loading}
                icon={({ size, color }) => (
                  <MaterialCommunityIcons name="google" size={size} color={color} />
                )}
              >
                Continuar con Google
              </Button>

              <View style={styles.registerContainer}>
                <Text variant="bodyMedium" style={styles.registerText}>
                  ¿No tienes una cuenta?
                </Text>
                <Button 
                  mode="text"
                  onPress={() => navigation.navigate('Register')}
                  style={styles.textButton}
                  disabled={loading}
                >
                  Regístrate
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
  googleButton: {
    borderRadius: 20,
    borderColor: theme.colors.primary,
  },
  textButton: {
    borderRadius: 20,
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.m,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: theme.spacing.m,
    color: theme.colors.onSurfaceVariant,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.s,
  },
  registerText: {
    color: theme.colors.onSurfaceVariant,
  },
});
