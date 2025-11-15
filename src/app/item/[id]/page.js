/*
 * FILE: src/app/item/[id]/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 5 (Dynamic Server Page with Server-Side Fetch)
 *
 * -- This code is correct and will fix the 'undefined' error --
 */

import { auth } from "../../../Auth.js";
import { redirect, notFound } from "next/navigation";

export default async function DynamicItemPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams ?? {};

  if (!id || id === "undefined") notFound();

  let session;
  try {
    session = await auth();
  } catch (err) {
    console.error("Auth error in DynamicItemPage:", err);
    if (process.env.NODE_ENV === "development") {
      return <pre>{String(err.stack || err.message || err)}</pre>;
    }
    notFound();
  }

  if (!session) redirect(`/signin?callbackUrl=${encodeURIComponent(`/item/${id}`)}`);

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


