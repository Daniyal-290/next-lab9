/*
 * FILE: src/app/item/[id]/page.js
 * Fulfills Task 3 (Server-Side Only Protection)
 * Fulfills Task 5 (Dynamic Server Page with Server-Side Fetch)
 *
 * -- This code is correct and will fix the 'undefined' error --
 */

import { auth } from "../../../Auth.js";
import { redirect } from "next/navigation";

// Helper to fetch post data safely
async function getDynamicApiData(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(id)}`);
        if (!res.ok) {
            if (res.status === 404) return { notFound: true };
            throw new Error(`Fetch failed: ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        console.error("getDynamicApiData error:", err);
        return { error: err.message || "Unknown error" };
    }
}

export default async function DynamicItemPage({ params }) {
    // unwrap params (can be a Promise)
    const resolvedParams = await params;
    const { id } = resolvedParams ?? {};

    // If id is missing or literally "undefined", show the friendly message
    if (!id || id === "undefined") {
        return (
            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Missing item id</h1>
                <p className="text-gray-600">
                    The requested item id is missing or invalid. Navigate using the header link (e.g. Item 1)
                    or open /item/1 directly.
                </p>
            </div>
        );
    }

    // auth after validating id so callbackUrl includes a real id
    let session;
    try {
        session = await auth();
    } catch (err) {
        console.error("Auth error in DynamicItemPage:", err);
        if (process.env.NODE_ENV === "development") {
            return (
                <div className="p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-xl font-bold">Server error</h2>
                    <pre className="whitespace-pre-wrap mt-2">{String(err.stack || err.message || err)}</pre>
                </div>
            );
        }
        // fallback: redirect to sign-in (production)
        redirect(`/signin?callbackUrl=${encodeURIComponent(`/item/${id}`)}`);
    }

    if (!session) {
        redirect(`/signin?callbackUrl=${encodeURIComponent(`/item/${id}`)}`);
    }

    const data = await getDynamicApiData(id);

    return (
        <div className="space-y-8">
            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dynamic Page: Item #{id}</h1>
                <p className="text-lg text-gray-600">Hello, {session?.user?.name}! You are viewing a dynamic page for a specific item.</p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Server-Fetched Data (Post {id})</h2>

                {data?.notFound ? (
                    <div className="text-red-500 bg-red-100 p-4 rounded-lg">
                        <strong>Not found:</strong> No post exists with id {id}.
                    </div>
                ) : data?.error ? (
                    <div className="text-red-500 bg-red-100 p-4 rounded-lg">
                        <strong>Error:</strong> {data.error}
                        <p className="mt-2 text-sm text-gray-700">This can happen if the item ID doesn't exist or there was a network problem.</p>
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


