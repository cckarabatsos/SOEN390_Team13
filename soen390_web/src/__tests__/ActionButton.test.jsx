import React from 'react';
import { render, fireEvent, screen,getAllByRole } from '@testing-library/react';
import ActionButton from '../components/ActionButton';
import api from "../config.json";
import { MemoryRouter } from 'react-router-dom';
import ApplicationHistoryApi from '../api/ApplicationHistoryApi' ;
import { handleWithdrawApplication } from '../api/ApplicationHistoryApi';
import { toHaveStyle } from '@testing-library/jest-dom';
import { Paper } from '@mui/material';


describe('ActionButton', () => {
  const userID = '1';
  const postingID = '1';

  test('displays popper when button is clicked', async () => {
    // render component
    render(<ActionButton userID={userID} postingID={postingID} />);

    // click button
    fireEvent.click(screen.getByRole('button'));

    // verify that popper is displayed
    expect(await screen.findByText(/View application/i)).toBeInTheDocument();
    expect(await screen.findByText(/Withdraw application/i)).toBeInTheDocument();
  });



  test('renders button with three dots', () => {
    render(<ActionButton userID={userID} postingID={postingID} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('...');
  });



  test('clicking "View application" navigates to correct page', async () => {
    render(<ActionButton userID="1" postingID="1" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const viewApp = await screen.findByText(/View application/i);
    fireEvent.click(viewApp);
    expect(window.location.pathname).toBe('/JobSearch');
  });
  
  
  test('clicking "Withdraw application" calls handleWithdraw function', async () => {
    const handleWithdrawApplicationMock = jest.fn();
    ApplicationHistoryApi.handleWithdrawApplication.mockImplementation(handleWithdrawApplicationMock);

    render(<ActionButton userID={userID} postingID={postingID} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const withdrawApp = await screen.findByText(/Withdraw application/i);
    fireEvent.click(withdrawApp);

    expect(handleWithdrawApplicationMock).toHaveBeenCalledWith(postingID);

    expect(await screen.findByText(/Application withdrawn successfully/i)).toBeInTheDocument();
  });
  /*
  test('clicking outside popper closes it', async () => {
    render(<ActionButton userID="1" postingID="1" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const viewApp = await screen.findByText(/View application/i);
    fireEvent.click(document.body);
    expect(viewApp).not.toBeInTheDocument();
  });
  
  test('renders button with three dots', () => {
    render(<ActionButton userID="1" postingID="1" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('...');
  });
  */
  /*
  test('clicking button opens popper', async () => {
    render(<ActionButton userID="1" postingID="1" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const viewApp = await screen.findByText(/View application/i);
    const withdrawApp = await screen.findByText(/Withdraw application/i);
    expect(viewApp).toBeInTheDocument();
    expect(withdrawApp).toBeInTheDocument();
  });
  
*/
test('test Paper styling', (papers) => {
  render(
    <>
      <Paper sx={{ width: '220px', borderRadius: '10px', border: '1px solid transparent', bgcolor: 'background.paper' }} />
      <Paper sx={{ width: '220px', borderRadius: '10px', border: '1px solid primary.main', bgcolor: 'primary.light', cursor: 'pointer' }} />
    </>
  );


  // Test the styling of the first Paper component
  expect(papers[0]).toHaveStyle({
    width: '220px',
    borderRadius: '10px',
    border: '1px solid transparent',
    backgroundColor: 'rgb(255, 255, 255)',
  });

  // Test the styling of the second Paper component
  expect(papers[1]).toHaveStyle({
    width: '220px',
    borderRadius: '10px',
    border: '1px solid rgb(33, 150, 243)',
    backgroundColor: 'rgb(144, 202, 249)',
    cursor: 'pointer',
  });
});



}) 