import axios, { AxiosError, HeadersDefaults } from "axios";
import { parseCookies, setCookie } from "nookies";

export type HeaderProperties = HeadersDefaults & {
  Authorization: string;
};

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { status, data } = error.response ?? {};
    if (status === 401) {
      if (data?.code === "token.expired") {
        cookies = parseCookies();

        const { "nextauth.refreshToken": refreshToken } = cookies;

        api
          .post("/refresh", {
            refreshToken,
          })
          .then((response) => {
            const { token, refreshToken: newRefreshToken } = response.data;

            setCookie(undefined, "nextauth.token", token, {
              maxAge: 60 * 60 * 24 * 30, // 30 Dias
              path: "/",
            });

            setCookie(undefined, "nextauth.refreshToken", newRefreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 Dias
              path: "/",
            });

            api.defaults.headers = {
              ...api.defaults.headers,
              Authorization: `Bearer ${token}`,
            } as HeaderProperties;
          });
      } else {
      }
    }
  }
);
