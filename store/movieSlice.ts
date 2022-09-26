import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import movieService from "../services/movie.service";
import { createMovieType } from "../types/movie.type";
import { errorSnackbar, successSnackbar } from "./snackbarSlice";
export interface IMovie {
  id: number;
  title: string;
  genre: string;
}

type initialStateType = {
  movieList: IMovie[];
  filteredMovieList: IMovie[];
  isProcessingRequest: boolean;
  isProcessingError: boolean;
};

const initialState: initialStateType = {
  movieList: [],
  filteredMovieList: [],
  isProcessingRequest: false,
  isProcessingError: false,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    start: (state) => {
      state.isProcessingRequest = true;
      state.isProcessingError = false;
    },
    success: (state) => {
      state.isProcessingRequest = false;
    },
    error: (state) => {
      state.isProcessingRequest = false;
      state.isProcessingError = true;
    },
    getAll: (state, action: PayloadAction<IMovie[]>) => {
      state.movieList = action.payload;
    },
    add: (state, action: PayloadAction<IMovie>) => {
      state.movieList.push(action.payload);
      state.isProcessingError = false;
    },
    update: (state, action: PayloadAction<IMovie>) => {
      const {
        payload: { id, title, genre },
      } = action;

      state.movieList = state.movieList.map((movie) =>
        movie.id === id ? { ...movie, title, genre } : movie
      );
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    filter: (state, action: PayloadAction<string>) => {
      state.movieList = state.movieList.filter((item) =>
        item.title.toLowerCase().includes(action.payload)
      );
    },
  },
});
export const fetchAll = () => async (dispatch: any) => {
  try {
    const getAllResponse = await movieService.getAllMovie();
    dispatch(getAll(getAllResponse.data[0]));
    dispatch(successSnackbar("Movies Fetched Successfully"));
  } catch (err: any) {
    dispatch(error());
    dispatch(errorSnackbar(err?.response?.data?.message));
  }
};
export const create = (data: createMovieType) => async (dispatch: any) => {
  try {
    dispatch(start());
    const response = await movieService.createNewMovie(data);
    dispatch(add(response.data));
    dispatch(successSnackbar("Movies Created Successfully"));
  } catch (err: any) {
    dispatch(error());
    dispatch(errorSnackbar(err?.response?.data?.message));
  }
};
export const removeItem = (id: number) => async (dispatch: any) => {
  try {
    dispatch(start());
    const response = await movieService.deleteMovie(id);
    dispatch(remove({ id }));
    dispatch(successSnackbar("Movies Deleted Successfully"));
  } catch (err: any) {
    dispatch(error());
    dispatch(errorSnackbar(err?.response?.data?.message));
  }
};
export const { start, success, error, getAll, add, update, remove, filter } =
  movieSlice.actions;
export const selectMovieList = (state: RootState) => state.movie;
export const movieReducer = movieSlice.reducer;
