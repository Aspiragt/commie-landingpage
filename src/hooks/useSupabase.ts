import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Community } from '../types/database';

export const useSupabase = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      // Intentar obtener la primera comunidad (o un conteo)
      const { count, error: countError } = await supabase
        .from('communities')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      
      setIsConnected(true);
      setError(null);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error connecting to Supabase';
      setError(message);
      setIsConnected(false);
      return false;
    }
  };

  const createCommunity = async (community: Partial<Community>) => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .insert(community)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating community';
      return { data: null, error: message };
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return {
    isConnected,
    error,
    testConnection,
    createCommunity,
  };
};
