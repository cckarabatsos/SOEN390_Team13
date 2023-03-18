import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyHeader from '../components/CompanyHeader';

describe('CompanyHeader', () => {
  const mockName = 'Company name';
  const mockPicture = 'https://example.com/avatar.jpg';
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the company name and picture', () => {
    render(<CompanyHeader name={mockName} picture={mockPicture} />);
    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', mockPicture);
  });

  it('calls the onClick function when the Edit button is clicked', () => {
    render(<CompanyHeader name={mockName} picture={mockPicture} onClick={onClickMock} />);
    fireEvent.click(screen.getByText('Edit'));
  });
});
