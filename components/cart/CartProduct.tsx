import React, { ReactElement } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { CartProductItem } from '../../features/cart/cart.models';
import CustomNumberInput from '../shared/CustomNumberInput';
import { currencyFormatter } from '../../utils';
import { useAppDispatch } from '../../utils/hooks';
import { changeCount } from '../../features/cart/cart.slice';

interface Props {
  productInfo: CartProductItem;
}

function CartProduct({ productInfo }: Props): ReactElement {
  const dispatch = useAppDispatch();

  const handleChange = (vstr, vnumber) => {
    dispatch(changeCount({ slug: productInfo.slug, count: vnumber }));
  };

  return (
    <Stack direction="row" w="full" justifyContent="space-between">
      <Stack direction="column">
        <Text fontSize="sm" fontWeight="semibold">
          {productInfo.name}
        </Text>
        <Text fontSize="sm" color="blue.500">
          {currencyFormatter.format(productInfo.price)}
        </Text>
      </Stack>
      <CustomNumberInput value={productInfo.count} onChange={handleChange} />
    </Stack>
  );
}

export default CartProduct;
