import React, { ReactElement } from 'react';
import { Stack, Flex, Heading } from '@chakra-ui/react';

import BrandSelectorCard from '../items/BrandSelectorCard';
import SortSelectorCard from '../items/SortSelectorCard';
import TagSelectorCard from '../items/TagSelectorCard';

function SidebarLeft(): ReactElement {
  return (
    <Stack w="full" spacing="6">
      <Flex direction="column" aria-label="Sorting options">
        <Heading as="h4" size="md" marginBottom="4">
          Sorting
        </Heading>
        <SortSelectorCard />
      </Flex>

      <Flex direction="column" aria-label="Filter by brands">
        <Heading as="h4" size="md" marginBottom="4">
          Brands
        </Heading>
        <BrandSelectorCard />
      </Flex>

      <Flex direction="column" aria-label="Filter by brands">
        <Heading as="h4" size="md" marginBottom="4">
          Tags
        </Heading>
        <TagSelectorCard />
      </Flex>
    </Stack>
  );
}

export default SidebarLeft;
