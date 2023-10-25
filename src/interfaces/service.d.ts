import { DocumentReference } from "firebase/firestore";

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
  faqs: FAQs[];
}

type Rating = {
  overall: number;
  total: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image?: string;
  categoryId: string;
  subCategoryId: string;
  serviceCategoryId: string;
  subServiceCategoryId?: string;
  ownerId: string;
  rating: Rating;
  price: number;
}