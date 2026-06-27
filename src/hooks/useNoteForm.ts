'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { NoteFormData, NoteFormErrors } from '@/types';
import { validateNoteForm, hasErrors } from '@/utils';

export function useNoteForm(onSuccess?: () => void) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<NoteFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data: NoteFormData = { title, body };
    const validationErrors = validateNoteForm(data);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setApiError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        setApiError('Session expired. Please log in again.');
        return;
      }
      if (!res.ok) throw new Error('Failed to create note');

      setTitle('');
      setBody('');
      onSuccess?.();
    } catch {
      setApiError('Failed to save note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    title,
    setTitle,
    body,
    setBody,
    errors,
    isSubmitting,
    apiError,
    handleSubmit,
  };
}
