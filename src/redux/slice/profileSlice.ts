import { IUser } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {} as Partial<IUser>,
};

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<IUser>>) => {
      state.profile = action.payload;
    },
    handleLogout: (state) => {
      state.profile = initialState.profile;
    },
  },
});

export const { setProfile, handleLogout } = profileSlice.actions;

export default profileSlice.reducer;
