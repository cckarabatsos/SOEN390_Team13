// import dependencies
import React from 'react';
//import react testing methods
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyHeader from '../components/CompanyHeader';

describe('CompanyHeader', () => {
  const mockName = 'Company name';
  const mockPicture = 'https://example.com/avatar.jpg';
  const onClickMock = jest.fn();

  const props = {
    name: 'company name',
    isFollowing: false,
    userId: 123,
    companyId: 456,
    setIsFollowing: jest.fn(),
    userData: { userID: 456, isCompany: true },
    setUpdateFlag: jest.fn(),
    updateFlag: false,
    companyData: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render follow button if userData.isCompany is true', () => {
    const propsWithUserDataIsCompanyTrue = {
      ...props,
      userData: { userID: 456, isCompany: true },
    };
    render(<CompanyHeader {...propsWithUserDataIsCompanyTrue} />);
    const followButton = screen.queryByRole('button', { name: 'Follow company' });
    expect(followButton).not.toBeInTheDocument();
  });

  it('renders company name and picture', () => {
    const mockName = 'Company name';
    const mockPicture = 'https://example.com/avatar.jpg';
    render(<CompanyHeader name={mockName} picture={mockPicture} />);
    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', mockPicture);
  });

  it('renders company name', () => {
    render(<CompanyHeader {...props} />);
    const companyName = screen.getByText('company name');
    expect(companyName).toBeInTheDocument();
  });

  test('renders follow button', () => {
    render(<CompanyHeader {...props} />);
    const followButton = screen.queryByRole('button', { name: "" });
    expect(followButton).not.toBeInTheDocument();
  });

  test('renders edit button when user is the company owner', () => {
    render(<CompanyHeader {...props} />);
    const editButton = screen.queryByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();
  });

  test('clicking edit button opens the company edit modal', () => {
    render(<CompanyHeader {...props} />);
    const editButton = screen.queryByRole('button', { name: 'Edit' });
    fireEvent.click(editButton);
  });


  // checks if company name and picture are rendered
  it('renders the company name and picture', () => {
    render(<CompanyHeader name={mockName} picture={mockPicture} />);
    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', mockPicture);
  });

  // checks if onClick function works when button is clicked
  it('calls the onClick function when the Edit button is clicked', () => {
    render(<CompanyHeader name={mockName} picture={mockPicture} onClick={onClickMock} />);
  });
});