import { StyleSheet } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.background,
    paddingVertical: spaces.xl - 4,
    paddingHorizontal: spaces.lg,
    borderRadius: spaces.rMd,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: texts.large,
    fontWeight: texts.fontWeightBold,
    color: colors.primary,
    marginBottom: spaces.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: texts.medium,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spaces.md,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spaces.xl,
    paddingVertical: spaces.md - 8,
    borderRadius: spaces.rFull / 8,
  },
  buttonText: {
    color: colors.background,
    fontWeight: texts.fontWeightBold,
    fontSize: texts.medium,
  },
});
