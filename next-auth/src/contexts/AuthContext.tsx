import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api, HeaderProperties, signOut } from "../services/api";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user?: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SessionResponse = Omit<User, "email"> & {
  token: string;
  refreshToken: string;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get<User>("/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log({ error });
          signOut();
        });
    }
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post<SessionResponse>("/sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Dias
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 Dias
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers = {
        ...api.defaults.headers,
        Authorization: `Bearer ${token}`,
      } as HeaderProperties;

      Router.push("/dashboard");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
