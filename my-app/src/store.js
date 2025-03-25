import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import toursReducer from './slices/toursSlice';
import tourReducer from './slices/tourSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

const reducer = combineReducers({
    toursState: toursReducer,
    tourState: tourReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

