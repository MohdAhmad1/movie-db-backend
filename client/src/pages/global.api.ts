import { axios } from "../global";
import { CreateActorOrGenreSchema } from "../schema/create-actor-genre.schema";

export function getMovies() {
  return axios.get("/movies").then((res) => res.data);
}

export function getGenres() {
  return axios.get("/genre").then((res) => res.data);
}

export function getActors() {
  return axios.get("/actors").then((res) => res.data);
}

export function createActor(body: Zod.infer<typeof CreateActorOrGenreSchema>) {
  return axios.post("/actors", body).then((res) => res.data);
}

export function createGenre(body: Zod.infer<typeof CreateActorOrGenreSchema>) {
  return axios.post("/genre", body).then((res) => res.data);
}
