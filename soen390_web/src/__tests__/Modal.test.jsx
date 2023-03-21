// import dependencies
import React from 'react';
// import react-testing methods
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

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
        const viewMandatoryCoverLetter = Boolean;
        const viewMandatoryResume = Boolean;
        
        const { getByText } = render(
          <BrowserRouter>
          <Modal
              setOpenModal={setOpenModal}
              viewDesc={viewDesc}
              viewPosition={viewPosition}
              viewLocation={viewLocation}
              viewSalary={viewSalary}
              viewContract={viewContract}
              viewEmail={viewEmail}
              viewCompany={viewCompany}
              viewMandatoryCoverLetter={viewMandatoryCoverLetter}
              viewMandatoryResume={viewMandatoryResume}
          />
      </BrowserRouter>
      );
    
    // expect(getByText(viewPosition)).toBeInTheDocument();
    expect(getByText(viewCompany)).toBeInTheDocument();
    // expect(getByText(viewLocation)).toBeInTheDocument();
    expect(getByText(viewContract)).toBeInTheDocument();
    // expect(getByText(viewSalary)).toBeInTheDocument();
    expect(getByText(viewDesc)).toBeInTheDocument();
    // expect(getByText(viewEmail)).toBeInTheDocument();

    //tests if clicking on the cancel button closes the modal properly
    const cancelButton = getByText('CancelText');
    fireEvent.click(cancelButton);
    expect(setOpenModal).toHaveBeenCalledWith(false);
  });

  //test added to check if when clicking "x" button, the modal closes
  test('closes modal when "X" button is clicked', () => {
    const setOpenModal = jest.fn();
    const { getByText } = render(
        <BrowserRouter>
            <Modal 
                setOpenModal={setOpenModal} 
                viewPosition="Position" 
                viewCompany="Company"
            />
        </BrowserRouter>
    );
    const xButton = getByText('X');
    fireEvent.click(xButton);
    expect(setOpenModal).toHaveBeenCalledWith(false);
});

  //checks if when clicking apply button, it will navigate to
  //the JobApplication route
  test('clicking apply button navigates to JobApplication route', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Modal />
        </BrowserRouter>
    );
    const applyButton = getByText('ApplyText');
    fireEvent.click(applyButton);
    expect(window.location.pathname).toEqual('/JobApplication');
});
});
