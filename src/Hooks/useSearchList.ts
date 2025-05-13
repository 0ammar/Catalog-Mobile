import { useEffect, useState, useRef } from "react";

export type SearchFetchFn<T> = (
  page: number,
  searchTerm: string,
  path?: {
    groupId?: string;
    subOneId?: string;
    subTwoId?: string;
    subThreeId?: string;
    statusId?: string;
  },
  pageSize?: number
) => Promise<T[]>;

export function useSearchList<T>(
  fetchFn: SearchFetchFn<T>,
  options?: {
    groupId?: string;
    subOneId?: string;
    subTwoId?: string;
    subThreeId?: string;
    statusId?: string;
    isGlobalSearch?: boolean;
    isStatusSearch?: boolean;
    pageSize?: number;
    skipSearchIfEmpty?: boolean;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pageSize = options?.pageSize ?? 30;

  // 🔁 Debounced query → searchTerm
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setPage(1);
      setSearchTerm(query.trim());
    }, 1000);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  useEffect(() => {
    const {
      groupId,
      subOneId,
      subTwoId,
      subThreeId,
      statusId,
      isGlobalSearch,
      isStatusSearch,
      skipSearchIfEmpty,
    } = options || {};

    const isCategoryBasedSearch = !!groupId && !!subOneId;
    const isSearchEnabled = isGlobalSearch || isStatusSearch || isCategoryBasedSearch;

    if (!isSearchEnabled) {
      setData([]);
      setHasMore(false);
      return;
    }

    const shouldSkip =
      skipSearchIfEmpty && searchTerm === "" && page === 1;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(page, searchTerm, {
          groupId,
          subOneId,
          subTwoId,
          subThreeId,
          statusId,
        }, pageSize);

        setData((prev) => (page === 1 ? result : [...prev, ...result]));
        setHasMore(result.length === pageSize);
      } catch (err: any) {
        setError(err?.message || "Search failed");
      } finally {
        setLoading(false);
      }
    };

    if (!shouldSkip) {
      fetchData();
    }
  }, [
    searchTerm,
    page,
    options?.groupId,
    options?.subOneId,
    options?.subTwoId,
    options?.subThreeId,
    options?.statusId,
    options?.isGlobalSearch,
    options?.isStatusSearch,
    options?.skipSearchIfEmpty,
  ]);

  return {
    data,
    query,
    setQuery,
    searchTerm,
    triggerSearch: setSearchTerm,
    loading,
    error,
    page,
    setPage,
    hasMore,
    reset: () => {
      setQuery("");
      setSearchTerm("");
      setPage(1);
      setData([]);
      setHasMore(true);
    }
  };
}
