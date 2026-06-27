# Prompts Log

All significant AI prompts used during this project are logged here for transparency and review.

---

## Week 1

### 2026-06-25

**Task:** Initialize the notesapp-frontend project scaffold.

**Prompt:** Initialize a new Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 project with Vitest 4, ESLint 9, and Prettier 3. No backend code — pure frontend only. All API calls go to Django on port 8000 via NEXT_PUBLIC_API_URL. Include a vitest config with jsdom, a test-setup file with jest-dom, and a .claude/claude.md with full project context.

**Tool:** Claude Code (claude-sonnet-4-6)

**Result:**

- Generated `package.json` with frontend-only dependencies
- Generated `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`
- Generated `eslint.config.mjs` with eslint-config-next + Prettier integration
- Generated `.prettierrc.json`, `.prettierignore`
- Generated `vitest.config.ts` with jsdom environment and `@` path alias
- Generated `src/test-setup.ts` importing `@testing-library/jest-dom/vitest`
- Generated `src/app/globals.css` with Tailwind v4 `@import` and CSS custom properties
- Generated `src/app/layout.tsx` and `src/app/page.tsx`
- Generated `.claude/claude.md` with project context

**Notes / Changes Made After Review:** Confirmed no backend packages present. Ran `npm install` and verified `npm run lint` passed with zero errors.

---

### 2026-06-25

**Task:** Build a 3-route SPA with shared Navbar and Footer layout.

**Prompt:** Add a Navbar component with a sticky header, active link highlighting using usePathname(), and links to /, /notes, /about. Add a Footer with dynamic year using new Date().getFullYear(). Create a components/index.ts barrel export. Update layout.tsx to wrap all pages with Navbar and Footer. Update page.tsx with a full hero section. Add about/page.tsx and notes/page.tsx as placeholder pages.

**Tool:** Claude Code (claude-sonnet-4-6)

**Result:**

- Generated `src/components/Navbar.tsx` with sticky positioning and active link detection
- Generated `src/components/Footer.tsx` with dynamic year
- Generated `src/components/index.ts` barrel export
- Updated `src/app/layout.tsx` to include Navbar and Footer
- Updated `src/app/page.tsx` with gradient orb hero and CTA links
- Generated `src/app/about/page.tsx`
- Generated `src/app/notes/page.tsx`

**Notes / Changes Made After Review:** Prettier flagged a line-length issue in about/page.tsx. Fixed manually by rewrapping the paragraph text across more lines. Lint passed after fix.

---

### 2026-06-25

**Task:** Add a NoteForm component with client-side validation.

**Prompt:** Add TypeScript interfaces for Note, NoteFormData, and NoteFormErrors. Create a validateNoteForm utility function that validates title (required, min 3 chars) and body (required, min 10 chars). Create a hasErrors helper. Create a useNoteForm hook with form state, validation, isSubmitting, apiError, and async POST to NEXT_PUBLIC_API_URL/api/notes/. Clear form on success. No UI in the hook. Create a NoteForm component using the hook with controlled inputs, per-field error messages, and a disabled submit button showing "Saving..." while submitting.

**Tool:** Claude Code (claude-sonnet-4-6)

**Result:**

- Generated `src/types/note.ts`, `src/types/index.ts`
- Generated `src/utils/validation.ts` with `validateNoteForm` and `hasErrors`
- Generated `src/utils/index.ts`
- Generated `src/hooks/useNoteForm.ts` — pure logic, no UI, early returns pattern
- Generated `src/hooks/index.ts`
- Generated `src/components/NoteForm.tsx`
- Updated `src/components/index.ts` and `src/app/notes/page.tsx`

**Notes / Changes Made After Review:** No corrections needed. Verified that all validation logic is isolated in utils/validation.ts and no nested if/else was used anywhere.

---

### 2026-06-25

**Task:** Add useNotes hook, NoteCard and NotesList components, and write 8 unit tests.

**Prompt:** Add a useNotes hook that fetches notes from NEXT_PUBLIC_API_URL/api/notes/ with an Authorization header from localStorage, handles loading/error state, and supports deleteNote. Add NoteCard showing title, body, formatted date, and delete button. Add NotesList using useNotes with early returns for loading/error/empty. Write 4 tests for NoteForm (renders fields, empty submit errors, min-length title error, successful submit clears form) and 4 tests for NotesList (loading state, renders notes, fetch error, delete removes note).

**Tool:** Claude Code (claude-sonnet-4-6)

**Result:**

- Generated `src/hooks/useNotes.ts`
- Generated `src/components/NoteCard.tsx`
- Generated `src/components/NotesList.tsx`
- Generated `src/__tests__/NoteForm.test.tsx` (4 tests)
- Generated `src/__tests__/NotesList.test.tsx` (4 tests)
- Updated barrel exports and notes page

**Notes / Changes Made After Review:** Prettier flagged trailing commas in test files. Fixed automatically with `npm run lint:fix`. All 8 tests passed.
