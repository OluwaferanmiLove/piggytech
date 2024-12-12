import { RestaurantRes } from "src/redux/profile/Restaurant";

export type RootStackParamList = {
  RestaurantDetail: { item: RestaurantRes };
  CreateReview: {item: RestaurantRes};
  Restaurants: undefined;
  MyReviews: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
