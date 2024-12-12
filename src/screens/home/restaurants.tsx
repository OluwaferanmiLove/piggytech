import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { BaseText, Pressable, Row } from '@components/ui';
import Layout from '@components/ui/layout/app-layout';
import { ArrowLeft2, House, SearchNormal1, Setting5 } from 'iconsax-react-native';
import { colors } from '@theme/colors';
import { hp, wp } from 'src/utils/responsive-dimension';
import { Input } from '@components/inputs';
import useLayoutHeight from 'src/hooks/use-layout-height';
import { RestaurantCard } from 'src/components/home';
import { useNavigation } from '@react-navigation/native';
import { useGetRestaurantsQuery, useLazyGetRestaurantsQuery } from 'src/redux/profile/restaurant-api';
import { RestaurantRes } from 'src/redux/profile/Restaurant';

const Restaurants = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<RestaurantRes[]>([]);
  const { height, onLayout } = useLayoutHeight(0);

  const navigation = useNavigation();

  const [getRestaurants, { data, isLoading }] = useLazyGetRestaurantsQuery();

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    const lowercaseSearch = searchTerm.toLowerCase();

    const result = data?.filter(item =>
      Object.values(item).some(value => {
        if (Array.isArray(value)) {
          return value.some(v => String(v).toLowerCase().includes(lowercaseSearch));
        }

        // Handle other value types
        return String(value).toLowerCase().includes(lowercaseSearch);
      }),
    );
    setSearchResult(result ?? []);
  };

  const restaurants = useMemo(() => {
    if (searchResult.length > 0) {
      return searchResult;
    }

    if (data) {
      return data;
    }

    return [];
  }, [data, searchResult]);

  return (
    <Layout showHeader={false}>
      <Row className="px-20 py-10 border-b border-b-gray1" style={{ columnGap: wp(10) }}>
        <Pressable
          className="border border-gray2 rounded-full h-full"
          onLayout={onLayout}
          style={{ width: height }}
          onPress={() => navigation.goBack()}>
          <View className="flex-1 items-center justify-center">
            <ArrowLeft2 color={colors.white} size={wp(16)} />
          </View>
        </Pressable>
        <View className="flex-1">
          <Input
            placeholder="Search for restaurants"
            value={search}
            onChangeText={handleSearch}
            leftAccessory={<SearchNormal1 color={colors.white} size={wp(20)} />}
          />
        </View>
      </Row>
      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
      <ScrollView className="flex-1">
        <View className="flex-1 mx-20 pt-20 pb-40" style={{ gap: hp(30) }}>
          {restaurants.map((i, idx) => (
            <View key={idx}>
              <RestaurantCard item={i} onPress={() => navigation.navigate('RestaurantDetail', { item: i })} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Restaurants;
