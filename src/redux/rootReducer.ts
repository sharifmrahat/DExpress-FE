import { baseApi } from "./api/baseApi";

export const reducer = {
  // profile: profileSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
