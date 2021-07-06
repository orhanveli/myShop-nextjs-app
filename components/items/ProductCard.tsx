import React, { ReactElement, useMemo } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { Box, Flex, Heading, Text, Image, Button } from '@chakra-ui/react';

import { ShopProduct } from '../../features/products/product.models';
import { currencyFormatter } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { addItem, selectCart } from '../../features/cart/cart.slice';

interface Props {
  productInfo: ShopProduct;
}

function ProductCard({ productInfo }: Props): ReactElement {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: any) => {
    e.preventDefault();

    dispatch(
      addItem({
        count: 1,
        name: productInfo.name,
        price: productInfo.price,
        slug: productInfo.slug
      })
    );
  };

  const countInCart = useMemo(() => {
    const isExists = cart.items.find((it) => it.slug === productInfo.slug);
    return isExists ? isExists.count : 0;
  }, [cart.items, productInfo]);

  const renderAddToCartButton = () => {
    if (countInCart > 0) {
      return (
        <Button
          colorScheme="green"
          size="sm"
          w="full"
          rightIcon={<MdShoppingCart />}
          onClick={handleAddToCart}
        >
          ({countInCart}) Add +1
        </Button>
      );
    }
    return (
      <Button
        colorScheme="blue"
        size="sm"
        w="full"
        rightIcon={<MdShoppingCart />}
        onClick={handleAddToCart}
      >
        Add
      </Button>
    );
  };

  return (
    <>
      <Flex direction="column" w="full" marginBlockEnd={4}>
        <Box mb={3}>
          <Image
            alt={productInfo.name}
            roundedTop="lg"
            maxW="100%"
            src={`https://loremflickr.com/400/400/${productInfo.tags.join(
              ','
            )}`}
          />
        </Box>
        <Box mb={3}>
          <Box>
            <Text color="blue.400" fontSize="sm">
              {currencyFormatter.format(productInfo.price)}
            </Text>
          </Box>
          <Heading as="h4" size="sm">
            {[productInfo.name]}
          </Heading>
        </Box>
        <Flex flexGrow={1} alignItems="flex-end">
          {renderAddToCartButton()}
        </Flex>
      </Flex>
    </>
  );
}

export default ProductCard;
