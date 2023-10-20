export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  carouselImage?: string;
  image?: string;
  categoryId: string;
  subCategoryId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}