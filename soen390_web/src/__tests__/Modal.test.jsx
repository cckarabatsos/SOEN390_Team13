// import dependencies
import React from 'react';
// import react-testing methods
import { render, fireEvent } from '@testing-library/react';

import Modal from '../components/Modal';

describe('Modal component', () => {
    
    //tests that the modal is rendered with the proper 
    //corresponding text and tests if modal closes when clicking cancel
    test('renders the modal with the correct text and closes', () => {
        const setOpenModal = jest.fn();
        const viewDesc = 'Description';
        const viewPosition = 'Position';
        const viewLocation = 'Location';
        const viewSalary = 'Salary';
        const viewContract = 'Contract';
        const viewEmail = 'Email';
        const viewCompany = 'Company';
        
        const { getByText } = render(
        <Modal
        setOpenModal={setOpenModal}
        viewDesc={viewDesc}
        viewPosition={viewPosition}
        viewLocation={viewLocation}
        viewSalary={viewSalary}
        viewContract={viewContract}
        viewEmail={viewEmail}
        viewCompany={viewCompany}
        />
    );
    
    expect(getByText(viewPosition)).toBeInTheDocument();
    expect(getByText(viewCompany)).toBeInTheDocument();
    expect(getByText(viewLocation)).toBeInTheDocument();
    expect(getByText(viewContract)).toBeInTheDocument();
    expect(getByText(viewSalary)).toBeInTheDocument();
    expect(getByText(viewDesc)).toBeInTheDocument();
    expect(getByText(viewEmail)).toBeInTheDocument();

    //tests if clicking on the cancel button closes the modal properly
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(setOpenModal).toHaveBeenCalledWith(false);
  });
});
