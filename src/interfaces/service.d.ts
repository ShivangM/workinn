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
  serviceCategories: ServiceCategory[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  subCategories: SubCategory[];
  faqs: FAQs[];
}