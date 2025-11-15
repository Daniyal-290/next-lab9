/*
 * FILE: src/app/item/[id]/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 5 (Dynamic Server Page with Server-Side Fetch)
 *
 * -- This code is correct and will fix the 'undefined' error --
 */

import { auth } from "../../../Auth.js"; // Using relative path
import { redirect, notFound } from "next/navigation";

// Helper function to fetch data using the dynamic segment
async function getDynamicApiData(id) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(id)}`
    );

    // If the API returns 404, signal that explicitly
    if (!res.ok) {
      if (res.status === 404) return { notFound: true };
      throw new Error(`Failed to fetch post with id ${id}. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: error.message || "Could not load data." };
  }
}

export default async function DynamicItemPage({ params }) {
  // DEBUG: log params to server console
  console.log("DynamicItemPage params:", params);

  const session = await auth();

  // If not authenticated, redirect to sign-in with callback
  if (!session) {
    redirect(`/signin?callbackUrl=/item/${params?.id ?? ""}`);
  }

  const { id } = params ?? {};

  // Defensive: handle missing or literal "undefined" id without crashing to 404
  if (!id || id === "undefined") {
    console.error("Missing or invalid dynamic id in params:", params);
    return (
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Missing item id</h1>
        <p className="text-gray-600">
          The requested item id is missing or invalid. Navigate using the header link
          (e.g. Item 1) or open /item/1 directly.
        </p>
      </div>
    );
  }

  const data = await getDynamicApiData(id);

  // If upstream API returned 404 for this id, render Next.js 404
  if (data?.notFound) {
    notFound();
  }

  // TASK 3: Allow access if session is valid
  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        {/* The 'id' variable is used here */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dynamic Page: Item #{id}
        </h1>
        <p className="text-lg text-gray-600">
          Hello, {session.user.name}! You are viewing a dynamic page for a specific item.
        </p>
      </div>

      {/* Fetched Data Card */}
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        {/* The 'id' variable is used here */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Server-Fetched Data (Post {id})
        </h2>
        {/* Check if data has an error */}
        {data.error ? (
          <div className="text-red-500 bg-red-100 p-4 rounded-lg">
            <strong>Error:</strong> {data.error}
            <p className="mt-2 text-sm text-gray-700">
              This can happen if the item ID doesn't exist or there was a network problem.
            </p>
          </div>
        ) : (
          <article className="space-y-3">
            <h3 className="text-xl font-bold text-blue-700 capitalize">{data.title}</h3>
            <p className="text-gray-700 leading-relaxed">{data.body}</p>
          </article>
        )}
      </div>
    </div>
  );
}


