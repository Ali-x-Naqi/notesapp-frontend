import type { Note } from '@/types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const date = new Date(note.created_at).toLocaleDateString();

  return (
    <article className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <div className="mb-2 flex items-start justify-between">
        <h2 className="font-semibold text-white">{note.title}</h2>
        <button
          onClick={() => onDelete(note.id)}
          className="ml-4 text-sm text-red-400 transition-colors hover:text-red-300"
          aria-label={`Delete ${note.title}`}
        >
          Delete
        </button>
      </div>
      <p className="mb-3 text-sm text-gray-400">{note.body}</p>
      <time className="text-xs text-gray-600">{date}</time>
    </article>
  );
}
