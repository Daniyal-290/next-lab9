/*
 * FILE: src/app/(auth)/signin/page.js
 * Fulfills Task 1 (auth route group, custom /signin route)
 * Fulfills Task 2 (redirects to home if session exists)
 *
 * -- MODIFIED TO REMOVE FACEBOOK DUE TO ACCOUNT RESTRICTION --
 */

import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

// This is a helper component for the sign-in buttons
function SignInButton({ provider, label }) {
  return (
    <form
      action={async () => {
        "use server";
        // This is the server action that signs the user in
        await signIn(provider);
      }}
    >
      <button
        type="submit"
        className={`w-full py-3 px-4 rounded text-white font-semibold ${
          provider === "google"
            ? "bg-[#DB4437] hover:bg-[#C33D2E]"
            : provider === "github"
            ? "bg-[#333] hover:bg-[#111]"
            : "bg-[#4267B2] hover:bg-[#365899]" // This style won't be used but is harmless
        }`}
      >
        Sign in with {label}
      </button>
    </form>
  );
}

export default async function SignInPage() {
  // TASK 2: If session exists, redirect to home.
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Sign In
        </h1>
        {/* TASK 6: All three providers */}
        <div className="space-y-4">
          <SignInButton provider="google" label="Google" />
          <SignInButton provider="github" label="GitHub" />
          {/* <SignInButton provider="facebook" label="Facebook" /> */}
          {/* <-- REMOVED --> */}
        </div>
      </div>
    </div>
  );
}