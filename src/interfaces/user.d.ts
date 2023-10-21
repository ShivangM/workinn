export enum UserModes {
  BUYER = 'Buyer',
  SELLER = 'Seller',
}

enum LanguageLevels {
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  NATIVE = 'Native',
}

enum SkillLevels {
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

enum DegreeTitle {
  ASSOCIATE = 'Associate',
  CERTIFICATE = 'Certificate',
  BA = 'Bachelor of Arts',
  BArch = 'Bachelor of Architecture',
  BM = 'Bachelor of Music',
  BFA = 'Bachelor of Fine Arts',
  BSc = 'Bachelor of Science',
  MA = 'Master of Arts',
  MBA = 'Master of Business Administration',
  MSc = 'Master of Science',
  MFA = 'Master of Fine Arts',
  JD = 'Juris Doctor',
  MD = 'Doctor of Medicine',
  PhD = 'Doctor of Philosophy',
  LLB = 'Bachelor of Laws',
  LLM = 'Master of Laws',
  OTHER = 'Other',
}

interface Language {
  language: string;
  level: LanguageLevels;
}

interface Skill {
  skill: string;
  level: SkillLevels;
}

interface Education {
  country: string;
  school: string;
  title: DegreeTitle;
  major: string;
  yearOfGraduation: number;
}

interface Certification {
  name: string;
  organization: string;
  year: number;
}

export interface UserData {
  uid: string;
  name: string[];
  email: string;
  image?: string;
  country?: string;
  memberSince: string;
  description?: string;
  languages?: Language[];
  skills?: Skill[];
  education?: Education[];
  certifications?: Certification[];
}
