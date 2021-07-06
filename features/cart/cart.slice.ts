import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { CartProductItem } from './cart.models';

export interface CartState {
  items: CartProductItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartProductItem>) => {
      let total = 0;
      let hasBeenAdded = false;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].slug === action.payload.slug) {
          state.items[i] = {
            ...state.items[i],
            count: state.items[i].count + action.payload.count,
            price: action.payload.price
          };
          hasBeenAdded = true;
        }
        total += state.items[i].count * state.items[i].price;
      }
      if (!hasBeenAdded) {
        state.items.push(action.payload);
        total += action.payload.price * action.payload.count;
      }
      state.total = total;
    },
    changeCount: (
      state,
      action: PayloadAction<{ slug: string; count: number }>
    ) => {
      let total = 0;
      let deleteThis = -1;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].slug === action.payload.slug) {
          if (action.payload.count === 0) {
            deleteThis = i;
          } else {
            state.items[i] = {
              ...state.items[i],
              count: action.payload.count
            };
          }
        }
        if (deleteThis !== i) {
          total += state.items[i].price * state.items[i].count;
        }
      }
      state.total = total;
      if (deleteThis > -1) {
        state.items.splice(deleteThis, 1);
      }
    }
  }
});

export const { addItem, changeCount } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
