/*
 * FILE: src/app/api/auth/[...nextauth]/route.js
 * This API route handles all authentication requests.
 * Fulfills (part of) Task 1.
 */

// We are using the alias '@/auth' which Next.js sets up.
// This points to the auth.js file in your root.
import { handlers } from "../../../../Auth.js"; // <-- THIS LINE IS CHANGED

// Export the GET and POST handlers for NextAuth
export const { GET, POST } = handlers;