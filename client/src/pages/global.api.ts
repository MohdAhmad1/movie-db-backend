import { axios } from "../global";

export function getMovies() {
  return axios.get("/movies").then((res) => res.data);
}
