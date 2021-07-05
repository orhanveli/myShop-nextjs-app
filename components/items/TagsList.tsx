import React, { ReactElement } from 'react';
import { HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  removeTag,
  selectProductsFilters
} from '../../features/products/products.slice';

function TagsList(): ReactElement {
  const productsFilters = useAppSelector(selectProductsFilters);
  const dispatch = useAppDispatch();

  if (
    !productsFilters.selectedTags ||
    productsFilters.selectedTags.length === 0
  ) {
    return null;
  }

  const handleClick = (e: any, tag: string) => {
    e.preventDefault();
    dispatch(removeTag(tag));
  };

  return (
    <HStack spacing={4}>
      {productsFilters.selectedTags.map((tag) => (
        <Tag
          size="md"
          key={`taglist-${tag}`}
          variant="solid"
          colorScheme="blue"
        >
          <TagLabel>{tag}</TagLabel>
          <TagCloseButton onClick={(e) => handleClick(e, tag)} />
          {/* <TagRightIcon boxSize="12px" as={MdClose} onClick={(e) => handleClick(e, tag)} /> */}
        </Tag>
      ))}
    </HStack>
  );
}

export default TagsList;
