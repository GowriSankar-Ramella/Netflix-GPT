import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: []
    },
    reducers: {
        addMovies: (state, action) => {
            state.nowPlaying = action.payload
        },
        addPopular: (state, action) => {
            state.popular = action.payload
        },
        addTopRated: (state, action) => {
            state.topRated = action.payload
        },
        addUpComing: (state, action) => {
            state.upComing = action.payload
        }
    }
})

export const { addMovies, addPopular, addTopRated, addUpComing } = movieSlice.actions
export default movieSlice.reducer