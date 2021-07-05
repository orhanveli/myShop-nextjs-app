import React, { ReactElement, useEffect, useState } from 'react';
import { HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  addSelectedItemType,
  removeSelectedItemType,
  removeSelectedTag,
  selectProductsFilters
} from '../../features/products/products.slice';
import { getAllItemTypes } from '../../features/products/product.api';

function ItemTypeSelector(): ReactElement {
  const productsFilters = useAppSelector(selectProductsFilters);
  const dispatch = useAppDispatch();

  const [itemTypes, setItemTypes] = useState<string[]>([]);

  const getData = async () => {
    const itemTypes = await getAllItemTypes();
    setItemTypes(itemTypes);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (e: any, itemType: string, selected: boolean) => {
    e.preventDefault();
    dispatch(
      selected
        ? removeSelectedItemType(itemType)
        : addSelectedItemType(itemType)
    );
  };

  return (
    <HStack spacing={4}>
      {itemTypes.map((tag) => {
        const isSelected = productsFilters.selectedItemTypes.indexOf(tag) > -1;
        return (
          <Tag
            size="md"
            cursor="pointer"
            key={`taglist-${tag}`}
            variant="solid"
            onClick={(e) => handleClick(e, tag, isSelected)}
            colorScheme={isSelected ? 'blue' : 'gray'}
          >
            <TagLabel>{tag}</TagLabel>
          </Tag>
        );
      })}
    </HStack>
  );
}

export default ItemTypeSelector;
