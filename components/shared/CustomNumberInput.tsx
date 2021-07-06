import { ReactElement } from 'react';
import {
  HStack,
  Button,
  Input,
  UseNumberInputProps,
  useNumberInput
} from '@chakra-ui/react';

function CustomNumberInput(props: UseNumberInputProps): ReactElement {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 0,
      max: 100,
      precision: 1,
      ...props
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: false });

  return (
    <HStack maxW="120px">
      <Button {...dec} size="sm" variant="ghost">
        -
      </Button>
      <Input
        {...input}
        size="sm"
        bg="blue.500"
        color="white"
        textAlign="center"
        px="4"
        py="2"
        variant="unstyled"
      />
      <Button {...inc} size="sm" variant="ghost">
        +
      </Button>
    </HStack>
  );
}

export default CustomNumberInput;
