import React from 'react';
import { View } from 'react-native';
import Header from '../Header/Header';
import CenteredScreen from '../CenteredScreen/CenteredScreen';
import LoadingState from '../LoadingState/LoadingState';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';
import { styles } from './ScreenContainer.styles';
import Footer from '../Footer/Footer';

type ScreenContainerProps = {
  loading: boolean;
  error: boolean;
  empty: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  children: React.ReactNode;
};

export const ScreenContainer = ({
  loading,
  error,
  empty,
  emptyTitle,
  emptySubtitle,
  children,
}: ScreenContainerProps) => {
  const renderContent = () => {
    if (loading) {
      return (
        <CenteredScreen>
          <LoadingState message="جاري التحميل..." />
        </CenteredScreen>
      );
    }

    if (error) {
      return (
        <CenteredScreen>
          <EmptyState
            title="حدث خطأ ما"
            subtitle="تأكد من اتصالك بالإنترنت وحاول مرة أخرى."
          />
        </CenteredScreen>
      );
    }

    if (empty) {
      return (
        <CenteredScreen>
          <EmptyState
            title={emptyTitle || 'لا توجد عناصر'}
            subtitle={emptySubtitle || 'جرب اسمًا مختلفًا أو رقم منتج آخر.'}
          />
        </CenteredScreen>
      );
    }

    return children;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        {children}
      </View>
      <Footer />
    </View>

  );
};
