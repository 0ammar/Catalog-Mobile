import { View, FlatList } from 'react-native';
import ItemCard from '../ItemCard/ItemCard';
import { Item } from '@/Types';
import { styles } from './ItemsGrid.styles';

type ItemsGridProps = {
  items: Item[];
  origin?: string;
};

export default function ItemsGrid({ items, origin }: ItemsGridProps) {
  const displayedItems = items.length === 1 ? [null, ...items] : items;

  const uniqueKeys = new Set(items.map(i => i.itemNo));
  if (uniqueKeys.size !== items.length) {
    console.warn("⚠️ في عناصر مكررة بـ itemNo داخل ItemsGrid", items);
  }

  return (
    <FlatList
      data={displayedItems}
      keyExtractor={(item, index) =>
        item ? `${item.itemNo}-${index}` : `placeholder-${index}`
      }
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) =>
        item
          ? <ItemCard item={item} origin={origin} />
          : <View style={styles.placeholder} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
