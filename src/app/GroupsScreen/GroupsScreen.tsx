import { useRouter } from 'expo-router';
import { ScreenContainer, SearchBar } from '@/Components/UI';
import { CategoryGridSection, SearchResults } from '@/Components/Shared';
import { useGroups, useSearchList } from '@/Hooks';
import { searchItemsGlobal } from '@/Services/APIs/ItemsServices';
import { Item } from '@/Types';

export default function GroupsScreen() {
  const router = useRouter();

  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useGroups();

  const {
    data: items,
    query,
    setQuery,
    searchTerm,
    triggerSearch,
    loading: loadingItems,
    error: errorItems,
    hasMore,
    page,
    setPage,
  } = useSearchList<Item>(
    (page, term) => searchItemsGlobal(term, page),
    {
      isGlobalSearch: true,
      skipSearchIfEmpty: true,
    }
  );

  const loading = loadingCategories || loadingItems;
  const error = errorCategories || errorItems;

  const showSearchResults = !!searchTerm;
  const showCategories = !searchTerm && (categories?.length ?? 0) > 0;

  const isEmptySearch =
    showSearchResults &&
    query.trim() === searchTerm &&
    items.length === 0 &&
    !loadingItems;

  const isEmptyCategories =
    !searchTerm && (categories?.length ?? 0) === 0;

  // ✅ لا تظهر empty إذا المستخدم عم بكتب (debounce ما خلص)
  const preventEmptyWhileTyping =
    query.trim() !== '' && searchTerm !== query.trim();

  const isEmpty =
    !loading &&
    !preventEmptyWhileTyping &&
    (isEmptySearch || isEmptyCategories);

  return (
    <ScreenContainer
      loading={loading}
      error={!!error}
      empty={isEmpty}
      emptyTitle={isEmptySearch ? 'لا توجد أصناف مطابقة' : 'لا توجد مجموعات'}
      emptySubtitle={
        isEmptySearch
          ? 'حاول استخدام اسم أو رقم صنف مختلف.'
          : 'الرجاء إضافة مجموعات أولاً.'
      }
    >
      <SearchBar
        value={query}
        onChange={(text) => {
          setQuery(text);
          if (text.trim() === '') setPage(1);
        }}
        onSubmit={() => triggerSearch(query)}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      {showSearchResults ? (
        <SearchResults
          items={items}
          page={page}
          hasMore={hasMore}
          setPage={setPage}
          origin="/GroupsScreen"
        />
      ) : showCategories ? (
        <CategoryGridSection
          data={categories ?? []}
          onPress={(groupId) =>
            router.push({
              pathname: '/SubOnesScreen/[groupId]',
              params: { groupId: String(groupId), origin: '/GroupsScreen' },
            })
          }
        />
      ) : null}
    </ScreenContainer>
  );
}
