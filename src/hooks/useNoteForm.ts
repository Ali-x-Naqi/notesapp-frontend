'use client';
import { useState } from 'react';
import type { NoteFormData, NoteFormErrors } from '@/types';
import { validateNoteForm, hasErrors } from '@/utils';

export function useNoteForm() {
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
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/api/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create note');

      setTitle('');
      setBody('');
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
