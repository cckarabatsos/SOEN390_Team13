import React from "react";
import ExperienceItem from "./ExperienceItem";

const ExperienceList = ({ experiences, enable, setIsExperienceUpdated }) => {
  if (!experiences) {
    experiences = [];
  }
  return (
    <div data-testid="experience-item-1">
      {experiences.map((experience) => (
        <ExperienceItem
          key={experience.experienceID}
          experience={experience}
          enable={enable}
          setIsExperienceUpdated={setIsExperienceUpdated}
        />
      ))}
    </div>
  );
};

export default ExperienceList;
