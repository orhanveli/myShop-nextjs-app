import Head from 'next/head';
import {
  Container,
  Heading,
  Flex,
  Box,
  Stack,
  SimpleGrid,
  Skeleton,
  ButtonProps
} from '@chakra-ui/react';
import {
  Container as PaginatorContainer,
  Next,
  PageGroup,
  Paginator,
  Previous,
  usePaginator
} from 'chakra-paginator';

import SidebarLeft from '../components/shared/SidebarLeft';
import TagList from '../components/items/ItemTypeSelector';
import ProductList from '../components/items/ProductList';
import { useAppSelector } from '../utils/hooks';
import { selectProductsFilters } from '../features/products/products.slice';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { getProductsList } from '../features/products/product.api';
import { ShopProduct } from '../features/products/product.models';
import { config } from '../constants';

export function Home(): ReactElement {
  const productsFilters = useAppSelector(selectProductsFilters);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const { isDisabled, pagesQuantity, currentPage, setCurrentPage } =
    usePaginator({
      total: totalCount,
      initialState: {
        pageSize: config.ui.productCountPerPage,
        currentPage: 1,
        isDisabled: false
      }
    });

  const outerLimit = 2;
  const innerLimit = 4;

  // styles
  const baseStyles: ButtonProps = {
    // w: 7,
    flex: 1,
    px: 2,
    py: 2,
    fontSize: 'sm'
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'blue.300'
    },
    bg: 'gray.300'
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    bg: 'blue.300'
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'gray.200'
  };

  const getData = async () => {
    setLoading(true);
    try {
      const productListResponse = await getProductsList({
        orderBy: productsFilters.orderBy,
        tags: productsFilters.selectedTags,
        itemTypes: productsFilters.selectedItemTypes,
        brands: productsFilters.selectedBrands,
        page: 1
      });
      console.log(productListResponse);
      setProducts(productListResponse.products);
      setTotalCount(productListResponse.total);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [
    productsFilters.orderBy,
    productsFilters.selectedBrands,
    productsFilters.selectedTags,
    productsFilters.selectedItemTypes
  ]);

  const skeleton = useMemo(
    () => (
      <SimpleGrid columns={4} spacing="16px">
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
      </SimpleGrid>
    ),
    []
  );

  const handlePageChange = async (nextPage: number) => {
    await getData();
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <Head>
        <title>My Shop</title>
        <meta name="description" content="MyShop - your online shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl">
        <Stack spacing="16px" direction="row" py="6">
          <Flex w="296px" flexShrink={0}>
            <SidebarLeft />
          </Flex>
          <Flex flexGrow={1} direction="column">
            <Heading as="h2" size="lg" mb="4">
              Products
            </Heading>
            <Box mb={4}>
              <TagList />
            </Box>
            <Box p={4} bg="white">
              {loading ? skeleton : <ProductList products={products} />}
            </Box>
            <Box>
              <Paginator
                isDisabled={isDisabled}
                activeStyles={activeStyles}
                innerLimit={innerLimit}
                currentPage={currentPage}
                outerLimit={outerLimit}
                normalStyles={normalStyles}
                separatorStyles={separatorStyles}
                pagesQuantity={pagesQuantity}
                onPageChange={handlePageChange}
              >
                <PaginatorContainer
                  align="center"
                  justify="space-between"
                  w="full"
                  p={4}
                >
                  <Previous>Previous</Previous>
                  <PageGroup isInline align="center" />
                  <Next>Next</Next>
                </PaginatorContainer>
              </Paginator>
            </Box>
          </Flex>
          <Flex w="296px" flexShrink={0}>
            sidebar
          </Flex>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;
