import { axios } from "../global";

export function getMovies() {
  return axios.get("/movies").then((res) => res.data);
}

export function getGenres() {
  return axios.get("/genre").then((res) => res.data);
}

export function getActors() {
  return axios.get("/actors").then((res) => res.data);
}
