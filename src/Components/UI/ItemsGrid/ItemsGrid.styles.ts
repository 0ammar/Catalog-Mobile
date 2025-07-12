import { StyleSheet } from 'react-native';
import { spaces } from '@/Theme';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spaces.md,
    paddingTop: spaces.sm,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spaces.sm,
  },
  placeholder: {
    width: '48%',
  },
});
