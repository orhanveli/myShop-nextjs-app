import React, { ReactElement } from 'react';
import { Heading, Container, Flex, Box, Button } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';

import { currencyFormatter } from '../../utils';

interface Props {}

function Topbar({}: Props): ReactElement {
  return (
    <>
      <Box bg="cyan.500" color="white">
        <Container maxW="container.xl">
          <Flex p="3">
            <Flex flexGrow={1} justifyContent="center">
              <Heading as="h1" size="lg" margin="0" padding="0">
                myShop
              </Heading>
            </Flex>
            <Flex w="100px" justifyContent="flex-end">
              <Button
                aria-label="My Basket"
                rightIcon={<MdShoppingCart />}
                colorScheme="blackAlpha"
                variant="outline"
              >
                {currencyFormatter.format(0)}
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Topbar;
