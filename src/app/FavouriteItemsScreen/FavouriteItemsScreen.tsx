import { View, Text, Pressable } from 'react-native';
import {
  Header,
  SearchBar,
  ItemsGrid,
  PaginationControls,
  LoadingState,
} from '@/Components/UI';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';
import { useFavouriteItems } from '@/Hooks';
import { AntDesign } from '@expo/vector-icons';

export default function FavouriteItemsScreen() {
  const {
    items,
    loading,
    error,
    query,
    setQuery,
    page,
    setPage,
    total,
    clearFavourites,
  } = useFavouriteItems();

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#A01515',
          marginTop: 10
        }}
      >
        قائمة المفضلة
      </Text>

      {total > 0 && (
        <View style={{ alignItems: 'center', marginBottom: 5 }}>
          <Pressable
            onPress={clearFavourites}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            android_ripple={{ color: '#ccc' }}
          >
            <AntDesign name="delete" size={24} color="#A01515" />
          </Pressable>
        </View>
      )}

      {loading ? (
        <LoadingState message="جاري تحميل العناصر المفضلة..." />
      ) : error ? (
        <EmptyState title="حدث خطأ" subtitle={error} />
      ) : items.length === 0 ? (
        <EmptyState
          title={query ? "لا يوجد نتائج" : "قائمة المفضلة فارغة"}
          subtitle={
            query
              ? `لا يوجد نتائج تطابق "${query}" ضمن المفضلة.`
              : "لم تقم بإضافة أي منتجات بعد."
          }
        />
      ) : (
        <>
          <ItemsGrid items={items} origin="/FavouriteItemsScreen" />
          <PaginationControls
            page={page}
            hasMore={total > page * 10}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      )}
    </View>
  );
}
