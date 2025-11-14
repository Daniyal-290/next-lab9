/*
 * FILE: src/app/item/[id]/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 5 (Dynamic Server Page with Server-Side Fetch)
 */

import { auth } from "@/auth.js";
import { redirect } from "next/navigation";

// Helper function to fetch data using the dynamic segment
async function getDynamicApiData(id) {
  try {
    // TASK 5: Fetch data from public API using dynamic segment
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error)
  {
    console.error(error);
    return { title: "Error", body: "Could not load data." };
  }
}

export default async function DynamicItemPage({ params }) {
  // TASK 3: Retrieve session using server authentication
  const session = await auth();

  // TASK 3: Deny access and redirect if no session
  if (!session) {
    redirect("/signin");
  }

  // TASK 5: Fetch data on the server using the dynamic segment
  const { id } = params;
  const data = await getDynamicApiData(id);

  // TASK 3: Allow access if session is valid
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Dynamic Protected Page (/item/{id})
      </h1>
      <p className="text-lg mb-6">
        Hello, <span className="font-semibold">{session.user.name}</span>! You
        are viewing the item with ID: {id}.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">
          Server-Fetched Dynamic Data:
        </h2>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{data.title}</h3>
        <p className="text-gray-700">{data.body}</p>
      </div>
    </div>
  );
}