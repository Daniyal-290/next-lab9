/*
 * FILE: src/components/Navbar.js
 * This component fulfills all of Task 7.
 * It's an async Server Component that fetches the session
 * and displays different content based on login status.
 */

import { auth, signIn, signOut } from "../Auth.js"; // use correct file casing to match filesystem
import Link from "next/link";

// This is an async Server Component
export default async function Navbar() {
  // Get the session on the server
  const session = await auth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/main" className="hover:text-gray-300">
            Main (Protected)
          </Link>
          {/* Link to a dynamic page. Let's hardcode one for demo. */}
          <Link href="/item/1" className="hover:text-gray-300">
            Item 1 (Protected)
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* TASK 7: Display different options based on auth status */}
          {!session ? (
            // User is not logged in
            <Link
              href="/signin"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </Link>
          ) : (
            // User IS logged in
            <>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="hidden sm:block">{session.user.name}</span>

              {/*
                This form uses a Server Action to log the user out.
                This is the recommended approach.
              */}
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}