import { StyleSheet } from 'react-native';
import { colors, spaces } from '@/Theme';

export const styles = StyleSheet.create({
  header: {
    height: 65,
    paddingVertical: spaces.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: spaces.rLg,
    borderBottomEndRadius: spaces.rLg,
    zIndex: 10,
    position: 'relative',
    backgroundColor: colors.background,
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
    bottom: '60%',
    width: 100,
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    elevation: 5,
  },

  sideLineRight: {
    position: 'absolute',
    right: 25,
    bottom: '60%',
    width: 100,
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    elevation: 5,
  },

  userIcon: {
    position: 'absolute',
    left: 65,
    top: 10,
    zIndex: 20,
  },

  focusedIcon: {
    position: 'absolute',
    right: 65,
    top: 10,
    zIndex: 20,
  },

  newIcon: {
    position: 'absolute',
    right: 25,
    top: 10,
    zIndex: 20,
  },

  profileIcon: {
    position: 'absolute',
    left: 65,
    top: 10,
    zIndex: 20,
  },

  logoutIcon: {
    position: 'absolute',
    left: 25,
    top: 10,
    zIndex: 20,
  },

  iconImage: {
    width: 25,
    height: 25,
  },
});
