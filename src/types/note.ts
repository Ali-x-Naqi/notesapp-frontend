export interface Note {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  body: string;
}

export interface NoteFormErrors {
  title?: string;
  body?: string;
}
