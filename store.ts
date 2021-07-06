import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productsReducer from './features/products/products.slice';
import cartReducer from './features/cart/cart.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
