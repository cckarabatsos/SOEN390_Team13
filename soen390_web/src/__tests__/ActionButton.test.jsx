import React from 'react';
import { render, fireEvent, screen,getAllByRole,waitFor } from '@testing-library/react';
import ActionButton from '../components/ActionButton';
import api from "../config.json";
import { MemoryRouter } from 'react-router-dom';
import ApplicationHistoryApi from '../api/ApplicationHistoryApi' ;
import { handleWithdrawApplication } from '../api/ApplicationHistoryApi';
import { toHaveStyle } from '@testing-library/jest-dom';
import { Paper } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import {handleWithdraw} from '../components/ActionButton'
import { Box } from "@mui/system";

describe('ActionButton', () => {
  const userID = '1';
  const postingID = '1';

  test('displays popper when button is clicked', async () => {
    // render component inside Router
    render(
      <Router>
        <ActionButton userID={userID} postingID={postingID} />
      </Router>
    );

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

  test('renders Paper component with correct width and border radius', () => {
    const { container } = render(
      <Paper sx={{ width: '220px', borderRadius: '10px' }}>
        <div>Test Content</div>
      </Paper>
    );
    const paperEl = container.firstChild;
    expect(paperEl).toHaveStyle('width: 220px');
    expect(paperEl).toHaveStyle('border-radius: 10px');
  });
  describe('<Box />', () => {
    it('has correct styles', () => {
      const { getByTestId } = render(
        <Box
          sx={{
            p: 1,
            bgcolor: 'transparent',
          }}
          data-testid="styled-box"
        >
          Example Box
        </Box>
      );
      
      const styledBox = getByTestId('styled-box');
      
      expect(styledBox).toHaveStyle({
        padding: '8px', // 1 * 8
        backgroundColor: 'transparent',
      });

    });

    

  test('withdraws application and shows alert on confirmation', async () => {
    const confirmedMock = jest.spyOn(window, 'confirm');
    confirmedMock.mockReturnValueOnce(true); // mock user confirmation to true
    const handleWithdrawApplicationMock = jest.fn(); // create a mock function for handleWithdrawApplication
    handleWithdrawApplicationMock.mockResolvedValueOnce(); // mock handleWithdrawApplication to resolve
  
    await handleWithdrawApplication(postingID, handleWithdrawApplicationMock);
    
    console.log('confirm string:', 'Are you sure you want to withdraw this application?');
    expect(confirmedMock).toHaveBeenCalledWith("Are you sure you want to withdraw this application?");
    
    confirmedMock.mockReturnValueOnce(true);
    expect(handleWithdrawApplicationMock).toHaveBeenCalledWith(postingID);
    expect(window.location.reload).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Application withdrawn successfully!');
  
    confirmedMock.mockRestore(); // restore window.confirm
  });
 
  })

})