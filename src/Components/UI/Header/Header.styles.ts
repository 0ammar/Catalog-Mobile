import { StyleSheet } from 'react-native';
import { colors, spaces } from '@/Theme';

export const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingVertical: spaces.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: spaces.rLg,
    borderBottomEndRadius: spaces.rLg,
    zIndex: 10,
    paddingTop: 8,
    paddingBottom: 8,
    position: 'relative',
    backgroundColor: colors.background,
    alignContent: 'center',
    textAlign: 'center',
  },

  logo: {
    width: 200,
    height: 55,
    resizeMode: 'contain',
    marginBottom: -2,
  },

  sideLineLeft: {
    position: 'absolute',
    left: 25,
    top: '100%',
    width: 100,
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  sideLineRight: {
    position: 'absolute',
    right: 25,
    top: '100%',
    width: 100,
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
