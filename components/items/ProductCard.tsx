import React, { ReactElement } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { Box, Flex, Heading, Text, Image, Button } from '@chakra-ui/react';

import { ShopProduct } from '../../features/products/product.models';
import { currencyFormatter } from '../../utils';

interface Props {
  productInfo: ShopProduct;
}

function ProductCard({ productInfo }: Props): ReactElement {
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
          <Button
            colorScheme="blue"
            size="sm"
            w="full"
            rightIcon={<MdShoppingCart />}
          >
            Add
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ProductCard;
