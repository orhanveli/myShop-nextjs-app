import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Checkbox, Stack, Box, Input, Spinner } from '@chakra-ui/react';

import Card from '../shared/Card';
import { getAllManifacturers } from '../../features/manufacturers/manufacturer.api';
import { useDebounce } from '../../utils/hooks';
import { ShopManufacturer } from '../../features/manufacturers/manufacturer.models';

interface Props {}

function BrandSelectorCard({}: Props): ReactElement {
  const [loading, setLoading] = useState(false);
  const [brandNameQuery, setBrandNameQuery] = useState('');
  const [allBrands, setAllBrands] = useState<ShopManufacturer[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<ShopManufacturer[]>([]);

  const debouncedSetBrandNameQuery = useDebounce(brandNameQuery, 500);

  const getData = async () => {
    setLoading(true);
    try {
      const manufacturers = await getAllManifacturers();
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
      const splitedQuery = debouncedSetBrandNameQuery
        .trim()
        .toLowerCase()
        .split(' ');

      setFilteredBrands(
        allBrands.filter((br) => {
          return splitedQuery.every(
            (sq) => br.name.toLowerCase().indexOf(sq) > -1
          );
        })
      );
    } else {
      setFilteredBrands(allBrands);
    }
  }, [debouncedSetBrandNameQuery, allBrands]);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedBrands((prevBrands) => {
      const all = [...prevBrands];
      if (e.target.checked) {
        all.push(e.target.value);
      }
      return Array.from(new Set(all));
    });
  };

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
