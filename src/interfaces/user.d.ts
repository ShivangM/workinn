import { Timestamp } from 'firebase/firestore';

export enum UserModes {
  BUYER = 'buyer',
  SELLER = 'seller',
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

type Country = {
  label: string;
  value: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  level: LanguageLevels;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevels;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Education {
  id: string;
  country: Country;
  school: string;
  title: DegreeTitle;
  major: string;
  yearOfGraduation: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: number;
}

export interface BasicDetails {
  displayName: string;
  title: string;
  photoURL?: string;
  country?: Country;
  description?: string;
  updatedAt: Timestamp;
}

export interface UserData extends BasicDetails {
  uid: string;
  email: string;
  creationTime: string;
}
