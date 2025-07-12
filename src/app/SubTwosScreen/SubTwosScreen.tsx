import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenContainer, SearchBar } from '@/Components/UI';
import { CategoryGridSection, CategoryTitle, SearchResults } from '@/Components/Shared';

import { useSubTwos, useSearchList, useSmartBack, useSubOnes } from '@/Hooks';
import { getItems, getSubThrees, searchItemsGlobal } from '@/Services/APIs';
import { Item, SubTwo } from '@/Types';
import { View } from 'react-native';


export default function SubTwosScreen() {
  const router = useRouter();
  const { subOneId, groupId, origin } = useLocalSearchParams<{
    subOneId: string;
    groupId: string;
    origin?: string;
  }>();

  useSmartBack(origin || `/SubOnesScreen/${subOneId}`);

  const [subOneName, setSubOneName] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(false);

  const { data: subOnes } = useSubOnes(groupId);
  useEffect(() => {
    const found = subOnes?.find((s) => s.id === subOneId);
    setSubOneName(found?.name ?? null);
  }, [subOnes]);

  const {
    data: rawSubTwos,
    loading: loadingSubTwos,
    error: errorSubTwos,
  } = useSubTwos(groupId, subOneId, !groupId || !subOneId);

  const subTwos: SubTwo[] = rawSubTwos ?? [];

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
    (page, term) => searchItemsGlobal(term, page),
    {
      isGlobalSearch: true,
      skipSearchIfEmpty: true,
    }
  );

  const handleSubTwoPress = async (subTwoId: string) => {
    try {
      setInternalLoading(true);

      const [itemsData, subThreesData] = await Promise.all([
        getItems(groupId, subOneId, subTwoId, undefined, 1),
        getSubThrees(groupId, subOneId, subTwoId),
      ]);


      const shouldNavigateToSubThrees = Array.isArray(subThreesData) && subThreesData.length > 0;

const target = shouldNavigateToSubThrees
  ? '/SubThreesScreen/[subTwoId]'
  : '/Items/subTwo/[id]';


      router.push({
        pathname: target,
        params: {
          id: subTwoId,
          groupId,
          subOneId,
          subTwoId,
          origin: `/SubTwosScreen/${subOneId}`,
        },
      });
    } catch (err) {
      console.error('❌ Error on SubTwo press:', err);
      setInternalError(true);
    } finally {
      setInternalLoading(false);
    }
  };

  const loading = loadingItems || loadingSubTwos || internalLoading;
  const error = errorItems || errorSubTwos || internalError;

  const showSearchResults = !!searchTerm;
  const showSubTwos = !searchTerm && subTwos.length > 0;
  const isEmptySearch = showSearchResults && query.trim() === searchTerm && items.length === 0;
  const isEmptySubTwos = !searchTerm && subTwos.length === 0;

  return (
    <ScreenContainer
      loading={loading}
      error={!!error}
      empty={!loading && (isEmptySearch || isEmptySubTwos)}
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
          origin={`/SubTwosScreen/${subOneId}`}
        />
      ) : showSubTwos ? (
        <CategoryGridSection
          data={subTwos}
          onPress={(id) => handleSubTwoPress(String(id))}
        />
      ) : <View/>}
    </ScreenContainer>
  );
}
