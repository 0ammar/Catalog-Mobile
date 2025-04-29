import { StyleSheet } from 'react-native';
import { colors } from '@/Theme/colors';
import { spaces } from '@/Theme/spaces';
import { texts } from '@/Theme/texts';

export const styles = StyleSheet.create({
  container: {
    padding: spaces.md + 4,
    paddingBottom: spaces.xl + 18,
  },

  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spaces.md + 4,
  },

  invalidText: {
    fontSize: texts.medium,
    color: colors.mutedText,
    textAlign: 'center',
  },

  previewList: {
    marginTop: spaces.md + 4,
  },

  imageWrapper: {
    position: 'relative',
    marginBottom: spaces.md,
  },

  image: {
    width: '100%',
    height: 230,
    borderRadius: spaces.rMd - 4,
  },

  deleteIcon: {
    position: 'absolute',
    top: spaces.xs + 4,
    right: spaces.xs + 4,
    backgroundColor: '#fff',
    borderRadius: spaces.rFull,
    padding: spaces.xs,
    elevation: 4,
  },

  uploadBtn: {
    padding: spaces.md - 4,
    borderRadius: spaces.rMd,
    alignItems: 'center',
    marginTop: spaces.xl - 2,
  },

  uploadBtnText: {
    color: '#fff',
    fontSize: texts.regular,
  },

  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaces.xs,
  },
});
