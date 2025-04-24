import { useEffect, useState } from "react";
import {
  getGroups,
  getSubOnes,
  getSubTwos,
  getSubThrees,
} from "@/Services/APIs/CategoriesServices";
import { Group, SubOne, SubTwo, SubThree } from "@/Types";

function createFetcher<T extends unknown[]>(
  fetchFn: () => Promise<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T>([] as unknown as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (active) setData(result);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        if (active) setError(err?.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error };
}

export const useGroups = () => createFetcher<Group[]>(getGroups, []);
export const useSubOnes = (groupId: number) =>
  createFetcher<SubOne[]>(() => getSubOnes(groupId), [groupId]);
export const useSubTwos = (subOneId: number) =>
  createFetcher<SubTwo[]>(() => getSubTwos(subOneId), [subOneId]);
export const useSubThrees = (subTwoId: number) =>
  createFetcher<SubThree[]>(() => getSubThrees(subTwoId), [subTwoId]);