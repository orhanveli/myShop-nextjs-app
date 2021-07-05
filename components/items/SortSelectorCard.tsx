import React, { ReactElement, useCallback, useState } from 'react';
import { Stack, RadioGroup, Radio } from '@chakra-ui/react';

import { config } from '../../constants';
import Card from '../shared/Card';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  selectProductsFilters,
  setOrderby
} from '../../features/products/products.slice';

function SortSelectorCard(): ReactElement {
  const productsFilters = useAppSelector(selectProductsFilters);
  const dispatch = useAppDispatch();

  const handleChange = useCallback((val: string) => {
    dispatch(setOrderby(val));
  }, []);

  return (
    <Card>
      <RadioGroup onChange={handleChange} value={productsFilters.orderBy}>
        <Stack direction="column">
          {config.ui.sortOptions.map((so) => (
            <Radio
              value={so.value}
              size="sm"
              name="items-sort-by"
              id={`soid-${so.value}`}
              key={`so-${so.value}`}
            >
              {so.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Card>
  );
}

export default SortSelectorCard;
