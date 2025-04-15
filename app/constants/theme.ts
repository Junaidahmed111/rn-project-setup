import {DefaultTheme} from 'react-native-paper';
import {s} from 'react-native-size-matters';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    accent: '#FF2D55',
    background: '#f8f9fa',
    surface: '#FFFFFF',
    text: '#1a1a1a',
    subText: '#666666',
    error: '#FF3B30',
    success: '#34C759',
    card: '#FFFFFF',
    border: '#E5E5E5',
  },
  spacing: {
    xs: s(4),
    s: s(8),
    m: s(16),
    l: s(24),
    xl: s(32),
  },
  roundness: s(12),
};

export const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A84FF',
    accent: '#FF375F',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    subText: '#8E8E93',
    error: '#FF453A',
    success: '#32D74B',
    card: '#2C2C2E',
    border: '#3A3A3C',
  },
  spacing: lightTheme.spacing,
  roundness: lightTheme.roundness,
};
