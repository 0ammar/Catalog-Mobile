import { useEffect, useState } from "react";
import {
  getGroups,
  getSubOnes,
  getSubTwos,
  getSubThrees,
} from "@/Services/APIs/CategoriesServices";
import { Group, SubOne, SubTwo, SubThree } from "@/Types";

// 🔁 Generic data fetcher hook
function useFetcher<T>(
  fetchFn: () => Promise<T>,
  deps: any[] = [],
  skip: boolean = false
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skip) {
      console.warn("⛔ Skipped fetch due to missing deps:", deps);
      setData(null);
      setLoading(false);
      return;
    }

    let isActive = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (isActive) {
          setData(result);
        }
      } catch (err: any) {
        if (isActive) setError(err?.message || "Something went wrong");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, deps);

  return { data, loading, error };
}

// ✅ Category hooks
export const useGroups = () => useFetcher<Group[]>(getGroups, []);

export const useSubOnes = (groupId: string) =>
  useFetcher<SubOne[]>(() => getSubOnes(groupId), [groupId], !groupId);

export const useSubTwos = (groupId: string, subOneId: string, skip = false) => {
  const isValid = !!groupId && !!subOneId && !skip;
  return useFetcher<SubTwo[]>(
    () => getSubTwos(groupId, subOneId),
    [groupId, subOneId],
    !isValid
  );
};

export const useSubThrees = (
  groupId: string,
  subOneId: string,
  subTwoId: string
) =>
  useFetcher<SubThree[]>(
    () => getSubThrees(groupId, subOneId, subTwoId),
    [groupId, subOneId, subTwoId],
    [groupId, subOneId, subTwoId].some((id) => !id?.trim())
  );
