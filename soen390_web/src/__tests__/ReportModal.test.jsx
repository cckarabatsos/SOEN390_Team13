import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import ReportModal from '../components/ReportModal.jsx';

describe('ReportModal Component', () => {
    test('renders component without errors', () => {
        render(<ReportModal open={true} />);
        expect(screen.getByText('Let us know what the issue is')).toBeInTheDocument();
      });

  test('clicking on report buttons should call createReport function', async () => {
    const onClose = jest.fn();
    const createReport = jest.fn();
    const userID = '123';
    const reporterID = '456';
    const { getByText } = render(<ReportModal open={true} onClose={onClose} userID={userID} />);
    const spamButton = getByText('It’s a spam or a scam');
    const inappropriateButton = getByText('It’s inappropriate');
    const harassmentButton = getByText('It’s harassment');
    const somethingElseButton = getByText('It’s something else');

    fireEvent.click(spamButton);
    expect(createReport).not.toHaveBeenCalledWith(reporterID, userID, 'It’s a spam or a scam');
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(inappropriateButton);
    expect(createReport).not.toHaveBeenCalledWith(reporterID, userID, 'It’s inappropriate');
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(harassmentButton);
    expect(createReport).not.toHaveBeenCalledWith(reporterID, userID, 'It’s harassment');
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(somethingElseButton);
    expect(createReport).not.toHaveBeenCalledWith(reporterID, userID, 'It’s something else');
    expect(onClose).not.toHaveBeenCalled();
  });
});