import { configureStore, createSlice} from "@reduxjs/toolkit";

let movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    filteredMovies: [],
    error: null,
  },
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
      // state.filteredMovies = action.payload;
      console.log(state.movies)
    },
    filterMovies(state, action) {
      // console.log(filterMovies)
      const query = action.payload.toLowerCase();
      state.filteredMovies = state.movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
})

export let movieStore = configureStore({
  reducer: {
    movie: movieSlice.reducer
  },

})

export const { setMovies, filterMovies, setError } = movieSlice.actions;
export default movieSlice.reducer;
