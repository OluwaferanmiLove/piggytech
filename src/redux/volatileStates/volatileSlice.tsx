import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// import {User} from '../../types';
import {revertAll} from '../sharedAction';
// import {authApi} from './authApi';

interface initialStateType {
  loading: boolean;
  openActionModal: boolean;
  activeFolder: {
    path: string;
    public_id?: string;
  };
  uploadInProgress: boolean;
  progressCount: number;
}

const initialState: initialStateType = {
  loading: false,
  openActionModal: false,
  activeFolder: {
    path: 'root',
    public_id: undefined,
  },
  uploadInProgress: false,
  progressCount: 0,
};

export const volatileSlice = createSlice({
  name: 'volatileState',
  initialState,
  // extraReducers: builder => builder.addCase(revertAll, () => initialState),
  extraReducers: builder => {
    builder.addCase(revertAll, () => initialState);
    // builder.addMatcher(authApi.endpoints.logOut.matchFulfilled, state => {
    //   state.loading = false;
    // });
    // builder.addMatcher(authApi.endpoints.logOut.matchPending, state => {
    //   state.loading = true;
    // });
    // builder.addMatcher(authApi.endpoints.logOut.matchRejected, state => {
    //   state.loading = false;
    // });
  },

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setActiveFolder: (
      state,
      action: PayloadAction<initialStateType['activeFolder']>,
    ) => {
      state.activeFolder = {
        path: action?.payload?.path,
        public_id: action?.payload?.public_id,
      };
    },

    setOpenActionModal: (state, action: PayloadAction<boolean>) => {
      state.openActionModal = action.payload;
    },

    setUploadInProgress: (state, action: PayloadAction<boolean>) => {
      state.uploadInProgress = action.payload;
    },

    setProgressCount: (state, action: PayloadAction<number>) => {
      state.progressCount = action.payload;
    },
  },
});

export const {
  setLoading,
  setActiveFolder,
  setOpenActionModal,
  setUploadInProgress,
  setProgressCount,
} = volatileSlice.actions;

export default volatileSlice.reducer;
