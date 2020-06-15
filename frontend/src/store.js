import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import {userSigninReducer, userRegisterReducer, userUpdateReducer} from "./reducers/userReducers"
import Cookie from "js-cookie";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer, orderDeleteReducer, myOrderListReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems")  || [];
const userInfo = Cookie.getJSON("userInfo")  || null;



const intialState = {cart: {cartItems, shipping:{}, payment: {} }, userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, intialState, composeEnhancer(applyMiddleware(thunk)));
export default store;