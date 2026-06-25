import type { NoteFormData, NoteFormErrors } from '@/types';

export function validateNoteForm(data: NoteFormData): NoteFormErrors {
  const errors: NoteFormErrors = {};

  if (!data.title) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!data.body) {
    errors.body = 'Body is required';
  } else if (data.body.length < 10) {
    errors.body = 'Body must be at least 10 characters';
  }

  return errors;
}

export function hasErrors(errors: NoteFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
