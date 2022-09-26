import { createMovieType } from "../types/movie.type";
import apiClient from "./api";

const getAllMovie = async () => {
  return await apiClient.get("movies");
};
const createNewMovie = async (data: createMovieType) => {
  return await apiClient.post("movies", data);
};
const deleteMovie = async (id: number) => {
  return await apiClient.delete(`movies/${id}`);
};

const movieService = {
  getAllMovie,
  createNewMovie,
  deleteMovie,
};

export default movieService;
