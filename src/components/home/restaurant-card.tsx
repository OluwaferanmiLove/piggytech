import React from 'react';
import { View, Text } from 'react-native';
import { CustomImage } from '../ui/others';
import { BaseText, Pressable, Row } from '../ui';
import { wp } from 'src/utils/responsive-dimension';
import { colors } from 'src/theme/colors';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { RestaurantRes } from 'src/redux/profile/Restaurant';

interface RestaurantCardProps {
  item: RestaurantRes;
  onPress: VoidFunction;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item, onPress }) => {
  return (
    <Pressable className="flex-row" onPress={onPress}>
      <View className="h-100 w-100 rounded-4 overflow-hidden" >
        <CustomImage
          imageProps={{
            src: item.image,
          }}
          className="h-full w-full"
        />
      </View>
      <View className="flex-1 ml-10">
        <BaseText fontSize={16} weight="semiBold" className="mt-4">
          {item?.name}
        </BaseText>
        <View className="flex-row items-center my-2">
          <View>
            <StarRatingDisplay color={colors.primary} rating={4.5} starSize={wp(10)} />
          </View>
          <BaseText fontSize={12} weight="medium">
            {item?.reviewCount}
          </BaseText>
        </View>
        <BaseText fontSize={12} className="mt-5 opacity-60" numberOfLines={2}>
          {item.cuisines.join(' · ')}
        </BaseText>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
