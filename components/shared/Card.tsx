import React, { ReactElement, PropsWithChildren } from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

interface Props extends PropsWithChildren<BoxProps> {}

function Card({ children, ...rest }: Props): ReactElement {
  return (
    <Box
      w={'full'}
      padding="4"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'sm'}
      rounded={'sm'}
      overflow={'hidden'}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Card;
