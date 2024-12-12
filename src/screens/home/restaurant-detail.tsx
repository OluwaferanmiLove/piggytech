import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { BaseText, Pressable, Row } from '@components/ui';
import Layout from '@components/ui/layout/app-layout';
import { House, SearchNormal1, Setting5 } from 'iconsax-react-native';
import { colors } from '@theme/colors';
import { hp, wp } from 'src/utils/responsive-dimension';
import { Input } from '@components/inputs';
import useLayoutHeight from 'src/hooks/use-layout-height';
import { RestaurantCard, ReviewCard } from 'src/components/home';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { CustomImage, Separator } from 'src/components/ui/others';
import useRouteParams from 'src/hooks/use-route-params';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useLazyGetReviewByRestaurantQuery } from 'src/redux/profile/restaurant-api';
import Button, { ButtonVariant, TextColor } from 'src/components/ui/buttons/button';

const RestaurantDetail = () => {
  const { height, onLayout } = useLayoutHeight(0);

  const params = useRouteParams<'RestaurantDetail'>();
  const navigation = useNavigation();

  const [getReviewByRestaurant, { data, error, isLoading }] = useLazyGetReviewByRestaurantQuery();

  useEffect(() => {
    if (params?.item?.id !== undefined) {
      getReviewByRestaurant({ restaurantId: String(params?.item?.id!) });
    }
  }, [params?.item?.id]);

  console.log({ error });

  return (
    <Layout showHeader={true} headerProps={{ showBack: true, onPressBack: () => navigation.goBack() }}>
      <ScrollView className="flex-1">
        <View className="h-[258px] w-full overflow-hidden">
          <CustomImage
            imageProps={{
              src: params?.item.image,
            }}
            className="h-full w-full"
          />
        </View>
        <View className="flex-1 mx-20 pt-20 pb-40">
          <View>
            <BaseText fontSize={24} weight="semiBold" className="mt-4">
              {params?.item.name}
            </BaseText>
            <View className="flex-row items-center mt-5">
              <View>
                <StarRatingDisplay
                  color={colors.primary}
                  rating={4.5}
                  starSize={wp(18)}
                  starStyle={{ marginHorizontal: 0, marginRight: wp(2) }}
                />
              </View>
              <BaseText fontSize={12} weight="medium">
                {params?.item?.reviewCount} Reviews
              </BaseText>
            </View>
            <BaseText fontSize={12} className="mt-5 opacity-60" numberOfLines={2}>
              {params?.item?.cuisines.join(' · ')}
            </BaseText>
            <BaseText fontSize={12} className="mt-5 opacity-60" numberOfLines={2}>
              {params?.item?.specialties.join(' · ')}
            </BaseText>
            {/* <BaseText fontSize={12} className="mt-5 opacity-60" numberOfLines={2}>
              $$$
            </BaseText> */}
          </View>
          <View className="mt-20">
            <BaseText fontSize={16} weight="semiBold">
              Address
            </BaseText>
            <BaseText fontSize={13} weight="medium" className="mt-8">
              {params?.item?.address}
            </BaseText>
          </View>
          <Separator className="my-30" />
          <View>
            <BaseText fontSize={16} weight="semiBold">
              About
            </BaseText>
            <BaseText fontSize={13} lineHeight={20} className="mt-10 opacity-80" numberOfLines={4}>
              {params?.item?.about}
            </BaseText>
          </View>
          <Separator className="my-30" />
          <View>
            <BaseText fontSize={16} weight="semiBold">
              All Reviews
            </BaseText>
            <BaseText fontSize={10} lineHeight={20} className="mt-2 opacity-5 mb-10" numberOfLines={4}>
              Reviews are subjective opinions of restaurant's customers
            </BaseText>

            {isLoading && (
              <View className="flex-1 items-center justify-center mt-30">
                <ActivityIndicator color={colors.primary} />
              </View>
            )}
            {data?.map((i, idx) => (
              <Fragment key={idx}>
                <ReviewCard item={i} />
                {idx !== data?.length - 1 && <Separator className="my-30" />}
              </Fragment>
            ))}
          </View>
          <Button
            text="Create Your Review"
            variant={ButtonVariant.OUTLINE}
            textColor={TextColor.WHITE}
            className="mt-40"
            onPress={() => navigation.navigate('CreateReview', { item: params?.item! })}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default RestaurantDetail;
