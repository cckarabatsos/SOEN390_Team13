import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Admin from '../pages/Admin';
import { getReports, reportDecision, createReport } from "../api/reportsApi";

jest.mock("../api/reportsApi");

describe("Admin Component", () => {
    const userData = { userID: 1 };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("renders admin page", async () => {
        getReports.mockResolvedValueOnce([]);
        render(<Admin userData={userData} />);

        await waitFor(() => expect(getReports).toHaveBeenCalledTimes(1));
        expect(screen.getByText("Approval")).toBeInTheDocument();
    });

    describe('Approval component', () => {
        const mockUserData = { userID: '123' };
        const mockReports = [
            {
                reportID: '1',
                reporterID: '456',
                reportedID: '789',
                reason: 'Inappropriate content',
            },
            {
                reportID: '2',
                reporterID: '456',
                reportedID: '789',
                reason: 'Harassment',
            },
        ];

        test('renders the Approval component', () => {
            render(<Approval userData={mockUserData} />);
            const headingElement = screen.getByText('Approval');
            expect(headingElement).toBeInTheDocument();
        });

        test('renders the reports table', () => {
            render(<Approval userData={mockUserData} />);
            const tableElement = screen.getByRole('table');
            expect(tableElement).toBeInTheDocument();
        });

        test('renders the correct number of rows in the table', () => {
            render(<Approval userData={mockUserData} />);
            const rows = screen.getAllByRole('row');
            expect(rows.length).toBe(mockReports.length + 1); // +1 for the header row
        });

        test('calls handleApprove when approve button is clicked', () => {
            const mockHandleApprove = jest.fn();
            render(<Approval userData={mockUserData} reports={mockReports} handleApprove={mockHandleApprove} />);
            const approveButton = screen.getAllByText('Approve')[0];
            fireEvent.click(approveButton);
            expect(mockHandleApprove).toHaveBeenCalledTimes(1);
        });

        test('calls handleDisapprove when disapprove button is clicked', () => {
            const mockHandleDisapprove = jest.fn();
            render(<Approval userData={mockUserData} reports={mockReports} handleDisapprove={mockHandleDisapprove} />);
            const disapproveButton = screen.getAllByText('Disapprove')[0];
            fireEvent.click(disapproveButton);
            expect(mockHandleDisapprove).toHaveBeenCalledTimes(1);
        });
    });



});
