import { DocumentReference } from 'firebase/firestore';
import { FAQ, FAQInput, ProjectFile, SelectOption } from './typing';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  carouselImage?: string;
  image?: string;
  categoryId: string;
  subCategoryId: string;
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  faqs: FAQ[];
}

type Rating = {
  overall: number;
  total: number;
};

export interface ServiceInput {
  name: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  serviceCategoryId: string;
  images: ProjectFile[];
  price: number;
  tags: string[];
  faqs: FAQInput[];
  sellerWalletAddress: `0x${string}`;
}

export interface Service extends ServiceInput {
  id: string;
  ownerId: string;
  rating: Rating;
  faqs: FAQ[];
  isPaused: boolean;
}
