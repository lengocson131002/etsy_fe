export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  regularPrice: number;
  discoundPrice: number;
  code: string;
  unit: string;
  shopId: number;
  shortDescription: string
  description: string;
  categoryId: number;
  categoryName: string;
  subCategoryId?: number;
  subCategoryName?: string;
  brand: string;
  inventoryQuantity: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}
