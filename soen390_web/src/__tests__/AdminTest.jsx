import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Admin from '../pages/Admin';
import { getReports, reportDecision, createReport } from "../api/reportsApi";
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material";
import Button from "@mui/material";
import { Table } from '@mui/material';
import axios from "axios";


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
    test("displays table when there are reports", async () => {
        const reports = [{ reportID: 1, reporterID: 2, reportedID: 3, reason: "spam" }];
        getReports.mockResolvedValueOnce(reports);
        render(<Admin userData={userData} />);

        await waitFor(() => expect(getReports).toHaveBeenCalledTimes(1));
        expect(screen.getByText("ReportID")).toBeInTheDocument();
        expect(screen.getByText("Reporter ID")).toBeInTheDocument();
        expect(screen.getByText("Reported ID")).toBeInTheDocument();
        expect(screen.getByText("Reason")).toBeInTheDocument();
    });
    test("displays error alert when there is an error", async () => {
        getReports.mockRejectedValueOnce(new Error("Error fetching reports"));
        render(<Admin userData={userData} />);

        await waitFor(() => expect(getReports).toHaveBeenCalledTimes(1));
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("Error fetching reports")).toBeInTheDocument();
    });

    test("render buttons with appropriate functions", () => {
        const report = {
            reportID: 1,
            reporterID: 2,
            reportedID: 3,
            reason: "Inappropriate content",
        };
        const handleApprove = jest.fn();
        const handleDisapprove = jest.fn();

        render(
            <TableRow key={report.reportID}>
                <TableCell component="th" scope="row">
                    {report.reportID}
                </TableCell>
                <TableCell>{report.reporterID}</TableCell>
                <TableCell>{report.reportedID}</TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(report.reportID, report.reportedID)}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDisapprove(report.reportID, report.reportedID)}
                    >
                        Disapprove
                    </Button>
                </TableCell>
            </TableRow>
        );

        const approveButton = screen.getByText("Approve");
        const disapproveButton = screen.getByText("Disapprove");

        fireEvent.click(approveButton);
        fireEvent.click(disapproveButton);

        expect(handleApprove).toHaveBeenCalledWith(report.reportID, report.reportedID);
        expect(handleDisapprove).toHaveBeenCalledWith(report.reportID, report.reportedID);
    });



});
