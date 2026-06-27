import {
  profile,
  skillCategories,
  experience,
  projects,
  education,
  languages,
  certifications,
  volunteering,
  stats,
} from '~/data/portfolio'

// Single accessor so components never import data directly
export const usePortfolio = () => {
  return {
    profile,
    skillCategories,
    experience,
    projects,
    education,
    languages,
    certifications,
    volunteering,
    stats,
  }
}
