# Test Writing Patterns

## Setup

- Test runner: Vitest v4 (configured in `vitest.config.ts`)
- DOM environment: jsdom
- Setup file: `src/test-setup.ts` (imports `@testing-library/jest-dom/vitest` matchers)
- Test location: `src/__tests__/*.test.tsx`
- Path alias `@/` works in tests (aliased to `src/`)

## Required Imports

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '@/components';
```

## Always Mock next/navigation (when component uses usePathname/useRouter)

```typescript
vi.mock('next/navigation', () => ({
  usePathname: () => '/mock-path',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));
```

## Always Mock fetch + localStorage for API components

```typescript
const mockFetch = vi.fn();
global.fetch = mockFetch;
vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

beforeEach(() => { vi.clearAllMocks(); });
```

## userEvent Pattern

```typescript
it('handles user interaction', async () => {
  render(<ComponentName />);
  await userEvent.type(screen.getByLabelText(/title/i), 'My Note');
  await userEvent.click(screen.getByRole('button', { name: /save/i }));
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Query Priority (use in this order)

1. `getByRole('button', { name: /label/i })` — best
2. `getByLabelText(/label/i)` — for form inputs
3. `getByText(/text/i)` — for visible text
4. `getByTestId('id')` — last resort only

Always use `/regex/i` (case-insensitive).

## Async Pattern for fetch

```typescript
// Mock a successful fetch
mockFetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: mockNotes }),
});

// Mock a failed fetch
mockFetch.mockResolvedValueOnce({ ok: false });

// Wait for result
expect(await screen.findByText('Note Title')).toBeInTheDocument();
```

## Existing Tests for Reference

- `src/__tests__/NoteForm.test.tsx` — form renders, empty submit errors, min-length error, successful submit clears form
- `src/__tests__/NotesList.test.tsx` — loading state, renders notes, fetch error, delete removes note
