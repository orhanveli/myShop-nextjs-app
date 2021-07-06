import { config } from '../constants';

export function printSortLabel(val: string) {
  const option = config.ui.sortOptions.find((op) => op.value === val);
  if (option) {
    return option.label;
  }
  return config.ui.sortOptions[0].label;
}
