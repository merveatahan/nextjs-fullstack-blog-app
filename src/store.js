import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./stores/userInfo";
import commentSlice from "./stores/comments";

export default configureStore({
  reducer: {
    user: userSlice,
    commentStore: commentSlice,
  },
});
