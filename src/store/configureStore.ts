import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import childrenSlice from "./auth/children/childrenSlice";
import breadcumbSlice from "./breadcumb/breadcumbSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: ["children", "breadcumb"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  children: childrenSlice,
  breadcumb: breadcumbSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ...

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
