import { StyleSheet } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
    paddingBottom: 20,
    marginTop: spaces.screenMargin,
    marginBottom: spaces.screenMargin ,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: spaces.sm + 2,
    marginBottom: spaces.md,
  },
  titleText: {
    fontSize: texts.large,
    fontWeight: texts.fontWeightBold,
    color: colors.text,
  },
  titleUnderline: {
    height: 2,
    width: '60%',
    backgroundColor: colors.borderDark,
    borderRadius: spaces.rFull,
    marginTop: spaces.xs + 2,
  },
});
