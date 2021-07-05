import React, { ReactElement, useState } from 'react';
import { Stack, RadioGroup, Radio } from '@chakra-ui/react';

import { config } from '../../constants';
import Card from '../shared/Card';

function SortSelectorCard(): ReactElement {
  const [value, setValue] = useState('price-low-2-high');

  return (
    <Card>
      <RadioGroup onChange={setValue} value={value}>
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
