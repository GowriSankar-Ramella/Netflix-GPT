import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice"
import MovieReducer from "./movieSlice"

const store = configureStore({
    reducer: {
        user: UserReducer,
        movie: MovieReducer
    }
})

export default store