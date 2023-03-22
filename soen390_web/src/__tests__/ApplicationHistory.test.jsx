import React from 'react';
import { act, render, screen } from '@testing-library/react';
import ApplicationHistory from '../pages/ApplicationHistory';
import { getAllApplication } from '../api/ApplicationHistoryApi';
import axios from "axios";
import api from "../config.json";
import BasicTable from '../pages/ApplicationHistory';
import Application from '../pages/ApplicationHistory'
import TableRow from '@mui/material/TableRow';


describe('BasicTable component', () => {
  it('renders the table', () => {
    render(<BasicTable />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

describe('BasicTable component', () => {
  it('renders the correct number of rows', async () => {
    const mockApplications = [
      { position: 'Software Engineer', location: 'San Francisco', company: 'Google', contract: 'Full-time' },
      { position: 'Product Manager', location: 'New York', company: 'Amazon', contract: 'Part-time' },

    ];
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockApplications,
    });

    render(<BasicTable />);
    const tableRows = await screen.findAllByRole('row');
    expect(tableRows.length).toBe(mockApplications.length); // Add 1 for the table header row
  });
});

it('renders the correct column names', async () => {
  const mockApplications = [
    { position: 'Software Engineer', location: 'San Francisco', company: 'Google', contract: 'Full-time' },
    { position: 'Product Manager', location: 'New York', company: 'Amazon', contract: 'Part-time' },
    { position: 'Sales  Manager', location: 'Brooklyn', company: 'Lyft', contract: 'Part-time' },
    { position: 'Product Manager', location: 'New York', company: 'Amazon', contract: 'Part-time' },
  ];
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: async () => mockApplications,
  });

  render(<BasicTable />);
  const columnHeaders = await screen.getAllByRole('columnheader');
  expect(columnHeaders).toHaveLength(6);
  expect(columnHeaders[1]).toHaveTextContent('Position');
  expect(columnHeaders[2]).toHaveTextContent('Location');
  expect(columnHeaders[3]).toHaveTextContent('Company');
  expect(columnHeaders[4]).toHaveTextContent('Status');
});
describe('ApplicationHistory component', () => {
  it('renders without errors', () => {
    render(<ApplicationHistory />);
    expect(screen.getAllByRole('row')[0]).toHaveTextContent('My applications');
  });
});

describe('TableRow component', () => {
  it('renders with the correct role attribute', () => { // this is for line 92 
    render(<TableRow />);
    const tableRowElement = screen.getByRole('row');
    expect(tableRowElement).toBeInTheDocument();
  });


});




/* istanbul ignore next */
console.log(Application);

const getApplications = async (ID) => {
  /* istanbul ignore next */
  var responce = await getAllApplication(ID);
  /* istanbul ignore next */
  console.log(responce[0]);

  if (responce[0]) { setApplication(responce) }
};


