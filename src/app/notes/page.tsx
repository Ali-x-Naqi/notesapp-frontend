'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NoteForm, NotesList } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useNotes } from '@/hooks';

export default function NotesPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { notes, loading, error, deleteNote, refetch } = useNotes();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-white">Notes</h1>
      <div className="mb-8">
        <NoteForm onSuccess={refetch} />
      </div>
      <NotesList
        notes={notes}
        loading={loading}
        error={error}
        onDelete={deleteNote}
      />
    </section>
  );
}
