import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { BaseText, Pressable, Row } from '@components/ui';
import Layout from '@components/ui/layout/app-layout';
import { Cake, Edit2 } from 'iconsax-react-native';
import { colors } from '@theme/colors';
import { hp, wp } from 'src/utils/responsive-dimension';
import useLayoutHeight from 'src/hooks/use-layout-height';
import { useNavigation } from '@react-navigation/native';
import { useLazyGetRestaurantsQuery } from 'src/redux/profile/restaurant-api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage } from 'src/components/ui/others';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { LinearGradient } from 'expo-linear-gradient';

const randSelector = Math.floor(Math.random() * 7) + 1;


const Home = () => {
  const { height, onLayout } = useLayoutHeight(0);

  const navigation = useNavigation();

  const [getRestaurants, { data, isLoading }] = useLazyGetRestaurantsQuery();

  const featuredRes = data?.[randSelector];

  useEffect(() => {
    getRestaurants();
  }, []);

  const inset = useSafeAreaInsets();

  const action = [
    {
      title: 'Restaurants',
      icon: <Cake color={colors.dark} size={wp(20)} />,
      onPress: () => navigation.navigate('Restaurants'),
    },
    // {
    //   title: 'My reviews',
    //   icon: <Edit2 color={colors.dark} size={wp(20)} />,
    //   onPress: () => navigation.navigate('MyReviews'),
    // },
  ];

  return (
    <Layout showHeader={false} insetTop={false} statusBarStyle={'dark'}>
      <ScrollView className="flex-1">
        <View className="bg-primary px-20 py-30" style={{ paddingTop: inset.top + 15 }}>
          <BaseText fontSize={28} weight="semiBold" className="text-black">
            Explore
          </BaseText>
          <Row className="mt-20" style={{ gap: hp(10) }}>
            {action.map((item, idx) => (
              <Pressable className="self-start" key={idx} onPress={item.onPress}>
                <View className="flex-row items-center bg-white py-15 px-20 rounded-full">
                  {item.icon}
                  <BaseText fontSize={14} weight="bold" className="text-black ml-10">
                    {item.title}
                  </BaseText>
                </View>
              </Pressable>
            ))}
          </Row>
        </View>
        {isLoading && <ActivityIndicator color={colors.primary} />}
        {!isLoading && (
          <View className="mt-20">
            <Pressable
              className="h-[550px] w-dvw overflow-hidden"
              onPress={() => navigation.navigate('RestaurantDetail', { item: featuredRes! })}>
              <CustomImage
                imageProps={{
                  src: featuredRes?.image,
                }}
                className="h-full w-full"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: '100%',
                }}
              />
              <View className="absolute left-20 bottom-20">
                <BaseText fontSize={28} weight="bold">
                  {featuredRes?.name}
                </BaseText>
                <BaseText fontSize={12} weight="medium">
                  {featuredRes?.cuisines.join(' · ')}
                </BaseText>
                <View className="mt-10">
                  <StarRatingDisplay
                    color={colors.primary}
                    rating={Number(featuredRes?.rating)}
                    starSize={wp(28)}
                    starStyle={{ marginHorizontal: 0, marginRight: wp(2) }}
                  />
                </View>
              </View>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Home;
