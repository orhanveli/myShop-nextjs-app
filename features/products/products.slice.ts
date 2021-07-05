import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export interface ProductsState {
  selectedTags: string[];
  selectedBrands: string[];
  selectedItemTypes: string[];
  orderBy: string;
}

const initialState: ProductsState = {
  selectedTags: [],
  selectedBrands: [],
  selectedItemTypes: [],
  orderBy: 'price-low-2-high'
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    addSelectedItemType(state, action: PayloadAction<string>) {
      if (state.selectedItemTypes.indexOf(action.payload) === -1) {
        state.selectedItemTypes.push(action.payload);
      }
    },
    removeSelectedItemType: (state, action: PayloadAction<string>) => {
      const typeIndex = state.selectedItemTypes.indexOf(action.payload);
      if (typeIndex === -1) {
        return;
      }
      state.selectedItemTypes.splice(typeIndex, 1);
    },
    addSelectedTag(state, action: PayloadAction<string>) {
      if (state.selectedTags.indexOf(action.payload) === -1) {
        state.selectedTags.push(action.payload);
      }
    },
    removeSelectedTag: (state, action: PayloadAction<string>) => {
      const tagIndex = state.selectedTags.indexOf(action.payload);
      if (tagIndex === -1) {
        return;
      }
      state.selectedTags.splice(tagIndex, 1);
    },
    setSelectedBrands: (state, action: PayloadAction<string[]>) => {
      state.selectedBrands = action.payload;
    },
    addSelectedBrand(state, action: PayloadAction<string>) {
      if (state.selectedBrands.indexOf(action.payload) === -1) {
        state.selectedBrands.push(action.payload);
      }
    },
    removeSelectedBrand: (state, action: PayloadAction<string>) => {
      const brandIndex = state.selectedBrands.indexOf(action.payload);
      if (brandIndex === -1) {
        return;
      }
      state.selectedBrands.splice(brandIndex, 1);
    },
    setOrderby: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    }
  }
});

export const {
  setSelectedTags,
  addSelectedTag,
  removeSelectedTag,
  setOrderby,
  setSelectedBrands,
  addSelectedBrand,
  removeSelectedBrand,
  addSelectedItemType,
  removeSelectedItemType
} = productsSlice.actions;

export const selectProductsFilters = (state: RootState) => state.products;

export default productsSlice.reducer;
