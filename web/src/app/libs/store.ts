import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/app/services/authApi";
import { flightsApi } from "@/app/services/flightsApi";
import { chatApi } from "@/app/services/chatApi";
import { profileApi } from "@/app/services/profileApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(authApi.middleware)
      .concat(flightsApi.middleware)
      .concat(chatApi.middleware)
      .concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
