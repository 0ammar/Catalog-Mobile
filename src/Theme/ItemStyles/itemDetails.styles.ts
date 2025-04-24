import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/Theme/colors';

const { width, height } = Dimensions.get('window');
const imageSize = width - 60;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
  },

  card: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  closeButtonAbsolute: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },

  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    alignSelf: 'center',
  },

  noImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignSelf: 'center',
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },

  code: {
    fontSize: 13,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 2,
  },

  imageCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#e4e4e4',
    width: '85%',
    marginVertical: 12,
  },

  description: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 22,
  },

  buttonsInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
    width: '100%',
    gap: 80,
  },

  uploadBtn: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    elevation: 2,
  },

  editBtn: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 30,
    marginLeft: 10,
    elevation: 2,
  },

  uploadBtnText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },

  editBtnText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },

  loadingIndicator: {
    paddingVertical: 60,
  },

  errorText: {
    marginTop: 40,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  fullImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    width,
    height,
  },

  fullImage: {
    width: width * 0.9,
    height: height * 0.65,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
});
