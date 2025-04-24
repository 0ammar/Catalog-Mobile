// inputField.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 2,
    textAlign: 'right',
  },
  errorText: {
    color: '#d00',
    fontSize: 13,
    textAlign: 'right',
    marginTop: 2,
  },
});
