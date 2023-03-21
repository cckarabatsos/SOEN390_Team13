import React from "react";
import ExperienceItem from "./ExperienceItem";

const ExperienceList = ({ experiences }) => {
  if (!experiences) {
    experiences = [];
  }
  return (
    <div>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.experienceID} experience={experience} />
      ))}
    </div>
  );
};

export default ExperienceList;
