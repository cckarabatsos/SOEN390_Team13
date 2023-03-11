import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BasicTable from "./BasicTable";
import ApplicationHistory from '../pages/ApplicationHistory'

describe("BasicTable", () => {
  it("renders the table header with the correct title", () => {
    render(<BasicTable />);
    const header = screen.getByRole("cell", { name: "My applications" });
    expect(header).toBeInTheDocument();
  });

  it("renders the table with the correct columns", () => {
    render(<BasicTable />);
    const positionColumn = screen.getByRole("columnheader", { name: "Position" });
    expect(positionColumn).toBeInTheDocument();
    const locationColumn = screen.getByRole("columnheader", { name: "Location" });
    expect(locationColumn).toBeInTheDocument();
    const companyColumn = screen.getByRole("columnheader", { name: "Company" });
    expect(companyColumn).toBeInTheDocument();
    const contractColumn = screen.getByRole("columnheader", { name: "Contract" });
    expect(contractColumn).toBeInTheDocument();
    const actionColumn = screen.getByRole("columnheader", { name: "Action" });
    expect(actionColumn).toBeInTheDocument();
  });

  it("renders the table with the correct data", () => {
    render(<BasicTable />);
    const positionCell = screen.getByRole("cell", { name: "Software Engineer" });
    expect(positionCell).toBeInTheDocument();
    const locationCell = screen.getByRole("cell", { name: "Montreal" });
    expect(locationCell).toBeInTheDocument();
    const companyCell = screen.getByRole("cell", { name: "6" });
    expect(companyCell).toBeInTheDocument();
    const contractCell = screen.getByRole("cell", { name: "24" });
    expect(contractCell).toBeInTheDocument();
    const actionCell = screen.getByRole("cell", { name: "View" });
    expect(actionCell).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    render(<BasicTable />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);
  });

  it("calls the action button callback when clicked", () => {
    const mockCallback = jest.fn();
    render(<BasicTable actionButtonCallback={mockCallback} />);
    const actionButton = screen.getByRole("button", { name: "View" });
    userEvent.click(actionButton);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
