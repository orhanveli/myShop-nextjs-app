import { ShopProduct } from '../products/product.models';

export interface CartProductItem
  extends Pick<ShopProduct, 'slug' | 'name' | 'price'> {
  count: number;
}
