import { useLocalSearchParams, useRouter } from 'expo-router';

import { SearchBar, ScreenContainer } from '@/Components/UI';
import { CategoryGridSection, CategoryTitle, SearchResults } from '@/Components/Shared';

import { useGroups, useSubOnes, useSearchList, useSmartBack } from '@/Hooks';
import { getItems } from '@/Services/APIs/ItemsServices';
import { Item } from '@/Types';

export default function SubOneScreen() {
  const router = useRouter();
  const { groupId, origin } = useLocalSearchParams<{ groupId: string; origin?: string }>();
  const id = Number(groupId);

  useSmartBack(origin || '/GroupsScreen');

  if (!id || isNaN(id)) {
    return (
      <ScreenContainer
        loading={false}
        error
        empty
        emptyTitle="معرّف المجموعة غير صالح"
        emptySubtitle="الرجاء العودة والمحاولة مرة أخرى."
      >
        <></>
      </ScreenContainer>
    );
  }

  const { data: groups } = useGroups();

  const {
    data: subOnes = [],
    loading: loadingSubOnes,
    error: errorSubOnes,
  } = useSubOnes(id);

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

  const loading = loadingItems || loadingSubOnes;
  const error = errorItems || errorSubOnes;

  const showSearchResults = !!searchTerm;
  const showSubOnes = !searchTerm && subOnes!.length > 0;

  const isEmptySearch = showSearchResults && query.trim() === searchTerm && items.length === 0;
  const isEmptySubOnes = !searchTerm && subOnes!.length === 0;

  const groupName = groups?.find((g) => g.id === id)?.name ?? '';

  return (
    <ScreenContainer
      loading={loading}
      error={!!error}
      empty={isEmptySearch || isEmptySubOnes}
      emptyTitle={isEmptySearch ? 'لا توجد أصناف مطابقة' : 'لا توجد تصنيفات فرعية'}
      emptySubtitle={
        isEmptySearch
          ? 'حاول البحث باسم أو رقم صنف مختلف.'
          : 'لا توجد تصنيفات فرعية ضمن هذه المجموعة.'
      }
    >
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={() => triggerSearch(query)}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      {!query && groupName && <CategoryTitle name={groupName} />}

      {showSearchResults ? (
        <SearchResults
          items={items}
          page={page}
          hasMore={hasMore}
          setPage={setPage}
          origin={`/SubOnesScreen/${id}`}
        />
      ) : showSubOnes ? (
        <CategoryGridSection
          data={subOnes}
          onPress={(subOneId) =>
            router.push({
              pathname: '/SubTwosScreen/[subOneId]',
              params: {
                subOneId: String(subOneId),
                origin: `/SubOnesScreen/${id}`,
              },
            })
          }
        />
      ) : null}
    </ScreenContainer>
  );
}
