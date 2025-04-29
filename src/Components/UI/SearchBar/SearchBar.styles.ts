import { StyleSheet, Platform, I18nManager } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: spaces.md - 2,
    marginTop: spaces.md -15,
    marginBottom: spaces.sm - 5,
    paddingHorizontal: spaces.md - 2,
    height: spaces.hMd,
    borderTopLeftRadius: spaces.rXl,
    borderTopRightRadius: spaces.rMd,
    borderBottomLeftRadius: spaces.rMd,
    borderBottomRightRadius: spaces.rXl,
    borderWidth: 1,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginLeft: spaces.sm, 
  },
  clearIcon: {
    marginRight: spaces.sm, 
  },  
  spinner: {
    marginLeft: spaces.sm,
  },
  input: {
    flex: 1,
    fontSize: texts.regular,
    color: colors.text,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingVertical: Platform.OS === 'android' ? 6 : 10,
  },
});
