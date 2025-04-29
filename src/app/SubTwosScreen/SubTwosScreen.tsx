import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenContainer, SearchBar } from '@/Components/UI';
import { CategoryGridSection, CategoryTitle, SearchResults } from '@/Components/Shared';

import { useSubTwos, useSearchList, useSmartBack } from '@/Hooks';
import { getItems, getSubOnes, getSubThrees } from '@/Services/APIs';
import { Item } from '@/Types';

export default function SubTwoScreen() {
  const router = useRouter();
  const { subOneId, origin } = useLocalSearchParams<{ subOneId: string; origin?: string }>();
  const id = Number(subOneId);

  useSmartBack(origin || `/SubOnesScreen/${id}`);

  const {
    data: subTwos = [],
    loading: loadingSubTwos,
    error: errorSubTwos,
  } = useSubTwos(id);

  // ✅ تعديل: البحث العام بدون ID أو Type
  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    loading: loadingItems,
    error: errorItems,
    page,
    setPage,
    hasMore,
  } = useSearchList<Item>(
    (page, searchTerm) => getItems(undefined, undefined, page, searchTerm),
    { skipSearchIfEmpty: true }
  );

  const [subOneName, setSubOneName] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(false);

  useEffect(() => {
    if (!query) {
      getSubOnes(id)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setSubOneName(data[0].name);
          }
        })
        .catch(() => {});
    }
  }, [id]);

  const handleSubTwoPress = async (subTwoId: number) => {
    try {
      setInternalLoading(true);

      const [itemsData, subThreesData] = await Promise.all([
        getItems(subTwoId, 'subTwo', 1),
        getSubThrees(subTwoId),
      ]);

      const target =
        (Array.isArray(itemsData) && itemsData.length > 0) ||
        (Array.isArray(subThreesData) && subThreesData.length === 0)
          ? '/Items/subTwo/[id]'
          : '/SubThreesScreen/[subTwoId]';

      router.push({
        pathname: target,
        params: {
          id: subTwoId,
          subTwoId,
          origin: `/SubTwosScreen/${id}`,
        },
      });
    } catch {
      setInternalError(true);
    } finally {
      setInternalLoading(false);
    }
  };

  const loading = loadingItems || loadingSubTwos || internalLoading;
  const error = errorItems || errorSubTwos || internalError;

  const showSearchResults = !!searchTerm;
  const showSubTwos = !searchTerm && Array.isArray(subTwos) && subTwos.length > 0;

  const isEmptySearch =
    showSearchResults && query.trim() === searchTerm && items.length === 0;
  const isEmptySubTwos = !searchTerm && Array.isArray(subTwos) && subTwos.length === 0;

  return (
    <ScreenContainer
      loading={loading}
      error={!!error}
      empty={isEmptySearch || isEmptySubTwos}
      emptyTitle={isEmptySearch ? 'لا توجد أصناف مطابقة' : 'لا توجد تصنيفات فرعية'}
      emptySubtitle={
        isEmptySearch
          ? 'حاول البحث باسم أو رقم صنف مختلف.'
          : 'لا توجد تصنيفات فرعية ضمن هذا القسم.'
      }
    >
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      {!query && subOneName && <CategoryTitle name={subOneName} />}

      {showSearchResults ? (
        <SearchResults
          items={items}
          page={page}
          hasMore={hasMore}
          setPage={setPage}
          origin={`/SubTwosScreen/${id}`}
        />
      ) : showSubTwos ? (
        <CategoryGridSection data={subTwos} onPress={handleSubTwoPress} />
      ) : null}
    </ScreenContainer>
  );
}
