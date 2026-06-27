import type {
  Profile,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  LanguageItem,
  CertificationItem,
  VolunteerItem,
} from '~/types/portfolio'

export const profile: Profile = {
  name: 'Muhammad Haroon Sohail',
  shortName: 'Haroon Sohail',
  title: 'Software Engineer',
  location: 'Lahore, Pakistan',
  email: 'haroonsohail323@gmail.com',
  phones: ['+92 311 779 1624'],
  yearsExperience: '4+',
  summary:
    'Software Engineer with a strong foundation in Nuxt 3, Vue 3, React, and React Native, focused on building scalable, high-impact web applications. At Manafa I work on core parts of a fast-growing Saudi fintech platform — building borrower and investor portals, advanced form and document-upload systems, and reusable components backed by Pinia. I bring a product mindset, clean code, and cross-functional collaboration to every project, plus AI-driven side projects and Unity games when I am not shipping product.',
  summaryShort:
    'I build scalable, high-impact web apps with Nuxt, Vue & React — bringing a product mindset to a fast-growing fintech platform at Manafa.',
  domains: ['FinTech', 'AI & Automation', 'SaaS', 'Gaming', 'Product'],
  resumeFile: '/Muhammad_Haroon_Sohail_Resume.pdf',
  socials: [
    {
      label: 'Email',
      href: 'mailto:haroonsohail323@gmail.com',
      handle: 'haroonsohail323@gmail.com',
      icon: 'mail',
    },
    {
      label: 'Phone',
      href: 'tel:+923117791624',
      handle: '+92 311 779 1624',
      icon: 'phone',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/h4roons/',
      handle: 'in/h4roons',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/h4roons',
      handle: 'github.com/h4roons',
      icon: 'github',
    },
  ],
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    description: 'The interfaces people actually touch',
    skills: [
      'Nuxt 3 / Nuxt 4',
      'Vue 3',
      'React.js',
      'React Native',
      'Pinia',
      'JavaScript (ES6+)',
      'TypeScript',
      'Component Architecture',
    ],
  },
  {
    name: 'AI & Backend',
    description: 'APIs, agentic workflows & services',
    skills: [
      'Python',
      'FastAPI',
      'FastMCP',
      'Node.js',
      'API Development',
      'Google Gemini',
      'Claude / ChatGPT',
      'REST APIs',
    ],
  },
  {
    name: 'Languages & Game Dev',
    description: 'Beyond the web stack',
    skills: ['JavaScript / TypeScript', 'Python', 'Java', 'C#', 'Unity'],
  },
  {
    name: 'Data & Analytics',
    description: 'Letting the numbers decide',
    skills: [
      'SQL (CTEs · Joins · Window Functions)',
      'A/B Testing',
      'Mixpanel',
      'Metabase',
      'KPI / CPI Tracking',
    ],
  },
  {
    name: 'Product & Delivery',
    description: 'From requirement to release',
    skills: [
      'PRD / BRD Writing',
      'Agile / Scrum',
      'Jira',
      'Notion',
      'ClickUp',
      'Kanban',
    ],
  },
  {
    name: 'Tooling & Infra',
    description: 'How the work ships',
    skills: ['Git', 'GitHub', 'Docker', 'MongoDB'],
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Associate Software Engineer',
    company: 'Manafa',
    location: 'Riyadh, SA · Remote',
    period: 'Nov 2024 — Present',
    start: '2024',
    current: true,
    domain: 'FinTech',
    contributions: [
      'Develop and maintain complex Nuxt 3 / Vue 3 interfaces powering the borrower and investor portals of a fast-growing Saudi SME-financing platform.',
      'Built advanced form systems, file/document upload flows, and conditional UI that significantly improved onboarding and document handling.',
      'Refactored key modules for reusability and cleaner state management with Pinia, reducing bugs and speeding up development across teams.',
      'Delivered 10+ scalable features supporting faster platform growth, partnering with product, design, and QA to align execution with business goals.',
    ],
    stack: ['Nuxt 3', 'Vue 3', 'Pinia', 'JavaScript', 'REST APIs'],
  },
  {
    role: 'Project Manager',
    company: 'Optima AI',
    location: 'London, UK · Remote',
    period: 'Nov 2025 — Jan 2026',
    start: '2025',
    current: false,
    domain: 'AI / Product',
    contributions: [
      'Used AI tools to automate requirements gathering and documentation, cutting PRD/BRD creation time by 40% across 9+ active projects.',
      'Mentored a junior PM on AI-assisted task prioritization and automated tracking, raising team efficiency by 25%.',
      'Produced 10+ business and delivery pitch decks with AI-powered design tools, achieving 50% faster turnaround.',
      'Architected end-to-end project-tracking systems with Kanban boards, sprint planning, and retrospective workflows.',
    ],
    stack: ['Notion', 'ClickUp', 'Agile', 'AI Tooling'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Arbisoft',
    location: 'Lahore, PK · Hybrid',
    period: 'Jun 2024 — Aug 2024',
    start: '2024',
    current: false,
    domain: 'Mobile / SaaS',
    contributions: [
      'Focused on mobile app development with React Native, TypeScript, and Git through real-world async workflows.',
      'Implemented state management, asynchronous programming, and navigation with scalable component design.',
      'Diagnosed and resolved bugs with thorough testing, improving overall code quality.',
    ],
    stack: ['React Native', 'TypeScript', 'Redux', 'Git'],
  },
  {
    role: 'Game Programmer',
    company: 'Mindstorm Studios',
    location: 'Lahore, PK',
    period: 'Jul 2022 — Oct 2022',
    start: '2022',
    current: false,
    domain: 'Gaming',
    contributions: [
      'Built and debugged hyper-casual game mechanics, collaborating across teams to improve gameplay and stability.',
      'Learned Unity, game design, and Blender through the studio program.',
      'Created the game "Mot ka Kuan" during the closing game jam on the theme "Nostalgia".',
    ],
    stack: ['Unity', 'C#', 'Blender', 'Game Design'],
  },
  {
    role: '.NET Developer',
    company: 'Punjab Information Technology Board (PITB)',
    location: 'Lahore, PK',
    period: 'Sep 2022 — Nov 2022',
    start: '2022',
    current: false,
    domain: 'GovTech',
    contributions: [
      'Developed and maintained .NET applications for a government technology board.',
    ],
    stack: ['.NET', 'C#'],
  },
  {
    role: 'Co-Founder',
    company: 'MindHackers',
    location: 'Lahore, PK',
    period: 'Jun 2022 — Jul 2024',
    start: '2022',
    current: false,
    domain: 'Agency / Product',
    contributions: [
      'Co-founded an agency during university to manage and deliver industrial tech projects end to end.',
      'Maintained tracking systems for project data, KPIs, and resource allocation to ensure on-time delivery.',
      'Translated client needs into clear requirements for outsourced developers, making daily scope-versus-timeline tradeoffs.',
    ],
    stack: ['Product', 'Delivery', 'KPIs', 'Client Management'],
  },
  {
    role: 'HTML Developer',
    company: 'DigitalMa',
    location: 'Pakistan',
    period: 'Jun 2020 — Jul 2021',
    start: '2020',
    current: false,
    domain: 'Web',
    contributions: [
      'Built responsive, hand-coded HTML/CSS web pages — my first professional development role.',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
  },
]

export const projects: ProjectItem[] = [
  {
    name: 'SmartHR — Leave Management Agent',
    category: 'AI / Agentic Workflow',
    role: 'Engineer',
    description:
      'A conversational, tool-enabled HR leave-management agent built on the Model Context Protocol (MCP). Any compliant model — Claude or GPT-4o — performs real HR actions through structured tool calls, no UI required.',
    highlights: [
      'Handles balances, applications, cancellations, history, and monthly summaries entirely via natural language',
      'Suggestion engine recommends the next available leave date, skipping weekends and public holidays',
    ],
    tags: ['FastMCP', 'Python', 'Claude / GPT-4o'],
    repo: 'https://github.com/h4roons/smartHR',
  },
  {
    name: 'Office Assistant',
    category: 'AI Automation',
    role: 'Engineer',
    description:
      'A production-ready, human-in-the-loop AI assistant that centralizes WhatsApp and Gmail. Google Gemini reads text, images, and PDF invoices, drafts professional replies, and logs approved orders to Google Sheets.',
    highlights: [
      'Multimodal ingestion across WhatsApp and Gmail with SQLite-backed conversation memory',
      'Review-and-approve dashboard — 100% accuracy logging orders, 60% less manual data entry',
    ],
    tags: ['FastAPI', 'Google Gemini', 'Python'],
    repo: 'https://github.com/h4roons/Office-Assistant',
  },
  {
    name: 'Mot ka Kuan',
    category: 'Game · Unity',
    role: 'Product Owner',
    description:
      'Shipped a complete game end to end as product owner, tracking acquisition metrics like Cost Per Install (CPI) and retention to drive real product decisions.',
    highlights: [
      'Shipped a full game from concept to release',
      'Used CPI and retention data to balance new features against performance fixes',
    ],
    tags: ['Unity', 'C#', 'Product'],
    repo: 'https://github.com/h4roons/Mot-ka-Qunwan',
  },
  {
    name: 'MiniCopters',
    category: 'Game · Unity',
    role: 'Game Developer',
    description:
      'A 2D arcade-style game where players pilot miniature helicopters through hazard-filled terrain, dodging obstacles and collecting power-ups to chase high scores.',
    highlights: [
      'Built in Unity with C# and simple, responsive arcade controls',
    ],
    tags: ['Unity', 'C#', '2D Gameplay'],
    repo: 'https://github.com/h4roons/MiniCopters',
  },
]

export const education: EducationItem[] = [
  {
    institution: 'Lahore Garrison University',
    degree: 'BS Software Engineering',
    period: '2020 — 2024',
    detail:
      'Honors: Student of the Year (2023) · PUCon Game Design Jam — 2nd Place · Rookie Game Jam 2022 — Outstanding Environment · Hult Prize 2021 Regional Finalist',
  },
]

export const languages: LanguageItem[] = [
  { name: 'Urdu', level: 'Native / Bilingual' },
  { name: 'English', level: 'Professional Working Proficiency' },
]

export const volunteering: VolunteerItem[] = [
  {
    role: 'Founder, Lead & Mentor',
    organization: 'Google Developer Groups — LGU',
    location: 'Lahore, PK',
    period: 'Aug 2023 — Present',
    contributions: [
      'Founded and led the campus chapter, then continued as Mentor — guiding students on careers and emerging tech.',
      'Led a 20-person team to run 15+ events, workshops, and hackathons across Git, Web, Game Dev, and AI.',
      'Partnered with GitHub, Unity, and Google Play for sponsorship, and hosted Google I/O Extended Cloud Lahore 2024.',
      'Bridged academia and industry with 10+ industrial tours and mock interviews (Arbisoft, Devsinc, Confiz, InvoZone).',
    ],
  },
  {
    role: 'Ambassador',
    organization: 'Confiniti — LGU Chapter',
    location: 'Lahore, PK',
    period: 'Nov 2023 — Jul 2024',
    contributions: [
      'Represented the Confiniti chapter at Lahore Garrison University, driving student engagement and outreach.',
    ],
  },
  {
    role: 'Music Director',
    organization: 'Garrison Urdu Dramatics Club',
    location: 'Lahore Garrison University',
    period: 'Nov 2021 — Nov 2022',
    contributions: [
      'Directed music for two university plays, plus productions at UET and Alhamra Arts Council.',
      'Awarded Best Music Director for the work.',
    ],
  },
  {
    role: 'Prize Distribution Volunteer',
    organization: 'Rookie Game Jam 2022',
    location: 'Lahore, PK',
    period: '2022',
    contributions: [
      'Volunteered at the Rookie Game Jam 2022 prize-distribution ceremony.',
    ],
  },
]

export const certifications: CertificationItem[] = [
  {
    name: 'Complete C# Unity Game Developer 3D',
    issuer: 'Online Course',
  },
  {
    name: 'Intro to Game Development Workshop',
    issuer: 'GMG × Mindstorm Studios',
  },
]

// Quick stats derived from resume
export const stats = [
  { value: '4+', label: 'Years building' },
  { value: '5', label: 'Domains shipped in' },
  { value: '6+', label: 'Projects shipped' },
  { value: '200+', label: 'Community attendees led' },
]
