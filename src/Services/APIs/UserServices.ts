// src/Services/APIs/UserService.ts
import { api } from "@/Services/api";
import { LoginPayload } from '@/Types'


export const login = async (payload: LoginPayload): Promise<string> => {
  try {
    const response = await api.post<{ token: string }>("/api/auth/login", payload);
    return response.data.token;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
    throw new Error("فشل تسجيل الدخول. حاول مرة أخرى.");
  }
};
