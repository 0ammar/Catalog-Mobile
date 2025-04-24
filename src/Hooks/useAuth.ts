import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { login } from '@/Services/APIs';

interface MyJwtPayload {
  username: string;
  role: string;
  exp?: number;
  iat?: number;
}

export function useAuth() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // ⬇️ Get The Rule From Token
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const decoded = jwtDecode<MyJwtPayload>(token);
        const extractedRole =
          decoded.role ||
          (decoded as any).Role ||
          (decoded as any)[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ] ||
          null;

        setRole(extractedRole);
      } catch (error) {
        console.error('[useAuth] Failed to decode token:', error);
      }
    };

    fetchRole();
  }, []);

  // ⬇️ Sign In As Admin
  const handleAdminLogin = async (
    username: string,
    password: string,
    setLoading: (b: boolean) => void
  ) => {
    try {
      setLoading(true);
      const token = await login({ username, password });
      await AsyncStorage.setItem('token', token);
      router.replace('/GroupsScreen/GroupsScreen');
    } catch (error: any) {
      Alert.alert('فشل تسجيل الدخول', error?.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ Enter As A Guest
  const handleGuestAccess = async () => {
    await AsyncStorage.removeItem('token');
    setRole(null);
    router.replace('/GroupsScreen/GroupsScreen');
  };

  const isAdmin = role === 'Admin' || role === 'admin';

  return {
    role,
    isAdmin,
    handleAdminLogin,
    handleGuestAccess,
  };
}
