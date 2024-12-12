import React from 'react';
import { View, Text } from 'react-native';
import { CustomImage } from '../ui/others';
import { BaseText, Pressable, Row } from '../ui';
import { Heart } from 'iconsax-react-native';
import { wp } from 'src/utils/responsive-dimension';
import { colors } from 'src/theme/colors';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ReviewItem } from 'src/redux/profile/Restaurant';
import dayjs from 'dayjs';

interface ReviewCardProps {
  item: Partial<ReviewItem>;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ item }) => {
  return (
    <View>
      <Row>
        <View className="h-40 w-40 rounded-full overflow-hidden">
          <CustomImage
            imageProps={{
              src: item?.image,
            }}
            className="h-full w-full"
          />
        </View>
        <View className="flex-1 mx-10">
          <BaseText weight="semiBold">{item?.name}</BaseText>
          <BaseText fontSize={10} className="mt-5 opacity-60">
            Ibadan Nigeria
          </BaseText>
        </View>
      </Row>
      <Row className="mt-10">
        <StarRatingDisplay
          color={colors.primary}
          rating={Number(item?.rating) ?? 0}
          starSize={wp(14)}
          starStyle={{ marginHorizontal: 0, marginRight: wp(2) }}
        />
        <BaseText fontSize={10} className="mt-5 opacity-60">
        {dayjs(item?.date).format('DD MMM YYYY')}
        </BaseText>
      </Row>
      <BaseText fontSize={14} weight="semiBold" className="mt-10">
        {item?.summary}
      </BaseText>
      <BaseText fontSize={13} lineHeight={20} className="mt-10 opacity-80" numberOfLines={4}>
        {item?.text}
      </BaseText>
    </View>
  );
};

export default ReviewCard;
