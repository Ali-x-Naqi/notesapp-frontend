import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotesList } from '@/components';
import type { Note } from '@/types';

const mockNotes: Note[] = [
  {
    id: 1,
    user: null,
    title: 'First Note',
    body: 'First note body text',
    created_at: '2026-06-01T00:00:00.000Z',
    updated_at: '2026-06-01T00:00:00.000Z',
  },
  {
    id: 2,
    user: null,
    title: 'Second Note',
    body: 'Second note body text',
    created_at: '2026-06-02T00:00:00.000Z',
    updated_at: '2026-06-02T00:00:00.000Z',
  },
];

describe('NotesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state when loading is true', () => {
    render(
      <NotesList notes={[]} loading={true} error={null} onDelete={vi.fn()} />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders notes when provided', () => {
    render(
      <NotesList
        notes={mockNotes}
        loading={false}
        error={null}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText('First Note')).toBeInTheDocument();
    expect(screen.getByText('Second Note')).toBeInTheDocument();
  });

  it('shows error message when error is set', () => {
    render(
      <NotesList
        notes={[]}
        loading={false}
        error="Could not load notes. Please refresh."
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText(/could not load/i)).toBeInTheDocument();
  });

  it('calls onDelete with the note id when Delete is clicked', async () => {
    const onDelete = vi.fn();
    render(
      <NotesList
        notes={mockNotes}
        loading={false}
        error={null}
        onDelete={onDelete}
      />
    );
    await userEvent.click(
      screen.getAllByRole('button', { name: /delete/i })[0]
    );
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
