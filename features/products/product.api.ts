import { config } from '../../constants';
import { makeCatApiRequest } from '../../utils';
import {
  ProductFilteringOptions,
  ProductListResponse,
  ShopProduct
} from './product.models';

export async function getAllTags() {
  const req = await makeCatApiRequest('/tags', {
    method: 'GET'
  });
  return (await req.json()) as string[];
}

export async function getAllItemTypes() {
  return ['mug', 'shirt'];
}

export async function getProductsList({
  orderBy,
  page,
  limit,
  brands,
  tags,
  itemTypes
}: ProductFilteringOptions): Promise<ProductListResponse> {
  let sort = 'price';
  let order = 'asc';
  let productCountPerPage = limit ?? config.ui.productCountPerPage;
  let pageNumber = page ?? 1;
  if (orderBy) {
    switch (orderBy) {
      case 'price-low-2-high':
        sort = 'price';
        order = 'asc';
        break;
      case 'price-high-2-low':
        sort = 'price';
        order = 'desc';
        break;
      case 'new-2-old':
        sort = 'added';
        order = 'desc';
        break;
      case 'old-2-new':
        sort = 'added';
        order = 'asc';
        break;
    }
  }
  const params: any = {
    _page: pageNumber,
    _limit: productCountPerPage,
    _sort: sort,
    _order: order
  };
  if (tags && tags.length > 0) {
    params.tags = tags.join(',');
  }
  if (brands && brands.length > 0) {
    params.manufacturer = brands;
  }
  if (itemTypes && itemTypes.length > 0) {
    params.itemType = itemTypes;
  }
  const req = await makeCatApiRequest('/items', {
    method: 'GET',
    params
  });
  const products = (await req.json()) as ShopProduct[];
  const total = Number(req.headers.get('X-Total-Count'));
  return {
    products,
    total
  };
}
