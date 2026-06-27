'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { Note } from '@/types';

export function useNotes() {
  const { accessToken, isAuthenticated } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${apiUrl}/api/notes/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 401) {
        setError('Session expired. Please log in again.');
        return;
      }
      if (!res.ok) throw new Error('Failed to load notes');
      const data = (await res.json()) as Note[];
      setNotes(data);
    } catch {
      setError('Could not load notes. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [accessToken, isAuthenticated]);

  useEffect(() => {
    void fetchNotes();
  }, [fetchNotes]);

  const deleteNote = useCallback(
    async (id: number) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/notes/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [accessToken]
  );

  return { notes, loading, error, deleteNote, refetch: fetchNotes };
}
