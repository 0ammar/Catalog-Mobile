import { View, Text } from 'react-native';
import { Header, SearchBar, ItemsGrid, PaginationControls, LoadingState } from '@/Components/UI';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';
import { useSearchList, useSmartBack } from '@/Hooks';
import { getItemsByStatus } from '@/Services/APIs/ItemsServices';

const FOCUSED_STATUS_ID = 4;

export default function FocusedItemsScreen() {
  useSmartBack('/GroupsScreen/GroupsScreen');

  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    page,
    setPage,
    hasMore,
    loading,
    error,
  } = useSearchList(
    (page) => getItemsByStatus(FOCUSED_STATUS_ID, page),
    { skipSearchIfEmpty: false }
  );

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEmpty = query.trim() === searchTerm && filteredItems.length === 0;

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      <Text style={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#A01515',
      }}>
        الأصناف المميزة
      </Text>

      {loading ? (
        <LoadingState message="جاري تحميل الأصناف..." />
      ) : error ? (
        <EmptyState
          title="حدث خطأ ما"
          subtitle="يرجى التحقق من الاتصال أو المحاولة لاحقًا."
        />
      ) : isEmpty ? (
        <EmptyState
          title="لا يوجد أصناف مميزة"
          subtitle="لم يتم العثور على أصناف ضمن هذه الفئة."
        />
      ) : (
        <>
          <ItemsGrid items={filteredItems} origin="/FocusedItemsScreen/FocusedItemsScreen" />
          <PaginationControls
            page={page}
            hasMore={hasMore}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      )}
    </View>
  );
}
