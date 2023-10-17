import { baseApi } from "./api/baseApi";
import profileSlice from "./slice/profileSlice";

export const reducer = {
  profile: profileSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
