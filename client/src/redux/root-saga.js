import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';
import { shopSagas } from './shop/shop.sagas';

export default function* rootSage() {
  // simulataneous run all the sagas, not yield one after the other
  yield all([call(userSagas), call(cartSagas), call(shopSagas)]);
}
