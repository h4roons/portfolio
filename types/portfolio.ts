export interface SocialLink {
  label: string
  href: string
  handle: string
  icon: 'mail' | 'phone' | 'linkedin' | 'github'
}

export interface SkillCategory {
  name: string
  description: string
  skills: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  start: string
  current: boolean
  domain: string
  contributions: string[]
  stack: string[]
}

export interface ProjectItem {
  name: string
  category: string
  role: string
  description: string
  highlights: string[]
  tags: string[]
  demo?: string
  repo?: string
}

export interface EducationItem {
  institution: string
  degree: string
  period: string
  detail: string
}

export interface LanguageItem {
  name: string
  level: string
}

export interface CertificationItem {
  name: string
  issuer: string
}

export interface VolunteerItem {
  role: string
  organization: string
  location: string
  period: string
  contributions: string[]
}

export interface Profile {
  name: string
  shortName: string
  title: string
  location: string
  email: string
  phones: string[]
  yearsExperience: string
  summary: string
  summaryShort: string
  domains: string[]
  resumeFile: string
  socials: SocialLink[]
}
