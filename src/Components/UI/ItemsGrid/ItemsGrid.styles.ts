import { StyleSheet } from 'react-native';
import { spaces } from '@/Theme';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spaces.md,
    paddingTop: spaces.xs,
    paddingBottom: spaces.xs / 2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  placeholder: {
    width: '48%',
  },
});
