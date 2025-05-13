import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  ScreenContainer,
  SearchBar,
  ItemsGrid,
  PaginationControls,
} from '@/Components/UI';
import { CategoryGridSection, CategoryTitle } from '@/Components/Shared';

import { useSubThrees, useSearchList, useSmartBack } from '@/Hooks';
import { searchItemsGlobal , getSubTwos } from '@/Services/APIs';
import { Item, SubTwo } from '@/Types';

export default function SubThreesScreen() {
  const router = useRouter();
  const { subTwoId, origin, subOneId, groupId } = useLocalSearchParams<{
    subTwoId: string;
    subOneId: string;
    groupId: string;
    origin?: string;
  }>();

  const groupIdStr = String(groupId);
  const subOneIdStr = String(subOneId);
  const subTwoIdStr = String(subTwoId);

  useSmartBack(origin || `/SubTwosScreen/${subOneIdStr}`);

  const [subTwoName, setSubTwoName] = useState<string | null>(null);

  useEffect(() => {
    if (!query && groupIdStr && subOneIdStr && subTwoIdStr) {
      getSubTwos(groupIdStr, subOneIdStr)
        .then((data: SubTwo[]) => {
          const matched = data.find((s) => s.id === subTwoIdStr);
          if (matched) {
            setSubTwoName(matched.name);
          }
        })
        .catch((err) => {
          console.error('Error fetching SubTwo name:', err);
        });
    }
  }, [groupIdStr, subOneIdStr, subTwoIdStr]);

  const {
    data: subThrees,
    loading: loadingSubThrees,
    error: errorSubThrees,
  } = useSubThrees(groupIdStr, subOneIdStr, subTwoIdStr);

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

  const showSearchResults = !!searchTerm;
  const isSearchActive = query.trim().length > 0;
  const showSubThrees = !isSearchActive && (subThrees?.length ?? 0) > 0;
  const isEmptySearch = showSearchResults && query.trim() === searchTerm && items.length === 0;
  const isEmptySubThrees = !searchTerm && (subThrees?.length ?? 0) === 0;

  const loading = loadingItems || loadingSubThrees;
  const error = !!errorItems || !!errorSubThrees;
  console.log('🔎 SHOW SUBTHREES CHECK', {
    searchTerm,
    subThreesLength: subThrees?.length ?? 0,
    shouldShowSubThrees: showSubThrees,
  });
  return (
    <ScreenContainer
      loading={loading}
      error={error}
      empty={!loading && (isEmptySearch || isEmptySubThrees)}
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

      {!query && subTwoName && <CategoryTitle name={subTwoName} />}

      

      {showSearchResults ? (
        <>
          <ItemsGrid items={items} origin={`/SubThreesScreen/${subTwoIdStr}`} />
          <PaginationControls
            page={page}
            hasMore={hasMore}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      ) : showSubThrees ? (
        <CategoryGridSection
        data={subThrees ?? []}
        onPress={(subThreeId) => {
          console.log('🔥 SubThree clicked:', subThreeId);
          router.push({
            pathname: '/Items/subThree/[id]',
            params: {
              id: subThreeId,
              groupId: groupIdStr,
              subOneId: subOneIdStr,
              subTwoId: subTwoIdStr,
              subThreeId: subThreeId,
              origin: `/SubThreesScreen/${subTwoIdStr}`,
            },
          });
        }}
      />
      
      ) : null}
    </ScreenContainer>
  );
}
