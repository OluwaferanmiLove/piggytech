import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenCheck } from '../redux.util';
import { CreateReviewItem, RestaurantRes, ReviewItem, UpdateReviewItem } from './Restaurant';
import originalMockData from '../data/mock-data.json';

let mockData: typeof originalMockData = JSON.parse(JSON.stringify(originalMockData));

// Utility function to simulate network delay
export const simulateNetworkDelay = <T>(
  data: T,
  options?: {
    delayMs?: number;
    failureRate?: number;
    errorMessage?: string;
  },
): Promise<T> => {
  const {
    delayMs = 1000, // Default 1 second delay
    failureRate = 0.1, // 10% failure rate
    errorMessage = 'Network request failed',
  } = options || {};

  return new Promise<T>((resolve, reject) => {
    // Randomize exact delay within a range (±20% of specified delay)
    const jitteredDelay = delayMs * (0.8 + Math.random() * 0.4);

    // Check for simulated network failure
    const shouldFail = Math.random() < failureRate;

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(errorMessage));
      } else {
        resolve(data);
      }
    }, jitteredDelay);
  });
};

export const restaurantApi = createApi({
  reducerPath: 'restaurants',
  baseQuery: baseQueryWithTokenCheck,
  tagTypes: ['Reviews'],
  endpoints: builder => ({
    getRestaurants: builder.query<RestaurantRes[], void>({
      queryFn: async () => {
        try {
          const res = mockData.restaurants.map(i => {
            const reviewCount = mockData.reviews[i.id as unknown as keyof typeof mockData.reviews].length;
            return {
              ...i,
              reviewCount,
            };
          });
          const delayedUsers = await simulateNetworkDelay(res, {
            delayMs: 1500,
            failureRate: 0,
          });

          return { data: delayedUsers };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Failed to fetch restaurants' },
            },
          };
        }
      },
    }),

    getReviewByRestaurant: builder.query<ReviewItem[], { restaurantId: string }>({
      queryFn: async ({ restaurantId }) => {
        try {
          const res = mockData.reviews[restaurantId as unknown as keyof typeof mockData.reviews];
          console.log({ res });
          const delayedResponse = await simulateNetworkDelay(res, {
            delayMs: 1500,
            failureRate: 0, // 5% failure rate
          });

          if (delayedResponse === undefined) {
            throw new Error();
          }

          return { data: delayedResponse };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Failed to fetch reviews' },
            },
          };
        }
      },
      providesTags: (result, error, { restaurantId }) =>
        result ? [{ type: 'Reviews' as const, id: restaurantId }] : [],
    }),

    // POST create user with simulated delay and potential failure
    createReview: builder.mutation<ReviewItem, CreateReviewItem>({
      queryFn: async reviewItem => {
        try {
          // Simulate network conditions

          const review = {
            ...reviewItem.item,
            id: `review_${Date.now()}`, // Generate a unique ID
          };

          const createdReview = await simulateNetworkDelay(review, {
            delayMs: 1000,
            failureRate: 0.15, // Slightly higher failure rate for creation
            errorMessage: 'Error creating review',
          });

          // Create a deep copy of the mockData
          const updatedMockData = JSON.parse(JSON.stringify(mockData));

          // Modify the copy
          updatedMockData.reviews[reviewItem.restaurantId].push(createdReview);

          // Reassign the entire mockData
          mockData = updatedMockData;

          // Add to mock database
          // mockData.reviews[reviewItem.restaurantId as unknown as keyof typeof mockData.reviews].push(createdReview);

          return { data: createdReview };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Network request failed' },
            },
          };
        }
      },
      invalidatesTags: (result, error, { restaurantId }) =>
        result ? [{ type: 'Reviews' as const, id: restaurantId }] : [],
    }),

    // New: Update Review Mutation
    updateReview: builder.mutation<ReviewItem, UpdateReviewItem>({
      queryFn: async ({ id, restaurantId, reviewData }) => {
        try {
          // Find the review in the mock database
          const reviews = mockData.reviews[restaurantId as unknown as keyof typeof mockData.reviews];
          const reviewIndex = reviews.findIndex(review => review.id === id);

          if (reviewIndex === -1) {
            return {
              error: {
                status: 404,
                data: { message: 'Review not found' },
              },
            };
          }

          // Merge existing review with update data
          const updatedReview = {
            ...reviews[reviewIndex],
            ...reviewData,
          };

          // Simulate network delay
          const finalReview = await simulateNetworkDelay(updatedReview, {
            delayMs: 1000,
            failureRate: 0.1,
          });

          // Update in mock database
          reviews[reviewIndex] = finalReview;

          return { data: finalReview };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: 'Failed to update review' },
            },
          };
        }
      },
      invalidatesTags: (result, error, { restaurantId }) =>
        result ? [{ type: 'Reviews' as const, id: restaurantId }] : [],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  useGetReviewByRestaurantQuery,
  useLazyGetReviewByRestaurantQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
} = restaurantApi;
