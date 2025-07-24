import {  Text, SafeAreaView } from 'react-native';
import {
  Header,
  SearchBar,
  ItemsGrid,
  PaginationControls,
  LoadingState,
} from '@/Components/UI';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';
import { useSearchList, useSmartBack } from '@/Hooks';
import { getItemsByStatus } from '@/Services/APIs/ItemsServices';
import { Item } from '@/Types';

const FOCUSED_STATUS_ID = '4';

export default function FocusedItemsScreen() {
  useSmartBack('/GroupsScreen');

  const {
    data: items,
    query,
    setQuery,
    page,
    setPage,
    hasMore,
    loading,
    error,
  } = useSearchList<Item>(
    (page) => getItemsByStatus(FOCUSED_STATUS_ID, page),
    { isStatusSearch: true, skipSearchIfEmpty: false }
  );

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.itemNo?.toLowerCase().includes(query.toLowerCase())
  );

  const isEmpty = query.trim() !== '' && filteredItems.length === 0;

  if (loading) {
    return <LoadingState message="جاري تحميل الأصناف..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="حدث خطأ ما"
        subtitle="يرجى التحقق من الاتصال أو المحاولة لاحقًا."
      />
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        title="لا يوجد أصناف مميزة"
        subtitle="لم يتم العثور على أصناف ضمن هذه الفئة."
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          marginVertical: 10,
          color: '#A01515',
        }}
      >
        الأصناف المميزة
      </Text>

      <ItemsGrid items={filteredItems} origin="/FocusedItemsScreen" />

      <PaginationControls
        page={page}
        hasMore={hasMore}
        onNext={() => setPage((p) => p + 1)}
        onBack={() => setPage((p) => Math.max(1, p - 1))}
      />
    </SafeAreaView>
  );
}
