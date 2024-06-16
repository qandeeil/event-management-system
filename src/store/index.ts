import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/user/user";
import tokenSlice from "@/store/user/token";
import eventSlice from "@/store/event/event";

export const store = configureStore({
  reducer: {
    userSlice,
    tokenSlice,
    eventSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
