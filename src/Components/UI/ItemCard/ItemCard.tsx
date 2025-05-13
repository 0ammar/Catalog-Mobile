import { Text, Image, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Item } from '@/Types';
import { styles } from './ItemCard.styles';

type ItemCardProps = {
  item: Item;
  origin?: string;
};

export default function ItemCard({ item, origin }: ItemCardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/ItemDetails/[itemNo]',
      params: {
        itemNo: item.itemNo,
        origin: origin ?? '/GroupsScreen',
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.firstImage }}
          style={styles.image}
          resizeMode="cover"
        />
        
      </View>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.code}>{item.itemNo}</Text>
      {item.status?.iconUrl && (
          <Image source={{ uri: item.status.iconUrl }} style={styles.statusIcon} />
        )}
    </TouchableOpacity>
  );
}