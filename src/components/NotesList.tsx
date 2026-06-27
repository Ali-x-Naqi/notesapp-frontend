'use client';
import type { Note } from '@/types';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}

export function NotesList({ notes, loading, error, onDelete }: NotesListProps) {
  if (loading) return <p className="text-gray-400">Loading notes...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
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
          <NoteCard note={note} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
