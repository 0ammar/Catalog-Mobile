import { ScrollView, View, Text } from 'react-native';
import { CategoryComponent } from '@/Components/UI';
import { styles } from './CategorySection.styles';

export function CategoryTitle({ name }: { name: string }) {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>{name}</Text>
      <View style={styles.titleUnderline} />
    </View>
  );
}

export function CategoryGridSection({
  data,
  onPress,
}: {
  data: { id: string; name: string; imageUrl: string }[];
  onPress: (id: string) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {data.map((item, index) => (
        <CategoryComponent
          key={`${item.id}-${item.name}-${index}`}
          name={item.name}
          imageUrl={item.imageUrl || ''}
          onPress={() => onPress(item.id)}
        />
      ))}
    </ScrollView>
  );
}
