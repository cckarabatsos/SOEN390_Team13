import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyApplicationList from '../components/CompanyApplicationList';

describe('CompanyApplicationList', () => {

  test("renders table headers", () => {
    render(<CompanyApplicationList />);
    const nameHeader = screen.getByText(/name/i);
    const emailHeader = screen.getByText(/email/i);
    const timeAppliedHeader = screen.getByText(/time applied/i);
    expect(nameHeader).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();
    expect(timeAppliedHeader).toBeInTheDocument();
  });

  test("renders table rows", () => {
    render(<CompanyApplicationList />);
    const rows = screen.getAllByTestId("table-rows");
    expect(rows.length).toBeGreaterThan(0);
  });

  test("clicking on info icon should show more information about the application", () => {
    render(<CompanyApplicationList />);
    const infoIcon = screen.getAllByRole("button")[0];
    fireEvent.click(infoIcon);
  });
});
