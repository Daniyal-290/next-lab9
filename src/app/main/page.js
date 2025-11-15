/*
 * FILE: src/app/item/[id]/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 5 (Dynamic Server Page with Server-Side Fetch)
 *
 * -- ADDING DEBUG LOGS --
 */

import { auth } from "../../../Auth.js"; // Using relative path
import { redirect } from "next/navigation";

// Helper function to fetch data using the dynamic segment
async function getDynamicApiData(id) {
  // Debug Log 2: What ID is the fetch function receiving?
  console.log("getDynamicApiData called with id:", id);

  try {
    // This fetch URL now correctly uses the 'id' variable
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch post with id ${id}. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    // Return a more detailed error
    return { error: error.message || "Could not load data." };
  }
}

// We are changing { params } to props to be extra safe
export default async function DynamicItemPage(props) {
  // Debug Log 1: What props is the page component receiving?
  console.log("DynamicItemPage props:", JSON.stringify(props, null, 2));

  // Accessing id directly from props.params
  const id = props.params.id;

  // TASK 3: Retrieve session using server authentication
  const session = await auth();

  // TASK 3: Deny access and redirect if no session
  if (!session) {
    redirect(`/signin?callbackUrl=/item/${id}`); // Use id here
  }

  // TASK 5: Fetch data on the server using the dynamic segment
  const data = await getDynamicApiData(id);

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
          Hello, {session.user.name}! You are viewing a dynamic page for a
          specific item.
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
              This can happen if the item ID doesn't exist or there was a
              network problem.
            </p>
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