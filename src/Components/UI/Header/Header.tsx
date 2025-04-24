import { View, Image } from 'react-native';
import { styles } from './Header.styles';

export default function Header(): JSX.Element {
  return (
    <View style={styles.header}>
      {/* Left line */}
      <View style={styles.sideLineLeft} />

      {/* Right line */}
      <View style={styles.sideLineRight} />

      {/* Logo */}
      <Image
        source={require('@/Assets/images/header.png')}
        style={styles.logo}
      />
    </View>
  );
}
