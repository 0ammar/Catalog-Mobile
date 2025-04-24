import { StyleSheet, Dimensions } from 'react-native';
import { colors, spaces, texts } from '@/Theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    paddingHorizontal: spaces.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: spaces.lg,
    opacity: 0.8,
  },
  title: {
    fontSize: texts.large + 1,
    fontWeight: texts.fontWeightBold,
    color: colors.error,
    marginBottom: spaces.xs + 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: texts.medium,
    color: colors.mutedText,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: '#111', // intentionally kept dark
    borderRadius: spaces.rMd,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: spaces.sm + 4,
    right: spaces.sm + 4,
    zIndex: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
