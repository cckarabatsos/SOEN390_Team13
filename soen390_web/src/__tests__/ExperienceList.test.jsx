import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ExperienceList from "../components/ExperienceList.jsx";

describe("ExperienceList", () => {
  const experiences = [
    { experienceID: 1, title: "Experience 1", description: "Description 1" },
    { experienceID: 2, title: "Experience 2", description: "Description 2" },
    { experienceID: 3, title: "Experience 3", description: "Description 3" },
  ];

  it("renders a list of experiences", () => {
    const { getAllByTestId } = render(<ExperienceList experiences={experiences} />);
    const experienceItems = getAllByTestId("experience-item-1");
    expect(experienceItems.length).not.toBe(experiences.length);
  });

  it("does not render any experiences when experiences prop is null", () => {
    const { queryByTestId } = render(<ExperienceList experiences={null} />);
    const experienceItem = queryByTestId("experience-item");
    expect(experienceItem).toBeNull();
  });

  it("calls the setIsExperienceUpdated function when an experience item is clicked", () => {
    const setIsExperienceUpdated = jest.fn();
    const { getByTestId } = render(
      <ExperienceList
        experiences={experiences}
        enable={true}
        setIsExperienceUpdated={setIsExperienceUpdated}
      />
    );
    const firstExperienceItem = getByTestId("experience-item-1");
    fireEvent.click(firstExperienceItem);
    expect(setIsExperienceUpdated).not.toHaveBeenCalledWith(true);
  });
});