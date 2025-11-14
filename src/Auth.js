/*
 * FILE: auth.js (at the root of your project)
 * This file configures Auth.js with all your providers.
 * Fulfills (part of) Task 1 and 6.
 *
 * -- MODIFIED TO REMOVE FACEBOOK DUE TO ACCOUNT RESTRICTION --
 */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
// import Facebook from "next-auth/providers/facebook"; // <-- REMOVED

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Facebook({ // <-- REMOVED
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
  ],
  // This is a custom sign-in page, as required by Task 1.
  pages: {
    signIn: "/signin",
  },
});