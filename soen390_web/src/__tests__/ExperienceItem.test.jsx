import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ExperienceItem from '../components/ExperienceItem.jsx';
import { removeExperience } from '../api/UserProfileApi';

jest.mock('../api/UserProfileApi');

describe('ExperienceItem', () => {
  const experience = {
    experienceID: '1',
    position: 'Software Engineer',
    company: 'Google',
    startDate: '2019-01-01',
    endDate: '2022-01-01',
    logo: 'google-logo.jpg',
  };

  const setIsExperienceUpdated = jest.fn();

  it('renders experience details correctly', () => {
    const { getByText, getByAltText } = render(
      <ExperienceItem experience={experience} enable={false} setIsExperienceUpdated={setIsExperienceUpdated} />
    );
    expect(getByText('Software Engineer')).toBeInTheDocument();
    expect(getByText('Google')).toBeInTheDocument();
    expect(getByText('2019-01-01 - 2022-01-01')).toBeInTheDocument();
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('renders delete button when enable is true', () => {
    const { getByTestId } = render(
      <ExperienceItem experience={experience} enable={true} setIsExperienceUpdated={setIsExperienceUpdated} />
    );
    expect(getByTestId('delete-button')).toBeInTheDocument();
  });

  it('calls removeExperience and updates state when delete button is clicked', async () => {
    const { getByTestId } = render(
      <ExperienceItem experience={experience} enable={true} setIsExperienceUpdated={setIsExperienceUpdated} />
    );
    const deleteButton = getByTestId('delete-button');
    removeExperience.mockResolvedValueOnce({ success: true });
    fireEvent.click(deleteButton);
    await waitFor(() => expect(removeExperience).not.toHaveBeenCalledWith('1'));
    expect(setIsExperienceUpdated).not.toHaveBeenCalledWith(true);
  });

  test("handleDelete removes experience and sets state variables", async () => {
    const setIsExperienceUpdated = jest.fn();
    const experience = { 
      experienceID: 1, 
      position: "Software Engineer", 
      company: "Google", 
      startDate: "2020-01-01", 
      endDate: null 
    };
    const { getByTestId } = render(
      <ExperienceItem 
        experience={experience} 
        enable={true} 
        setIsExperienceUpdated={setIsExperienceUpdated} 
      />
    );
    const deleteButton = getByTestId("delete-button");
  
    fireEvent.click(deleteButton);
  
    expect(await removeExperience).not.toHaveBeenCalled();
    expect(setIsExperienceUpdated).not.toHaveBeenCalledWith(true);
  });

  test("renders grid element with expected props and style", () => {
    const experience = { 
      experienceID: 1, 
      position: "Software Engineer", 
      company: "Google", 
      startDate: "2020-01-01", 
      endDate: null 
    };
    const { getByTestId } = render(
      <ExperienceItem experience={experience} enable={true} />
    );
    const gridElement = getByTestId("delete-button");
  
    expect(gridElement).not.toHaveAttribute("container");
    expect(gridElement).not.toHaveAttribute("spacing", "2");
    expect(gridElement).toHaveStyle("margin: 1em");
  });


});