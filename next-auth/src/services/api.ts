import axios, { AxiosError, HeadersDefaults } from "axios";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

export type HeaderProperties = HeadersDefaults & {
  Authorization: string;
};

type FailedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

export function setupApiClient(
  context: GetServerSidePropsContext | undefined = undefined
) {
  let cookies = parseCookies(context);

  const api = axios.create({
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
          cookies = parseCookies(context);

          const { "nextauth.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data;

                setCookie(context, "nextauth.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 Dias
                  path: "/",
                });

                setCookie(context, "nextauth.refreshToken", newRefreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 Dias
                  path: "/",
                });

                api.defaults.headers = {
                  ...api.defaults.headers,
                  Authorization: `Bearer ${token}`,
                } as HeaderProperties;

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch((error) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(error)
                );
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers = {
                  ...originalConfig.headers,
                  Authorization: `Bearer ${token}`,
                };

                resolve(api(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
