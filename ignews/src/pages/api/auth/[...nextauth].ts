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

        const {
          Create,
          Collection,
          If,
          Not,
          Exists,
          Match,
          Index,
          Casefold,
          Get,
        } = query;

        const where = Match(Index("user_by_email"), Casefold(email));

        await fauna.query(
          If(
            Not(Exists(where)),
            Create(Collection("users"), {
              data: { email },
            }),
            Get(where)
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
