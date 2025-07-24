import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './PaginationControls.styles';

type PaginationControlsProps = {
  page: number;
  hasMore: boolean;
  onNext: () => void;
  onBack: () => void;
};

export default function PaginationControls({
  page,
  hasMore,
  onNext,
  onBack,
}: PaginationControlsProps) {
  const start = (page - 1) * 30 + 1;
  const end = hasMore ? start + 29 : start;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        disabled={page === 1}
        style={[
          styles.button,
          page === 1 ? styles.disabledButton : styles.activeButton,
        ]}
      >
        <Icon name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        {start} - {end}
      </Text>

      <TouchableOpacity
        onPress={onNext}
        disabled={!hasMore}
        style={[
          styles.button,
          hasMore ? styles.activeButton : styles.disabledButton,
        ]}
      >
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
