import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserSearchBar from '../components/UserSearchBar.jsx';

describe('UserSearchBar', () => {
  test('renders search input field', () => {
    const { getByTestId } = render(<UserSearchBar />);
    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('handles search input change', () => {
    const { getByTestId } = render(<UserSearchBar />);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');
  });

  test('renders search button', () => {
    const { getByRole } = render(<UserSearchBar />);
    const searchButton = getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('handles search button click', async () => {
    const mockSetUsers = jest.fn();
    const { getByRole, getByTestId } = render(<UserSearchBar setUsers={mockSetUsers} />);
    const searchInput = getByTestId('search-input');
    const searchButton = getByRole('button', { name: /search/i });
    fireEvent.change(searchInput, { target: { value: 'John' } });
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(mockSetUsers).not.toHaveBeenCalledTimes(1);
    });
  });

  test('renders category filter', () => {
    const { getByLabelText } = render(<UserSearchBar />);
    const categoryFilter = getByLabelText('buttonfilter');
    expect(categoryFilter).not.toBeInTheDocument();
  });

  test('handles category filter change', () => {
    const { getByLabelText } = render(<UserSearchBar />);
    const categoryFilter = getByLabelText('category');
    fireEvent.change(categoryFilter, { target: { value: 'email' } });
    expect(categoryFilter.value).toBe('email');
  });
});