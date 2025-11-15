/*
 * FILE: src/app/main/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 4 (Static Server Page with Server-Side Fetch)
 *
 * -- MODIFIED with a better UI --
 */

import { auth } from "../../Auth.js"; // Using relative path
import { redirect } from "next/navigation";

// Helper function to fetch data
async function getApiData() {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    // Return an error object
    return { error: "Could not load data." };
  }
}

export default async function MainPage() {
  // TASK 3: Retrieve session using server authentication
  const session = await auth();

  // TASK 3: Deny access and redirect if no session
  if (!session) {
    redirect("/signin?callbackUrl=/main");
  }

  // TASK 4: Fetch data from a public API on the server
  const data = await getApiData();

  // TASK 3: Allow access if session is valid
  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome, {session.user.name}!
        </h1>
        <p className="text-lg text-gray-600">
          You are successfully logged in and viewing a server-protected page.
          The data below was fetched on the server *before* this page was sent
          to you.
        </p>
      </div>

      {/* Fetched Data Card */}
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Server-Fetched Data (Post 1)
        </h2>
        {/* Check if data has an error */}
        {data.error ? (
          <div className="text-red-500 bg-red-100 p-4 rounded-lg">
            <strong>Error:</strong> {data.error}
          </div>
        ) : (
          <article className="space-y-3">
            <h3 className="text-xl font-bold text-blue-700 capitalize">
              {data.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{data.body}</p>
          </article>
        )}
      </div>
    </div>
  );
}