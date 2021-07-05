import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Checkbox, Stack, Box, Input, Spinner } from '@chakra-ui/react';

import Card from '../shared/Card';
import { getAllManifacturers } from '../../features/manufacturers/manufacturer.api';
import { useAppDispatch, useAppSelector, useDebounce } from '../../utils/hooks';
import { ShopManufacturer } from '../../features/manufacturers/manufacturer.models';
import {
  addSelectedBrand,
  removeSelectedBrand,
  selectProductsFilters
} from '../../features/products/products.slice';

interface Props {}

function BrandSelectorCard({}: Props): ReactElement {
  const productsFilters = useAppSelector(selectProductsFilters);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [brandNameQuery, setBrandNameQuery] = useState('');
  const [allBrands, setAllBrands] = useState<ShopManufacturer[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<ShopManufacturer[]>([]);

  const debouncedSetBrandNameQuery = useDebounce(brandNameQuery, 500);

  const getData = async () => {
    setLoading(true);
    try {
      const manufacturers = await getAllManifacturers(200);
      setAllBrands(manufacturers);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (debouncedSetBrandNameQuery && debouncedSetBrandNameQuery.length > 2) {
      const splitedQuery = debouncedSetBrandNameQuery.trim().toLowerCase();
      setFilteredBrands(
        allBrands.filter((br) => {
          return br.name.toLowerCase().indexOf(splitedQuery) > -1;
        })
      );
    } else {
      setFilteredBrands(allBrands);
    }
  }, [debouncedSetBrandNameQuery, allBrands]);

  const handleCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addSelectedBrand(e.target.value));
    } else {
      dispatch(removeSelectedBrand(e.target.value));
    }
  }, []);

  const isBrandChecked = useCallback(
    (brand) => {
      return productsFilters.selectedBrands.indexOf(brand) > -1;
    },
    [productsFilters.selectedBrands]
  );

  const renderFilteredBrands = () => {
    if (!filteredBrands || filteredBrands.length === 0) {
      return null;
    }
    return (
      <>
        {filteredBrands.map((br) => (
          <Checkbox
            value={br.slug}
            onChange={handleCheck}
            key={br.slug}
            isChecked={isBrandChecked(br.slug)}
            size="sm"
          >
            {br.name}
          </Checkbox>
        ))}
      </>
    );
  };

  return (
    <Card>
      <Box mb={4}>
        <Input
          placeholder="Brand name"
          onInput={(e) => setBrandNameQuery(e.currentTarget.value)}
        />
      </Box>
      <Stack direction="column" h="250px" px={1} overflowY="auto">
        {loading ? <Spinner /> : renderFilteredBrands()}
      </Stack>
    </Card>
  );
}

export default BrandSelectorCard;
