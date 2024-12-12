import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {revertAll} from '../sharedAction';
import originalMockData from '../data/mock-data.json';
import { ReviewItem } from './Restaurant';

interface initialStateType {
  user: {};
  initialConfig: boolean;
  isWidgetOpen: boolean;
}

const initialState: typeof  originalMockData = originalMockData;

export const restaurantSlice = createSlice({
  name: 'mockData',
  initialState,
  reducers: {
    addReview: (
      state,
      action: PayloadAction<{
        restaurantId: string;
        review: ReviewItem;
      }>,
    ) => {
      const { restaurantId, review } = action.payload;

      // Optional: Add a check to create the array if it doesn't exist
      if (!state.reviews[restaurantId as unknown as keyof typeof originalMockData.reviews]) {
        state.reviews[restaurantId as unknown as keyof typeof originalMockData.reviews] = [];
      }

      state.reviews[restaurantId as unknown as keyof typeof originalMockData.reviews].push(review);
    },
  },
});

export const {addReview} = restaurantSlice.actions;

export default restaurantSlice.reducer;
