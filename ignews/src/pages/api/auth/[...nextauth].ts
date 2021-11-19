import { query } from "faunadb";
import NextAuth from "next-auth";
import Provides from "next-auth/providers";
import { fauna } from "../../../services/fauna";

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
  Select,
  Intersection,
} = query;

export default NextAuth({
  providers: [
    Provides.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          Get(
            Intersection([
              Match(
                Index("subscription_by_user_ref"),
                Select(
                  "ref",
                  Get(
                    Match(Index("user_by_email"), Casefold(session.user.email))
                  )
                )
              ),
              Match(Index("subscription_by_status"), "active"),
            ])
          )
        );
        return { ...session, activeSubscription: userActiveSubscription };
      } catch {
        return { ...session, activeSubscription: null };
      }
    },
    async signIn(user, account, profile) {
      try {
        const { email } = user;

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
