import { DefaultTheme } from 'react-native-paper';

export interface AppTheme {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    onSecondary: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    shadow: string;
    accent: string;
    textSecondary: string;
    surfaceLight: string;
    text: string;
    textLight: string;
    highlight: string;
    error: string;
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  borderRadius: {
    s: number;
    m: number;
    l: number;
    xl: number;
    circular: number;
  };
  elevation: {
    none: number;
    small: number;
    medium: number;
    large: number;
  };
}

const theme: AppTheme = {
  colors: {
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    background: '#1C1B1F',
    onBackground: '#E6E1E5',
    surface: '#2B2930',
    onSurface: '#E6E1E5',
    surfaceVariant: '#49454F',
    onSurfaceVariant: '#CAC4D0',
    shadow: '#000000',
    accent: '#9B4F96',
    textSecondary: '#94A3B8',
    surfaceLight: '#FFFFFF',
    text: '#FFFFFF',
    textLight: '#FAF3E0',
    highlight: '#F4A261',
    error: '#E06C3C',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    circular: 9999,
  },
  elevation: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
};

declare global {
  namespace ReactNativePaper {
    interface Theme extends AppTheme {}
  }
}

export { theme };
