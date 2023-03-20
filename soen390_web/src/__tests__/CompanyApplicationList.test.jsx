// import dependencies
import React from 'react';
// import react-testing methods
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyApplicationList from '../components/CompanyApplicationList';

describe('CompanyApplicationList', () => {

  // checks if table headers are rendered
  it("renders table headers", () => {
    render(<CompanyApplicationList />);
    const nameHeader = screen.getByText(/name/i);
    const emailHeader = screen.getByText(/email/i);
    const timeAppliedHeader = screen.getByText(/time applied/i);
    expect(nameHeader).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();
    expect(timeAppliedHeader).toBeInTheDocument();
  });

  // checks if table rows are rendered
  it("renders table rows", () => {
    render(<CompanyApplicationList />);
    const rows = screen.getAllByTestId("table-rows");
    expect(rows.length).toBeGreaterThan(0);
  });

  it("renders rows per page selector", () => {
    render(<CompanyApplicationList />);
    const rowsPerPageSelector = screen.getByTestId("rows-per-page-selector");
    expect(rowsPerPageSelector).toBeInTheDocument();
  });

  // checks if clicking on the info button functions
  it("clicking on info icon should show more information about the application", () => {
    render(<CompanyApplicationList />);
    const infoIcon = screen.getAllByRole("button")[0];
    fireEvent.click(infoIcon);
  });

  // checks if it renders the table row elements
  it("renders the table rows element", () => {
    const { getByTestId } = render(<CompanyApplicationList />);
    const tableRows = getByTestId("table-rows");
    expect(tableRows).toBeInTheDocument();
    expect(tableRows.children.length).toBe(3);
  });
});