import { StyleSheet, Dimensions } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spaces.lg,
  },
  animation: {
    width: width / 1.7,
    height: width / 1.7,
  },
  text: {
    fontSize: texts.regular,
    marginTop: -50,
    color: colors.text,
    fontWeight: texts.fontWeightMedium,
    textAlign: 'center',
  },
});
