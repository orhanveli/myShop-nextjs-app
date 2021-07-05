import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export interface ProductsState {
  selectedTags: string[];
  selectedBrands: string[];
  orderBy: string;
}

const initialState: ProductsState = {
  selectedTags: [],
  selectedBrands: [],
  orderBy: 'price-low-2-high'
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    removeTag: (state, action: PayloadAction<string>) => {
      const tagIndex = state.selectedTags.indexOf(action.payload);
      if (tagIndex === -1) {
        return;
      }
      console.log(tagIndex);
      state.selectedTags.splice(tagIndex, 1);
    },
    setSelectedBrands: (state, action: PayloadAction<string[]>) => {
      state.selectedBrands = action.payload;
    },
    setOrderby: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    }
  }
});

export const { setSelectedTags, removeTag, setOrderby, setSelectedBrands } =
  productsSlice.actions;

export const selectProductsFilters = (state: RootState) => state.products;

export default productsSlice.reducer;
