import Head from 'next/head';
// import Image from 'next/image';
import { Container, Heading, Flex, Stack } from '@chakra-ui/react';

import SidebarLeft from '../components/shared/SidebarLeft';
import TagList from '../components/items/TagsList';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { selectProductsFilters } from '../features/products/products.slice';

export default function Home() {
  const productsFilters = useAppSelector(selectProductsFilters);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Head>
        <title>My Shop</title>
        <meta name="description" content="MyShop - your online shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl">
        <Stack spacing="16px" direction="row" py="6">
          <Flex w="296px">
            <SidebarLeft />
          </Flex>
          <Flex flexGrow={1} direction="column">
            <Heading as="h2" size="lg" marginBottom="4">
              Products
            </Heading>
            <TagList />
            <p>{productsFilters.orderBy}</p>
          </Flex>
          <Flex w="296px">sidebar</Flex>
        </Stack>
      </Container>
    </div>
  );
}
