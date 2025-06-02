import { StyleSheet } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spaces.sm / 1.5,
    paddingHorizontal: spaces.md,
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    position: 'relative',
    
  },
  button: {
    paddingVertical: spaces.xs / 2,
    paddingHorizontal: spaces.sm,
    borderRadius: spaces.rSm,
  },
  pageInfo: {
    color: "#333",
    fontWeight: texts.fontWeightMedium,
    fontSize: texts.medium,
  },
});
