import { SafeAreaView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import {
  Header,
  SearchBar,
  PaginationControls,
  LoadingState,
  ItemsGrid,
} from '@/Components/UI';
import { EmptyState } from '@/Components/Shared';

import { useSearchList, useSmartBack } from '@/Hooks';
import { getItems } from '@/Services/APIs/ItemsServices';

export default function ItemsScreen() {
  const {
    id,
    groupId,
    subOneId,
    subTwoId,
    subThreeId,
    origin,
  } = useLocalSearchParams<{
    id?: string;
    groupId?: string;
    subOneId?: string;
    subTwoId?: string;
    subThreeId?: string;
    origin?: string;
  }>();

  const parsedGroupId = groupId?.trim() || undefined;
  const parsedSubOneId = subOneId?.trim() || undefined;
  const parsedSubTwoId = subTwoId?.trim() || undefined;
  const parsedSubThreeId = subThreeId?.trim() || id?.trim() || undefined;

  // 🧠 Smart back
  useSmartBack(origin || '/');

  // 🔍 Fetch items
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
    (page, term) =>
      getItems(
        parsedGroupId,
        parsedSubOneId,
        parsedSubTwoId,
        parsedSubThreeId,
        page,
        30,
        term
      ),
    {
      groupId: parsedGroupId,
      subOneId: parsedSubOneId,
      subTwoId: parsedSubTwoId,
      subThreeId: parsedSubThreeId,
      skipSearchIfEmpty: false,
    }
  );

  const isEmpty =
    !loading &&
    !error &&
    query.trim() === searchTerm &&
    items.length === 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      ) : isEmpty ? (
        <EmptyState
          title="لم يتم العثور على أصناف"
          subtitle="حاول استخدام كلمة بحث مختلفة."
        />
      ) : (
        <>
          <ItemsGrid
            items={items}
            origin={origin || `/Items/subThree/${parsedSubThreeId}`}
          />
          <PaginationControls
            page={page}
            hasMore={hasMore}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      )}
    </SafeAreaView>
  );
}
