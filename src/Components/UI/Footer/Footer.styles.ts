import { StyleSheet, Dimensions } from "react-native";


const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: width < 400 ? 20 : 120,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
    flexWrap: 'wrap',
    gap: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  text: {
    fontSize: width < 360 ? 9 : width < 400 ? 11 : 14,
    color: '#333',
  },
});
