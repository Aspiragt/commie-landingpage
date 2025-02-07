import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { theme } from '../../styles/theme';

export const CreateCommunityScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header 
        title="Crear Comunidad"
        showBack={true}
      />

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <TextInput
            label="Nombre de la comunidad"
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Descripción"
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <TextInput
            label="Ubicación"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Categorías (separadas por coma)"
            mode="outlined"
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button 
              mode="contained"
              style={styles.button}
              onPress={() => {}}
            >
              Crear Comunidad
            </Button>
          </View>
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
  content: {
    flex: 1,
  },
  form: {
    padding: theme.spacing.l,
  },
  input: {
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  buttonContainer: {
    marginTop: theme.spacing.l,
  },
  button: {
    padding: theme.spacing.s,
  },
});
