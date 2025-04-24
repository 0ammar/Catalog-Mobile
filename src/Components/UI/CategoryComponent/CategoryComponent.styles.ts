import { StyleSheet, Dimensions } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

const size = Dimensions.get('window').width / 2 - 35;

export const styles = StyleSheet.create({
  card: {
    width: size,
    alignItems: 'center',
    backgroundColor: "white",
    borderTopLeftRadius: spaces.rMd,
    borderTopRightRadius: spaces.rXl,
    borderBottomLeftRadius: spaces.rXl,
    borderBottomRightRadius: spaces.rMd,
    paddingVertical: spaces.md,
    marginBottom: spaces.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrapper: {
    width: 100,
    height: 80,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 0,
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    textAlign: 'center',
  },
  name: {
    margin: 0,
    paddingVertical: 0,
    paddingLeft: spaces.sm,
    textAlign: 'center',
    fontSize: texts.regular,
    fontWeight: texts.fontWeightBold,
    color: colors.text,
  },
});
