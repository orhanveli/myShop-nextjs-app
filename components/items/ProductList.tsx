import React, { ReactElement } from 'react';
import { SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react';

import { ShopProduct } from '../../features/products/product.models';
import ProductCard from './ProductCard';

interface Props {
  products: ShopProduct[];
}

function ProductList({ products }: Props): ReactElement {
  if (!products || products.length === 0) {
    return (
      <Alert status="warning">
        <AlertIcon />
        No product has been found!
      </Alert>
    );
  }

  return (
    <>
      <SimpleGrid columns={[2, 4]} spacing="16px">
        {products.map((product) => (
          <ProductCard
            productInfo={product}
            key={`product-list-${product.slug}`}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default ProductList;
