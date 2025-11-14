/*
 * FILE: src/app/main/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 4 (Static Server Page with Server-Side Fetch)
 */

import { auth } from "@/auth.js";
import { redirect } from "next/navigation";

// Helper function to fetch data
async function getApiData() {
  try {
    // We'll use a public API for demonstration
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return { title: "Error", body: "Could not load data." };
  }
}

export default async function MainPage() {
  // TASK 3: Retrieve session using server authentication
  const session = await auth();

  // TASK 3: Deny access and redirect if no session
  if (!session) {
    redirect("/signin");
  }

  // TASK 4: Fetch data from a public API on the server
  // This runs only after the session check passes.
  const data = await getApiData();

  // TASK 3: Allow access if session is valid
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Protected Server Page (/main)
      </h1>
      <p className="text-lg mb-6">
        Hello, <span className="font-semibold">{session.user.name}</span>! You
        can see this page because you are authenticated.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">
          Server-Fetched Data:
        </h2>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{data.title}</h3>
        <p className="text-gray-700">{data.body}</p>
      </div>
    </div>
  );
}