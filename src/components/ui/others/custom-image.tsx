import { ImageProps, View, ViewProps } from 'react-native';
// import { Image, ImageProps } from 'expo-image';
import classNames from 'classnames';
import Animated, { AnimatedProps } from 'react-native-reanimated';

interface CustomImageProps extends Partial<ViewProps> {
  imageProps: Partial<AnimatedProps<ImageProps>>;
}
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CustomImage = ({ imageProps, className, ...props }: CustomImageProps) => {
  return (
    <View className={classNames('bg-gray1 overflow-hidden', className)} {...props}>
      <Animated.Image {...imageProps} className="w-full h-full" />
      {/* <Image {...imageProps}  className="w-full h-full" cachePolicy={'memory'} placeholder={{ blurhash }} /> */}
    </View>
  );
};

export default CustomImage;
