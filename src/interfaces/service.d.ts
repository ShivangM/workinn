import { DocumentReference } from "firebase/firestore";
import { FAQ, FAQInput, SelectOption } from "./typing";

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

export interface ServiceInput {
  name: string;
  description: string;
  images: File[] | string[];
  categoryId: string;
  subCategoryId: string;
  serviceCategoryId: string;
  price: number;
  tags: string[];
  faqs?: FAQInput[];
  sellerWalletAddress?: string;
}

export interface Service extends ServiceInput {
  id: string;
  images: string[];
  ownerId: string;
  rating: Rating;
  isPaused: boolean;
}