import { StyleSheet, Platform } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spaces.sm,
    paddingHorizontal: spaces.md,
    backgroundColor: colors.surface,
    borderTopStartRadius: spaces.rLg,
    borderTopEndRadius: spaces.rLg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    ...Platform.select({
      android: {
        elevation: 8,
      },
    }),
    zIndex: 10,
  },

  button: {
    paddingVertical: spaces.xs,
    paddingHorizontal: spaces.sm,
    borderRadius: spaces.rSm,
  },

  activeButton: {
    backgroundColor: colors.primary,
  },

  disabledButton: {
    backgroundColor: colors.borderDark,
  },

  pageInfo: {
    color: colors.mutedText,
    fontSize: texts.medium,
    fontWeight: texts.fontWeightMedium,
  },
});
