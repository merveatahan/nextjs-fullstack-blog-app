import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "commentStore",
  initialState: {
    commentData: [],
  },
  reducers: {
    setCommentData: (state, action) => {
      state.commentData = action.payload;
    },
  },
});

export const { setCommentData } = commentSlice.actions;
export default commentSlice.reducer;
