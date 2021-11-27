import axios, { HeadersDefaults } from "axios";
import { parseCookies } from "nookies";

export type HeaderProperties = HeadersDefaults & {
  Authorization: string;
};

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});
