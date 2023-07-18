import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log();
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
