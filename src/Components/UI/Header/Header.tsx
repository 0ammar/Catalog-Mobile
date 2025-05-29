import { View, Text, Image, Pressable, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { styles } from './Header.styles';
import Modal from 'react-native-modal';
import { useAuth } from '@/Hooks';
import { styles as modalStyles } from '@/Components/UI/CustomAlertModal/CustomAlertModal.styles';

export default function Header(): JSX.Element {
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const scaleY = useRef(new Animated.Value(1)).current;
  const { handleLogout } = useAuth();
  const router = useRouter();

  const handleFocusedPress = () => router.push('/FocusedItemsScreen/FocusedItemsScreen');
  const handleNewPress = () => router.push('/NewItemsScreen/NewItemsScreen');
  const handleFavouritePress = () => router.push('/FavouriteItemsScreen/FavouriteItemsScreen');
  const handleExitRequest = () => setExitModalVisible(true);
  const confirmExit = () => {
    Animated.sequence([
      Animated.timing(scaleY, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleY, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      setExitModalVisible(false);
      handleLogout();
    });
  };
  const cancelExit = () => setExitModalVisible(false);

  return (
    <View style={styles.header}>
      <View style={styles.sideLineLeft} />

      {/* Left Icons */}
      <View style={styles.leftIcons}>
        <Pressable onPress={handleExitRequest}>
          <MaterialCommunityIcons name="exit-to-app" size={25} color="#A01515" />
        </Pressable>
        <Pressable onPress={handleFavouritePress}>
          <Image source={require('@/Assets/images/favourite-icon.png')} style={styles.iconImage} resizeMode="contain" />
        </Pressable>
      </View>

      {/* Center Logo */}
      <Pressable onPress={() => router.replace('/GroupsScreen/GroupsScreen')}>
        <Image source={require('@/Assets/images/header.png')} style={styles.logo} />
      </Pressable>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <Pressable onPress={handleFocusedPress}>
          <View style={styles.iconStar}>
            <Image
              source={require('@/Assets/images/focused-icon.png')}
              style={styles.iconStarImage}
              resizeMode="contain"
            />
          </View>
        </Pressable>
        <Pressable onPress={handleNewPress}>
          <Image source={require('@/Assets/images/new.png')} style={styles.iconImage} resizeMode="contain" />
        </Pressable>
      </View>

      <View style={styles.sideLineRight} />

      <Modal
        isVisible={exitModalVisible}
        onBackdropPress={cancelExit}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.3}
      >
        <View style={modalStyles.modal}>
          <Text style={modalStyles.title}>تأكيد الخروج</Text>
          <Text style={modalStyles.message}>هل أنت متأكد أنك تريد الخروج من التطبيق؟</Text>
          <View style={{ flexDirection: 'row', gap: 30, marginTop: 10 }}>
            <Animated.View style={{ transform: [{ scale: scaleY }] }}>
              <Pressable onPress={confirmExit} style={[modalStyles.button, { backgroundColor: '#A01515' }]}>
                <MaterialCommunityIcons name="check" size={20} color="#fff" />
              </Pressable>
            </Animated.View>
            <Pressable onPress={cancelExit} style={modalStyles.button}>
              <MaterialCommunityIcons name="close" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
