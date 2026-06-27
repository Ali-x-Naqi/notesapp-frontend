# Component Generation Patterns

## Naming Conventions

- PascalCase for component names and file names: `NoteCard.tsx`, `SearchBar.tsx`
- Props interface name: `<ComponentName>Props`
- Named exports only — never default export for components: `export function NoteCard(...)`
- Always add to `src/components/index.ts` barrel after creating

## Server Component Template (no hooks/events)

```typescript
import type { Note } from '@/types';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-white">{note.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{note.body}</p>
    </div>
  );
}
```

## Client Component Template (uses hooks/events)

```typescript
'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-gray-800/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
      />
    </form>
  );
}
```

## Rules

1. Add `'use client'` only when needed: hooks, event handlers, browser APIs
2. Named function syntax — never `React.FC<Props>`
3. Never use `any` — use `unknown` and narrow the type
4. Always type callback props: `onDelete: (id: string) => void`
5. Export from `src/components/index.ts` after creating
6. Use `@/` for all internal imports — never relative paths across directories
7. No nested if/else — early returns only

## Barrel Export Pattern

After creating `src/components/NewComponent.tsx`, add to `src/components/index.ts`:
```typescript
export { NewComponent } from './NewComponent';
```

## Custom Hook Pattern

When a component has complex state or fetch logic, extract to `src/hooks/`:

```typescript
// src/hooks/useNoteForm.ts
export function useNoteForm() {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState<NoteFormErrors>({});
  // ...
  return { title, setTitle, errors, handleSubmit };
}
```

Then in the component:
```typescript
import { useNoteForm } from '@/hooks';
const { title, setTitle, errors, handleSubmit } = useNoteForm();
```
