import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/Theme/colors';
import { spaces } from '@/Theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    paddingHorizontal: spaces.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width,
    height: 180,
    marginBottom: spaces.xl,
  },

  description: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spaces.xs,
  },

  lineUnderTitle: {
    width: 260,
    height: 1.8,
    backgroundColor: colors.primary,
    borderRadius: 36,
    marginBottom: spaces.lg * 1.5,
  },

  form: {
    width: '100%',
    gap: 16,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    textAlign: 'right',
  },

  errorText: {
    color: '#d00',
    fontSize: 13,
    textAlign: 'right',
    marginTop: -8,
  },

  buttonGroup: {
    width: '100%',
    gap: 10,
    marginTop: 4,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    marginHorizontal: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: '700',
    
  },

  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },

  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 70,
  },
});
