import NextAuth from "next-auth";
import Provides from "next-auth/providers";

export default NextAuth({
  providers: [
    Provides.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
});
