import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-8 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl" />
      <h1 className="text-5xl font-extrabold tracking-tight text-white">
        Your Notes, Organized
      </h1>
      <p className="mt-4 max-w-md text-lg text-gray-400">
        A simple, clean notes app to capture your thoughts. Create, edit, and
        manage your notes with ease.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/notes"
          className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-gray-950 transition-opacity hover:opacity-90"
        >
          View Notes
        </Link>
        <Link
          href="/about"
          className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500"
        >
          About
        </Link>
      </div>
    </section>
  );
}
