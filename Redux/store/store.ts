import { configureStore } from "@reduxjs/toolkit";
import sectionswap from "../reducers/sectionswap";


export const store = configureStore({

    reducer:{
        sectionSwap:sectionswap
    }
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch