export interface ShopProduct {
  tags: string[];
  price: number;
  name: string;
  description: string;
  slug: string;
  added: number;
  manufacturer: string;
  itemType: string;
}

export interface ProductFilteringOptions {
  tags?: string[];
  brands?: string[];
  itemTypes?: string[];
  orderBy: string;
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: ShopProduct[];
  total: number;
}
