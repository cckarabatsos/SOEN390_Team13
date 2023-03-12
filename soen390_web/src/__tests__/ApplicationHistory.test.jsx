import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicationHistory from '../pages/ApplicationHistory';
import { getAllApplication } from '../api/ApplicationHistoryApi';
import axios from "axios"; 
import api from "../config.json";

jest.mock('axios');

describe('ApplicationHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders application history', async () => {
    // mock axios.get() to return real data
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: getAllApplication() }));
  
    // render component
    render(<ApplicationHistory />);
  
    // verify that job titles are displayed
    const jobTitles = mockData.map((item) => item.jobTitle);
    for (const jobTitle of jobTitles) {
      expect(await screen.findByText(jobTitle)).toBeInTheDocument();
    }
  });

  test('renders application history with correct table headers', async () => {
    // mock API call

    // render component
    render(<ApplicationHistory />);

    // verify that table headers are displayed
    expect(await screen.findByText(/Position/i)).toBeInTheDocument();
    expect(await screen.findByText(/Location/i)).toBeInTheDocument();
    expect(await screen.findByText(/Company/i)).toBeInTheDocument();
    expect(await screen.findByText(/Contract/i)).toBeInTheDocument();
    expect(await screen.findByText(/Action/i)).toBeInTheDocument();
  });
});
test('renders without errors', () => {
  render(<ApplicationHistory />);
});


test('displays correct heading', () => {
  render(<ApplicationHistory />);
  const heading = screen.getByText('My applications');
  expect(heading).toBeInTheDocument();
});


