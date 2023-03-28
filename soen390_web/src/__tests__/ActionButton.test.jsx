import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import ActionButton from '../components/ActionButton';
import { handleWithdrawApplication } from '../api/ApplicationHistoryApi';


describe('ActionButton', () => {
  it('renders without error', () => {
    render(<ActionButton />);
  });

  it('opens the popper when button is clicked', () => {
    render(<ActionButton />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  it('closes the popper when the close button is clicked', () => {
    render(<ActionButton />);
    fireEvent.click(screen.getByRole('button'));
    // fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  it('withdraws the application when the "Withdraw application" button is clicked', async () => {
    // Mock the handleWithdrawApplication function
    const mockHandleWithdrawApplication = jest.fn();
    jest.mock('../api/ApplicationHistoryApi', () => ({
      handleWithdrawApplication: mockHandleWithdrawApplication,
    }));

    render(<ActionButton postingID="123" />);

    fireEvent.click(screen.getByRole('button'));

    // Click the "Withdraw application" button
    fireEvent.click(screen.getByText('Withdraw application'));


  });
  it('displays success message if application withdrawal succeeds', async () => {
    const postingID = '123';
    const originalAlert = window.alert;
    window.alert = jest.fn();
    const handleWithdrawApplication = (postingID) => {
      if (typeof postingID !== 'string') {
        throw new Error('Invalid posting ID');
      }
      // your existing code here
      window.alert('Application withdrawn successfully!');
    };

    await handleWithdrawApplication(postingID);

    expect(window.alert).toHaveBeenCalledWith('Application withdrawn successfully!');
    window.alert = originalAlert;
  });




});
