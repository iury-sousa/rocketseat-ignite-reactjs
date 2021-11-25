import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type FetchData = {
  users: User[];
};

export async function getUsers(): Promise<User[] | null> {
  const response = await api.get<FetchData>("/users");
  const data = response.data;

  if (!data || !data.users) {
    return null;
  }

  const users = data.users.map((user) => {
    return {
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery("users", getUsers, { staleTime: 1000 * 5 });
}
