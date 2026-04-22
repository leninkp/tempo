import { Platform } from 'react-native';

export const T = {
  bg: '#000000',
  card: '#111111',
  cardDark: '#0b0b0b',
  border: 'rgba(255,255,255,0.08)',
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.55)',
  dim: 'rgba(255,255,255,0.35)',
  lime: '#C6F24E',
  amber: '#F2B84E',
  coral: '#F27B4E',
  mint: '#6EE7B7',
  fg: Platform.select({ ios: 'System', android: 'sans-serif' }) as string,
  mono: Platform.select({ ios: 'Menlo', android: 'monospace' }) as string,
};
