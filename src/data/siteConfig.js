/**
 * SITE CONFIGURATION
 * -------------------------------------------------------------
 * Everything personal / editable lives here so components never
 * need to change when the content does.
 */

export const siteConfig = {
  name: 'Sthir Pokhrel',
  shortName: 'SP',
  role: 'Graphic & UI/UX Designer',
  roles: ['Graphic Designer', 'UI/UX Designer', 'Visual Designer'],
  location: 'Kathmandu, Nepal',
  coordinates: '27.7172° N, 85.3240° E',
  timeZone: 'Asia/Kathmandu',
  yearsOfExperience: '3+',

  email: 'sthir1997@gmail.com',
  phone: '+977 9849748181',

  /** Social links. Set a value to `null` to hide the link everywhere. */
  links: {
    behance: 'https://www.behance.net/sthirpokhrel',
    linkedin: 'https://www.linkedin.com/in/sthir-pokhrel-ba04a2230/',
    instagram: null,
    dribbble: null,
  },

  /**
   * Availability label shown in the hero. This is manually configured —
   * nothing on the site "detects" availability automatically.
   * status: 'open' | 'limited' | 'closed'
   */
  availability: {
    status: 'open',
    label: 'Open to new projects',
    note: 'Freelance & full-time',
  },

  hero: {
    headline: ['DESIGN', 'THAT', 'MAKES', 'YOU FEEL.'],
    intro:
      "I'm Sthir Pokhrel — a Graphic & UI/UX Designer crafting meaningful visual identities and intuitive digital experiences.",
    verticalLabel: 'VISUAL DESIGN / DIGITAL EXPERIENCES',
    primaryCta: { label: 'Explore Selected Work', href: '#work' },
    secondaryCta: { label: "Let's Talk", href: '#contact' },
  },

  summary:
    'A designer with 3 years of experience creating intuitive, user-centered web and mobile interfaces. Skilled in Figma, user research, wireframing, prototyping, and graphic design. Experienced in collaborating with developers and stakeholders to create clean, functional designs that enhance user experience and support business goals.',

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Process', href: '/#process' },
    { label: 'Contact', href: '/#contact' },
  ],

  experience: [
    {
      period: 'Jul 2025 — Present',
      years: '2025 — Present',
      role: 'Visual Designer',
      company: 'Marigold Fine Indian Cuisine',
      type: 'Remote',
      points: [
        'Design user-focused digital content, promotional visuals, menus, and branded assets.',
        'Apply visual hierarchy, typography, spacing, and visual consistency.',
        'Translate business requirements into engaging visual concepts.',
        'Create designs using Figma, Canva, and Adobe tools.',
      ],
    },
    {
      period: 'Apr 2024 — Jun 2025',
      years: '2024 — 2025',
      role: 'UX Designer',
      company: 'Softechpark Pvt. Ltd.',
      type: 'Kathmandu',
      points: [
        'Collaborated with engineers and project managers to transform complex workflows into user-friendly interfaces.',
        'Contributed to an e-commerce application from initial concept through interactive prototyping.',
      ],
    },
    {
      period: 'Aug 2023 — Feb 2024',
      years: '2023 — 2024',
      role: 'Frontend Development Intern',
      company: 'Aegis Software Pvt. Ltd.',
      type: 'Kathmandu',
      points: [
        'Assisted in developing responsive web applications using HTML, CSS, JavaScript, and Bootstrap.',
        'Translated UI/UX designs into responsive web pages.',
        'Collaborated with designers and developers to improve user experiences.',
      ],
    },
  ],

  education: {
    degree: 'Bachelor of Computer Science and Information Technology',
    school: 'Ambition College (TU)',
    year: '2023',
  },

  skillGroups: [
    {
      id: 'visual',
      label: 'Visual Design',
      index: '01',
      blurb: 'Identity, print and campaign work where typography and composition carry the message.',
      items: ['Graphic design', 'Branding', 'Typography', 'Color theory', 'Marketing collateral', 'Basic motion graphics'],
    },
    {
      id: 'uiux',
      label: 'UI/UX Design',
      index: '02',
      blurb: 'From research to interactive prototype — making complex workflows feel obvious.',
      items: [
        'User research',
        'Wireframing',
        'Prototyping',
        'User flows',
        'Information architecture',
        'Responsive design',
        'Interaction design',
        'Design systems',
        'Design thinking',
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      index: '03',
      blurb: 'The daily toolkit.',
      items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD', 'Canva'],
    },
    {
      id: 'technical',
      label: 'Technical Understanding',
      index: '04',
      blurb: 'Enough frontend fluency to design what can actually be built — and to talk to the people building it.',
      items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Frontend implementation experience'],
    },
    {
      id: 'ai',
      label: 'AI-Assisted Design',
      index: '05',
      blurb: 'Using models as research partners and ideation engines, with human judgement on top.',
      items: ['LLM-assisted research', 'AI-driven design', 'Generative design', 'Human-AI collaboration'],
    },
  ],

  softSkills: [
    'Leadership',
    'Design mentorship',
    'Collaboration',
    'Project management',
    'Problem-solving',
    'Analytical thinking',
    'Innovation',
    'Ideation',
    'Ownership',
  ],

  process: [
    {
      index: '01',
      title: 'Discover',
      summary: 'Understand user needs, research context, and define the problem.',
      detail:
        'Stakeholder conversations, competitor and context scans, and lightweight user research. The output is a sharply worded problem statement and a short list of what success would look like.',
      artifacts: ['Interviews', 'Audit', 'Problem statement', 'Success criteria'],
    },
    {
      index: '02',
      title: 'Explore',
      summary: 'Develop concepts, sketches, user flows, wireframes, and visual directions.',
      detail:
        'Divergent thinking first: quick sketches, multiple user flows, and two or three visual directions that deliberately disagree with each other. Then converge with the team.',
      artifacts: ['Sketches', 'User flows', 'Wireframes', 'Moodboards'],
    },
    {
      index: '03',
      title: 'Design',
      summary: 'Build cohesive interfaces, visual systems, prototypes, and brand assets.',
      detail:
        'High-fidelity screens built on a small, consistent system: type scale, spacing, colour roles and components. Interactive prototypes make the decisions tangible before any code is written.',
      artifacts: ['Design system', 'Hi-fi UI', 'Prototype', 'Brand assets'],
    },
    {
      index: '04',
      title: 'Refine',
      summary: 'Review usability, test interactions, collaborate, and improve the experience.',
      detail:
        'Usability checks, developer hand-off with clear specs, and a feedback loop that keeps going after launch. Good design is edited, not finished.',
      artifacts: ['Usability review', 'Hand-off', 'QA with devs', 'Iteration'],
    },
  ],

  contactSection: {
    headline: ['GOT A GOOD', "IDEA? LET'S", 'MAKE IT REAL.'],
    supporting:
      "Have a project in mind, need a fresh visual direction, or want to collaborate on a digital experience? I'd love to hear about it.",
  },
};

export default siteConfig;
