'use client';
import { useNotes } from '@/hooks';
import { NoteCard } from './NoteCard';

export function NotesList() {
  const { notes, loading, error, deleteNote } = useNotes();

  if (loading) {
    return <p className="text-gray-400">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (notes.length === 0) {
    return (
      <p className="text-gray-500">
        No notes yet. Create your first one above.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard note={note} onDelete={deleteNote} />
        </li>
      ))}
    </ul>
  );
}
