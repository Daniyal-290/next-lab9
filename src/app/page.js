/*
 * FILE: src/app/page.js
 * This is the public home page.
 */

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        SEL-310 Web Engineering - Lab 9
      </h1>
      <p className="text-lg">
        Welcome to the Next.js and Auth.js demonstration project.
      </p>
      <p className="mt-4">
        Navigate using the links in the header. The "Main" and "Item 1"
        routes are protected and will require you to log in.
      </p>
    </div>
  );
}