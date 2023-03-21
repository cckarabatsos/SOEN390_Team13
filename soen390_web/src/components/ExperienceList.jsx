import React from "react";
import ExperienceItem from "./ExperienceItem";

const ExperienceList = ({ experiences, enable, setIsExperienceUpdated }) => {
  return (
    <div>
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
