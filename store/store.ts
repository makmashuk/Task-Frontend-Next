import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authenticationReducer } from "./loginSlice";
import { movieReducer } from "./movieSlice";
import { snackbarReducer } from "./snackbarSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    movie: movieReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof store>;

// export const wrapper = createWrapper(store , { debug:true});F
