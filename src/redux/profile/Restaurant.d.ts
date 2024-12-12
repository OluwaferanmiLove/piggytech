export interface RestaurantRes {
  id: number;
  name: string;
  about: string;
  rating: string;
  email: string;
  number: string;
  reviewCount: number;
  // reviewAverage: number;
  address: string;
  image: string;
  cuisines: string[];
  specialties: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  text: string;
  summary: string;
  date: string;
  rating: number;
  image: string;
}

export interface CreateReviewItem {
  item: Omit<ReviewItem, 'id'>,
  restaurantId: number,
}

export interface UpdateReviewItem {
  id: string; // Add an ID to identify the specific review
  restaurantId: number;
  reviewData: Partial<ReviewItem>;
}
