import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Header, SearchBar, PaginationControls, LoadingState, ItemsGrid } from '@/Components/UI';
import { EmptyState } from '@/Components/Shared';

import { useSearchList, useSmartBack } from '@/Hooks';
import { getItems } from '@/Services/APIs/ItemsServices';

export default function ItemsScreen() {
  const { id, origin } = useLocalSearchParams<{ id: string; origin?: string }>();
  const numericId = Number(id);

  useSmartBack(origin || `/SubTwosScreen/${id}`);

  const {
    data: items,
    query,
    setQuery,
    triggerSearch,
    loading,
    error,
    page,
    setPage,
    hasMore,
  } = useSearchList(
    (page, searchTerm, id, type) => getItems(id, type, page, searchTerm),
    {
      id: numericId,
      type: 'subTwo',
      skipSearchIfEmpty: true,
    }
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      {loading ? (
        <LoadingState message="جاري تحميل الأصناف..." />
      ) : error ? (
        <EmptyState
          title="حدث خطأ ما"
          subtitle="يرجى التحقق من الاتصال أو المحاولة لاحقًا."
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="لم يتم العثور على أصناف"
          subtitle="حاول استخدام كلمة بحث مختلفة."
        />
      ) : (
        <>
          <ItemsGrid items={items} origin={`/Items/subTwo/${id}`} />
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
