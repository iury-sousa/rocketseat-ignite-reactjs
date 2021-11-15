import { query } from "faunadb";
import NextAuth from "next-auth";
import Provides from "next-auth/providers";
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Provides.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      try {
        const { email } = user;

        const { Create, Collection } = query;
        await fauna.query(
          Create(Collection("users"), {
            data: { email },
          })
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
