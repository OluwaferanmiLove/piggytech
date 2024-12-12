import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {RootState, persistor, store} from './store';
import {revertAll} from './sharedAction';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
});

export const baseQueryWithTokenCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result?.error);

  // if (
  //   result?.error &&
  //   result?.error?.status !== 401 &&
  //   result?.error?.status !== 422
  // ) {
  //   console.log(result?.error, result?.error);
  // }

  if (result?.error && result?.error?.status === 403) {
    // console.log('error 403');
  }

  if (result?.error && result?.error?.status === 401) {
    console.log('error 401');
    // store.dispatch(userAuthenticated(false));
  }
  return result;
};
