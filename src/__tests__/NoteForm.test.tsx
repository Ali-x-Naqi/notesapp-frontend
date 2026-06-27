import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NoteForm } from '@/components';

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    accessToken: 'test-token',
    isAuthenticated: true,
    username: 'testuser',
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('NoteForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields and submit button', () => {
    render(<NoteForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /save note/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    render(<NoteForm />);
    await userEvent.click(screen.getByRole('button', { name: /save note/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/body is required/i)).toBeInTheDocument();
  });

  it('shows min-length error for title shorter than 3 characters', async () => {
    render(<NoteForm />);
    await userEvent.type(screen.getByLabelText(/title/i), 'ab');
    await userEvent.click(screen.getByRole('button', { name: /save note/i }));
    expect(
      await screen.findByText(/at least 3 characters/i)
    ).toBeInTheDocument();
  });

  it('submits successfully with valid data and clears the form', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    render(<NoteForm />);
    await userEvent.type(screen.getByLabelText(/title/i), 'My Test Note');
    await userEvent.type(
      screen.getByLabelText(/body/i),
      'This is a valid note body.'
    );
    await userEvent.click(screen.getByRole('button', { name: /save note/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue('');
      expect(screen.getByLabelText(/body/i)).toHaveValue('');
    });
    expect(mockFetch).toHaveBeenCalledOnce();
  });
});
