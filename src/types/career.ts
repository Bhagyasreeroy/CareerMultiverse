export type RealityId = string;
export type MilestoneId = string;
export type SkillId = string;

export type SkillCategory = 'technical' | 'soft' | 'domain' | 'certification';
export type MilestoneType = 'education' | 'project' | 'internship' | 'certification' | 'job';
export type MilestoneStatus = 'planned' | 'in-progress' | 'completed';

export interface Skill {
  id: SkillId;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  targetProficiency?: number; // What is required for a specific goal
}

export interface Milestone {
  id: MilestoneId;
  title: string;
  description: string;
  type: MilestoneType;
  status: MilestoneStatus;
  startDate?: string; // ISO Date
  endDate?: string; // ISO Date
  skillsGained: Skill[];
  requirements: Skill[]; // Skills needed to start this milestone
}

export interface ResumeItem {
  id: string;
  title: string;          // Role / Degree
  subtitle: string;       // Company / University
  dateRange: string;
  description: string;    // Bullet points / description
  location?: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  type: 'experience' | 'education' | 'project' | 'custom';
  items: ResumeItem[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    location: string;
    links: { label: string; url: string }[];
  };
  sections: ResumeSection[];
}

export interface ResultMetrics {
  weeklyHours: number;
  projectedMonths: number;
  employabilityScore: number;
  salaryRange: [number, number];
}

export interface RealityAttributes {
  learningStyle: 'Theory' | 'Practical' | 'Mixed';
  interviewFocus: ('DSA' | 'System Design' | 'Behavioral' | 'Portfolio' | 'Take-home')[];
  companyType: ('Product' | 'Service' | 'Startup' | 'Research' | 'Freelance')[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'project' | 'article' | 'video';
  url?: string;
  status: 'todo' | 'in-progress' | 'completed';
  estimatedTime?: string; // e.g. "4 weeks", "10 hours"
  skillsTargeted: string[]; // Skill IDs
}

export interface RealitySnapshot {
  id: string;
  timestamp: string; // ISO
  description: string; // "Added skill: Python"
  state: CareerReality; // Complete snapshot for simple rollback
}

export interface CareerReality {
  id: RealityId;
  parentId: RealityId | null; // null for the "Prime" reality
  name: string;
  description: string;
  createdAt: string; // ISO Date
  lastModifiedAt: string; // ISO Date

  // Core data for this reality
  milestones: Milestone[];
  targetRoles: string[]; // e.g., ["Data Scientist", "ML Engineer"]
  learningResources: string[]; // e.g., ["React Docs", "Andrew Ng ML Coursera"] (Legacy simple list)
  roadmap: LearningResource[]; // NEW: Smart structured roadmap
  skills: Skill[]; // Current inventory in this reality

  // Advanced Metrics
  metrics: ResultMetrics;
  attributes: RealityAttributes;

  // Resume specific data
  resumeData: ResumeData;

  // Undo/Redo/Comparison History
  history: RealitySnapshot[];
}


export interface GpaRecord {
  term: string; // e.g. "Fall 2023"
  gpa: number;  // e.g. 3.8
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  passwordHash?: string; // For mock auth
  year: string; // e.g. "Sophomore"
  gpaHistory: GpaRecord[];

  realities: CareerReality[];
  activeRealityId: RealityId;
}
