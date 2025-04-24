import { StyleSheet } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: spaces.md,
    paddingVertical: spaces.sm / 1.5,
    borderTopRightRadius: spaces.rFull,
    borderTopLeftRadius: spaces.rFull,
    borderWidth: .08,
    borderBottomColor: colors.background,
    borderBottomWidth: 0
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
