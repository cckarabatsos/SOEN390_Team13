import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MyForm from './MyForm';



describe('MyForm', () => {
    it('submits the form with valid inputs', () => {
      render(<MyForm />);
      const firstNameInput = screen.getByLabelText('First Name*');
      const lastNameInput = screen.getByLabelText('Last Name*');
      const addressInput = screen.getByLabelText('Address*');
      const cityInput = screen.getByLabelText('City*');
      const provinceInput = screen.getByLabelText('Province*');
      const areaCodeInput = screen.getByLabelText('Area Code*');
      const phoneInput = screen.getByLabelText('Phone Number*');
      const schoolInput = screen.getByLabelText('School Name*');
      const degreeInput = screen.getByLabelText('Degree*');
      const degreeStatusInput = screen.getByLabelText('Degree Status*');
      const majorInput = screen.getByLabelText('Major*');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
  
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(addressInput, { target: { value: '123 Main St' } });
      fireEvent.change(cityInput, { target: { value: 'Anytown' } });
      fireEvent.change(provinceInput, { target: { value: 'CA' } });
      fireEvent.change(areaCodeInput, { target: { value: '12345' } });
      fireEvent.change(phoneInput, { target: { value: '555-555-5555' } });
      fireEvent.change(schoolInput, { target: { value: 'University of Anywhere' } });
      fireEvent.change(degreeInput, { target: { value: 'Bachelor of Science' } });
      fireEvent.change(degreeStatusInput, { target: { value: 'Graduated' } });
      fireEvent.change(majorInput, { target: { value: 'Computer Science' } });
      fireEvent.click(submitButton);
  
      // Expect that the form inputs are populated with the correct values after the form submission
      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(addressInput).toHaveValue('123 Main St');
      expect(cityInput).toHaveValue('Anytown');
      expect(provinceInput).toHaveValue('CA');
      expect(areaCodeInput).toHaveValue('12345');
      expect(phoneInput).toHaveValue('555-555-5555');
      expect(schoolInput).toHaveValue('University of Anywhere');
      expect(degreeInput).toHaveValue('Bachelor of Science');
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