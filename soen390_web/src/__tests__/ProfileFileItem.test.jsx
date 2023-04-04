import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileFileItem from '../components/ProfileFileItem.jsx';

describe('ProfileFileItem', () => {
  test('renders filename and icon', () => {
    render(<ProfileFileItem filename="testfile.pdf" file="/testfile.pdf" />);

    expect(screen.getByText('testfile.pdf')).toBeInTheDocument();
    expect(screen.getByTestId('file-link')).toBeInTheDocument();
  });

  test('opens file in new tab when clicked', () => {
    render(<ProfileFileItem filename="testfile.pdf" file="/testfile.pdf" />);

    const link = screen.getByTestId('file-link');
    userEvent.click(link);

    expect(link).not.toHaveAttribute('target', '_blank');
  });
});