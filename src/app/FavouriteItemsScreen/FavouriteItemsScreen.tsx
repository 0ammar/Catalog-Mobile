import { useRef, useState } from 'react'
import { View, Text, Pressable, Animated } from 'react-native';
import Modal from 'react-native-modal'
import {
  Header,
  SearchBar,
  ItemsGrid,
  PaginationControls,
  LoadingState,
} from '@/Components/UI';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';
import { useFavouriteItems } from '@/Hooks';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles as modalStyles } from '@/Components/UI/CustomAlertModal/CustomAlertModal.styles';


export default function FavouriteItemsScreen() {

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const scaleY = useRef(new Animated.Value(1)).current;

  const {
    items,
    loading,
    error,
    query,
    setQuery,
    page,
    setPage,
    total,
    clearFavourites,
  } = useFavouriteItems();

  const confirmClear = () => {
    clearFavourites();
    setShowConfirmModal(false);
  }
  const confirmClose = () => setShowConfirmModal(false);

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="يمكنك إدخال اسم أو رقم الصنف للعثور عليه"
      />

      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#A01515',
          marginTop: 10
        }}
      >
        قائمة المفضلة
      </Text>

      {total > 0 && (
        <View style={{ alignItems: 'center', marginBottom: 5 }}>
          <Pressable
            onPress={() => setShowConfirmModal(true)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            android_ripple={{ color: '#ccc' }}
          >
            <AntDesign name="delete" size={24} color="#A01515" />
          </Pressable>
        </View>
      )}

      {loading ? (
        <LoadingState message="جاري تحميل العناصر المفضلة..." />
      ) : error ? (
        <EmptyState title="حدث خطأ" subtitle={error} />
      ) : items.length === 0 ? (
        <EmptyState
          title={query ? "لا يوجد نتائج" : "قائمة المفضلة فارغة"}
          subtitle={
            query
              ? `لا يوجد نتائج تطابق "${query}" ضمن المفضلة.`
              : "لم تقم بإضافة أي منتجات بعد."
          }
        />
      ) : (
        <>
          <ItemsGrid items={items} origin="/FavouriteItemsScreen" />
          <PaginationControls
            page={page}
            hasMore={total > page * 10}
            onNext={() => setPage((p) => p + 1)}
            onBack={() => setPage((p) => Math.max(1, p - 1))}
          />
        </>
      )}

      <Modal
        isVisible={showConfirmModal}
        onBackdropPress={confirmClose}
        animationIn='zoomIn'
        animationOut='zoomOut'
        backdropOpacity={0.3}
      >
        <View style={modalStyles.modal}>
          <Text style={modalStyles.title}>تأكيد الحذف</Text>
          <Text style={modalStyles.message}>هل انت متأكد أنك تريد حذف القائمة</Text>
          <View style={{ flexDirection: 'row', gap: 30, marginTop: 10 }}>
            <Animated.View style={{ transform: [{ scale: scaleY }] }}>
              <Pressable onPress={confirmClear} style={[modalStyles.button, { backgroundColor: '#A01515' }]}>
                <MaterialCommunityIcons name='check' size={20} color="#fff" />
              </Pressable>
            </Animated.View>
            <Pressable onPress={confirmClose} style={modalStyles.button}>
              <MaterialCommunityIcons name='close' size={20} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal >

    </View >
  );
}
