import { NoteForm, NotesList } from '@/components';

export default function NotesPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-white">Notes</h1>
      <div className="mb-8">
        <NoteForm />
      </div>
      <NotesList />
    </section>
  );
}
