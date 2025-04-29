import { useEffect } from 'react';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { BackHandler } from 'react-native';

export function useSmartBack(defaultFallbackRoute: string = '/EntryScreen') {
  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const backAction = () => {
      // 1. إذا في إمكانية يرجع لورا عادي
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }

      // 2. إذا موجود في SubOnes يرجع إلى Groups
      if (pathname.includes('/SubOnesScreen')) {
        router.replace('/GroupsScreen/GroupsScreen');
        return true;
      }

      // 3. إذا موجود في SubTwosScreen يرجع إلى SubOnesScreen
      const matchSubOne = pathname.match(/\/SubTwosScreen\/(\d+)/);
      if (pathname.includes('/SubTwosScreen')) {
        if (matchSubOne) {
          router.replace({
            pathname: '/SubOnesScreen/[groupId]',
            params: { groupId: matchSubOne[1] },
          });
        } else {
          router.replace('/SubOnesScreen/[groupId]'); // fallback
        }
        return true;
      }

      // 4. إذا موجود في SubThreesScreen يرجع إلى SubTwosScreen
      const matchSubTwo = pathname.match(/\/SubThreesScreen\/(\d+)/);
      if (pathname.includes('/SubThreesScreen')) {
        if (matchSubTwo) {
          router.replace({
            pathname: '/SubTwosScreen/[subOneId]',
            params: { subOneId: matchSubTwo[1] },
          });
        } else {
          router.replace('/SubTwosScreen/[subOneId]');
        }
        return true;
      }

      // 5. إذا موجود في Items من subTwo يرجع إلى SubTwosScreen
      if (pathname.includes('/Items/subTwo')) {
        router.replace('/SubTwosScreen/[subOneId]');
        return true;
      }

      // 6. إذا موجود في Items من subThree يرجع إلى SubThreesScreen
      if (pathname.includes('/Items/subThree')) {
        router.replace('/SubThreesScreen/[subTwoId]');
        return true;
      }

      // 7. إذا في شاشة التفاصيل يرجع حسب المسار الأساسي
      if (pathname.includes('/ItemDetails')) {
        router.replace(defaultFallbackRoute as any);
        return true;
      }

      // 8. إذا في شاشة رفع أو تعديل الصور يرجع للخلف
      if (pathname.includes('/upload') || pathname.includes('/edit')) {
        router.back();
        return true;
      }

      // 9. fallback لأي حالة غير معروفة
      router.replace(defaultFallbackRoute as any);
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => subscription.remove();
  }, [navigation, pathname, router, defaultFallbackRoute]);
}
