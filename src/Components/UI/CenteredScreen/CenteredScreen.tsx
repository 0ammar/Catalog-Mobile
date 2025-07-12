import { SafeAreaView, View } from 'react-native';
import { styles } from './CenteredScreen.styles';

type CenteredScreenProps = {
  children: React.ReactNode;
};

export default function CenteredScreen({ children }: CenteredScreenProps) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}
