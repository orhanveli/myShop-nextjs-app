import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Checkbox, Stack, Box, Input, Spinner } from '@chakra-ui/react';

import Card from '../shared/Card';
import { useAppDispatch, useAppSelector, useDebounce } from '../../utils/hooks';
import { getAllTags } from '../../features/products/product.api';
import {
  addSelectedTag,
  removeSelectedTag,
  selectProductsFilters
} from '../../features/products/products.slice';

function TagSelectorCard(): ReactElement {
  const productsFilters = useAppSelector(selectProductsFilters);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [tagQuery, setTagQuery] = useState('');
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  const debouncedSetTagQuery = useDebounce(tagQuery, 500);

  const getData = async () => {
    setLoading(true);
    try {
      const allTags = await getAllTags();
      setAllTags(allTags);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (debouncedSetTagQuery && debouncedSetTagQuery.length > 2) {
      const splitedQuery = debouncedSetTagQuery.trim().toLowerCase().split(' ');
      setFilteredTags(
        allTags.filter((tag) => {
          return splitedQuery.every((sq) => tag.toLowerCase().indexOf(sq) > -1);
        })
      );
    } else {
      setFilteredTags(allTags);
    }
  }, [debouncedSetTagQuery, allTags]);

  const handleCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addSelectedTag(e.target.value));
    } else {
      dispatch(removeSelectedTag(e.target.value));
    }
  }, []);

  const isTagChecked = useCallback(
    (tag) => {
      return productsFilters.selectedTags.indexOf(tag) > -1;
    },
    [productsFilters.selectedTags]
  );

  const renderFilteredTags = () => {
    if (!filteredTags || filteredTags.length === 0) {
      return null;
    }
    return (
      <>
        {filteredTags.map((tag) => (
          <Checkbox
            value={tag}
            key={`ft-${tag}`}
            onChange={handleCheck}
            isChecked={isTagChecked(tag)}
            size="sm"
          >
            {tag}
          </Checkbox>
        ))}
      </>
    );
  };

  return (
    <Card>
      <Box mb={4}>
        <Input
          placeholder="Tag"
          onInput={(e) => setTagQuery(e.currentTarget.value)}
        />
      </Box>
      <Stack direction="column" h="150px" px={1} overflowY="auto">
        {loading ? <Spinner /> : renderFilteredTags()}
      </Stack>
    </Card>
  );
}

export default TagSelectorCard;
