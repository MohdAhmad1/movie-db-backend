import axios from "axios";
import { CONSTANTS } from "../../global";
import { LoginSchema, SignupSchema } from "./auth.schema";

export async function loginApiCall(data: Zod.infer<typeof LoginSchema>) {
  return axios
    .post(CONSTANTS.BaseURL + "/auth/login", data)
    .then((res) => res.data);
}

export async function signupApiCall(data: Zod.infer<typeof SignupSchema>) {
  return axios
    .post(CONSTANTS.BaseURL + "/auth/register", data)
    .then((res) => res.data);
}
