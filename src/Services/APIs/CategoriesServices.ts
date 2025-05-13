import { api } from "@/Services/api";
import { Group, SubOne, SubTwo, SubThree } from "@/Types";

// ✅ Get Groups
export const getGroups = async (): Promise<Group[]> => {
  console.log("📥 Fetching groups...");
  try {
    const response = await api.get<Group[]>("/api/groups");
    return response.data;
  } catch (err) {
    console.error("❌ Error fetching groups:", err);
    return [];
  }
};

// ✅ Get SubOnes by GroupId
export const getSubOnes = async (groupId: string): Promise<SubOne[]> => {
  console.log(`📥 Fetching SubOnes for groupId: ${groupId}`);
  try {
    const response = await api.get<SubOne[]>(`/api/subones/${groupId}`);
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 404) {
      console.warn(`⚠️ No SubOnes found for groupId = ${groupId}`);
    } else {
      console.error("❌ Error fetching SubOnes:", err);
    }
    return [];
  }
};

// ✅ Get SubTwos by GroupId + SubOneId
export const getSubTwos = async (
  groupId: string,
  subOneId: string
): Promise<SubTwo[]> => {
  console.log("📥 Fetching SubTwos with:", { groupId, subOneId });
  try {
    const response = await api.get<SubTwo[]>(`/api/subtwos`, {
      params: { groupId, subOneId },
    });
    return response.data;
  } catch (err) {
    console.error("❌ Error fetching SubTwos:", err);
    return [];
  }
};

// ✅ Get SubThrees by GroupId + SubOneId + SubTwoId
export const getSubThrees = async (
  groupId: string,
  subOneId: string,
  subTwoId: string
): Promise<SubThree[]> => {
  console.log("📥 Fetching SubThrees with:", { groupId, subOneId, subTwoId });
  try {
    const response = await api.get<SubThree[]>(`/api/subthrees`, {
      params: { groupId, subOneId, subTwoId },
    });
    return response.data;
  } catch (err) {
    console.error("❌ Error fetching SubThrees:", err);
    return [];
  }
};

// ✅ Get SubOne by Id (search in all groups)
export const getSubOneById = async (subOneId: string): Promise<SubOne | null> => {
  console.log(`📥 Searching for SubOne with id: ${subOneId}`);
  const allGroups = await getGroups();
  for (const group of allGroups) {
    const subOnes = await getSubOnes(group.id);
    const found = subOnes.find((s) => s.id === subOneId);
    if (found) {
      return found;
    }
  }
  console.warn("⚠️ SubOne not found in any group");
  return null;
};
