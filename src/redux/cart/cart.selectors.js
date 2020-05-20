// memoize, important for performance to prevent re-rendering although state actually didn't change

import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((accQty, cartItem) => accQty + cartItem.quantity, 0)
);
