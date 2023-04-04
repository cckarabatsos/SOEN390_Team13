import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobapplicationComponent from '../components/JobApplicationComponent.js'
import { MemoryRouter as Router } from 'react-router-dom';


describe('MyForm', () => {
    it('submits the form with valid inputs', () => {
      render(<Router><JobapplicationComponent /></Router>);
      const firstNameInput = screen.getAllByText(/firstname/i);
      const lastNameInput = screen.getAllByText(/lastname/i);
      const addressInput = screen.getAllByText(/address/i);
      const cityInput = screen.getAllByText(/city/i);
      const provinceInput = screen.getAllByText(/province/i);
      const areaCodeInput = screen.getAllByText(/area/i);
      const phoneInput = screen.getAllByText(/phone/i);
      const schoolInput = screen.getAllByText(/school/i);
      const schooldegreeInput = screen.getAllByText(/schooldegree/i);
      const degreeStatusInput = screen.getAllByText(/schoolend/i);
      const majorInput = screen.getAllByText(/schoolmajor/i);
      const submitButton = screen.getByRole('button', { name: /submit/i });
  
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      fireEvent.change(cityInput, { target: { value: 'Anytown' } });
      fireEvent.change(provinceInput, { target: { value: 'CA' } });
      fireEvent.change(areaCodeInput, { target: { value: '12345' } });
      fireEvent.change(phoneInput, { target: { value: '555-555-5555' } });
      fireEvent.change(schoolInput, { target: { value: 'University of Anywhere' } });
      fireEvent.change(schooldegreeInput, { target: { value: 'Bachelor of Science' } });
      fireEvent.change(degreeStatusInput, { target: { value: 'Graduated' } });
      fireEvent.change(majorInput, { target: { value: 'Computer Science' } });
      fireEvent.click(submitButton);
  
      // Expect that the form inputs are populated with the correct values after the form submission
      expect(firstNameInput).toBeInTheDocument();
      expect(lastNameInput).toHaveValue('Doe');
      expect(addressInput).toHaveValue('123 Main St');
      expect(cityInput).toHaveValue('Anytown');
      expect(provinceInput).toHaveValue('CA');
      expect(areaCodeInput).toHaveValue('12345');
      expect(phoneInput).toHaveValue('555-555-5555');
      expect(schoolInput).toHaveValue('University of Anywhere');
      expect(schooldegreeInput).toHaveValue('Bachelor of Science');
      expect(degreeStatusInput).toHaveValue('Graduated');
      expect(majorInput).toHaveValue('Computer Science');
  
      // Expect that the submit button was clicked
      expect(submitButton).toBeDisabled();
  
      // Expect that the form submission was successful
      expect(screen.getByText('')).toBeInTheDocument();
      
      // Expect that no validation errors are displayed
      expect(screen.queryByText('Cannot be empty!')).not.toBeInTheDocument();
    });
  });