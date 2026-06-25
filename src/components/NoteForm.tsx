'use client';
import { useNoteForm } from '@/hooks';

export function NoteForm() {
  const {
    title,
    setTitle,
    body,
    setBody,
    errors,
    isSubmitting,
    apiError,
    handleSubmit,
  } = useNoteForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="body"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note here..."
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-400">{errors.body}</p>
        )}
      </div>

      {apiError && <p className="text-sm text-red-400">{apiError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Note'}
      </button>
    </form>
  );
}
