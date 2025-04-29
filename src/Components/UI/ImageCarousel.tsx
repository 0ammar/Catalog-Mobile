import React from 'react';
import { Image, Dimensions, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { styles } from '@/Theme/ItemStyles/itemDetails.styles';

const { width } = Dimensions.get('window');
const fallbackImage = require('@/Assets/images/no-image.png');

interface Props {
  images: string[];
  onImagePress: (img: string) => void;
}

export const ImageCarousel = ({ images, onImagePress }: Props) => {
  if (!images.length) {
    return <Image source={fallbackImage} style={styles.noImage} resizeMode="contain" />;
  }

  return (
    <Carousel
      width={width - 60}
      height={width - 60}
      data={images}
      scrollAnimationDuration={500}
      renderItem={({ item }) => (
        <Pressable onPress={() => onImagePress(item)}>
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/UploadedImages/${item}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      )}
      loop
      autoPlay={false}
      style={{ marginBottom: 10 }}
    />
  );
};
