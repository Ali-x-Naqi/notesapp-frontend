import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotesList } from '@/components';
import type { Note } from '@/types';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'First Note',
    body: 'First note body text',
    authorId: 'user1',
    createdAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Second Note',
    body: 'Second note body text',
    authorId: 'user1',
    createdAt: '2026-06-02T00:00:00.000Z',
    updatedAt: '2026-06-02T00:00:00.000Z',
  },
];

describe('NotesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state on initial render', () => {
    mockFetch.mockReturnValueOnce(new Promise(() => {}));
    render(<NotesList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders notes after fetch resolves successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockNotes }),
    });
    render(<NotesList />);
    expect(await screen.findByText('First Note')).toBeInTheDocument();
    expect(screen.getByText('Second Note')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    render(<NotesList />);
    expect(await screen.findByText(/could not load/i)).toBeInTheDocument();
  });

  it('removes a note from the list when Delete is clicked', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockNotes }),
      })
      .mockResolvedValueOnce({ ok: true });
    render(<NotesList />);
    expect(await screen.findByText('First Note')).toBeInTheDocument();
    await userEvent.click(
      screen.getAllByRole('button', { name: /delete/i })[0]
    );
    await waitFor(() => {
      expect(screen.queryByText('First Note')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Second Note')).toBeInTheDocument();
  });
});
