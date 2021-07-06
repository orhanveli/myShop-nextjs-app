import React, { ReactElement } from 'react';
import { Box, Stack, StackDivider, Text } from '@chakra-ui/react';

import CartProduct from './CartProduct';
import { currencyFormatter } from '../../utils';
import { useAppSelector } from '../../utils/hooks';
import { selectCart } from '../../features/cart/cart.slice';

function Cart(): ReactElement {
  const cart = useAppSelector(selectCart);

  if (!cart.items || cart.items.length === 0) {
    return (
      <Box p={4} textAlign="center" bg="white" w="full">
        <Text fontSize="sm">Your basket is empty</Text>
      </Box>
    );
  }

  const cartItems = cart.items.map((p) => {
    return <CartProduct productInfo={p} key={`cart-item-${p.slug}`} />;
  });

  return (
    <Stack
      direction="column"
      bg="white"
      w="full"
      p="2"
      spacing={2}
      divider={<StackDivider borderColor="gray.100" />}
    >
      {cartItems}
      <Stack direction="row" w="full" justifyContent="flex-end">
        <Box
          borderColor="blue.500"
          borderStyle="solid"
          borderWidth="1px"
          p="2"
          textAlign="center"
          w="100px"
        >
          <Text>{currencyFormatter.format(cart.total)}</Text>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Cart;
