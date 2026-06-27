export interface Note {
  id: number;
  user: number | null;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface NoteFormData {
  title: string;
  body: string;
}

export interface NoteFormErrors {
  title?: string;
  body?: string;
}
