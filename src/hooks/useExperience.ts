import { useState } from "react";
import { experienceRoles } from "../data/experience";

export function useExperience() {
  const [activeExperienceId, setActiveExperienceId] = useState(experienceRoles[0].id);

  const activeExperience =
    experienceRoles.find((role) => role.id === activeExperienceId) ?? experienceRoles[0];

  return { activeExperience, activeExperienceId, setActiveExperienceId };
}
