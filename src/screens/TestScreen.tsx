import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSupabase } from '../hooks/useSupabase';

export const TestScreen = () => {
  const { isConnected, error, testConnection, createCommunity } = useSupabase();

  const handleTestCreate = async () => {
    const testCommunity = {
      name: 'Test Community',
      category: 'test',
      description: 'This is a test community',
      creator_id: 'test-user', // Esto fallará porque necesitamos auth
    };

    const { data, error } = await createCommunity(testCommunity);
    if (error) {
      console.error('Error creating community:', error);
    } else {
      console.log('Community created:', data);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Supabase Connection Test</Text>
      <Text variant="bodyLarge" style={styles.status}>
        Status: {isConnected ? '✅ Connected' : '❌ Not Connected'}
      </Text>
      {error && (
        <Text variant="bodyMedium" style={styles.error}>
          Error: {error}
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="contained" onPress={testConnection} style={styles.button}>
          Test Connection
        </Button>
        <Button 
          mode="contained" 
          onPress={handleTestCreate}
          style={styles.button}
          disabled={!isConnected}
        >
          Test Create Community
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    marginVertical: 16,
  },
  buttons: {
    gap: 16,
  },
  button: {
    minWidth: 200,
  },
});
