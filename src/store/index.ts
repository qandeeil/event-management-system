import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/user/user";
import tokenSlice from "@/store/user/token";

export const store = configureStore({
  reducer: {
    userSlice,
    tokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
