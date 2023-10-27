import { DocumentReference } from "firebase/firestore";
import { FAQ, SelectOption } from "./typing";

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
}

export interface Service {
  id: string;
  name: string;
  description: string;
  images: string[];
  categoryId: string;
  subCategoryId: string;
  serviceCategoryId: string;
  ownerId: string;
  rating: Rating;
  price: number;
  isPaused: boolean;
  faqs: FAQ[];
  tags: string[];
  category?: Category;
  subCategory?: SubCategory;
  serviceCategory?: ServiceCategory;
  sellerWalletAddress?: string;
}