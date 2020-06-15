import Axios from "axios";
import { ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL } from "../constants/orderConstants";
import {ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS} from "../constants/orderConstants";

const createOrder = (order) => async (dispath, getState) => {

    try {

        dispath({type: ORDER_CREATE_REQUEST, payload: order});
        const {userSignin: {userInfo}} = getState();
        const {data: {data: newOrder}} = await Axios.post("/api/orders", order, {
            headers:{
                Authorization : ' Bearer ' + userInfo.token
            }
        }) 
        dispath({type: ORDER_CREATE_SUCCESS, payload: newOrder})

    } catch (error) {
        dispath({type: ORDER_CREATE_FAIL, payload: error.message})
    }
}

const detailsOrder = (orderId) => async (dispath, getState) => {

    try {
        dispath({type: ORDER_DETAILS_REQUEST, payload: orderId});
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.get("/api/orders/" + orderId, {
            headers: {Authorization: ' Bearer ' + userInfo.token}
        });
        dispath({type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: ORDER_DETAILS_FAIL, payload: error.message})
    }
}


const payOrder = (order, paymentResult) => async (dispath, getState) => {

    try {
        dispath({type: ORDER_PAY_REQUEST, payload: paymentResult});
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers: {Authorization: ' Bearer ' + userInfo.token}
        });
        dispath({type: ORDER_PAY_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: ORDER_PAY_FAIL, payload: error.message})
    }
}

const  listOrders = () => async (dispath,getState) => {
    try{
        dispath({type: ORDER_LIST_REQUEST});
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.get("/api/orders", {
            headers: {Authorization: ' Bearer ' + userInfo.token}
        });
        dispath({ type: ORDER_LIST_SUCCESS, payload: data});
    }
    catch(error) {
        dispath({ type: ORDER_LIST_FAIL, payload: error.message});
    }
}

const listMyOrders = () => async (dispath,getState) => {
    try{
        dispath({type: MY_ORDER_LIST_REQUEST});
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.get("/api/orders/mine", {
            headers: {Authorization: ' Bearer ' + userInfo.token}
        });
        dispath({ type: MY_ORDER_LIST_SUCCESS, payload: data});
    }
    catch(error) {
        dispath({ type: MY_ORDER_LIST_FAIL, payload: error.message});
    }
}

const deleteOrder = (orderId) => async (dispath, getState) => {

    try {
        dispath({type: ORDER_DELETE_REQUEST, payload: orderId});
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.delete("/api/orders/" + orderId, {
            headers: {Authorization: ' Bearer ' + userInfo.token}
        });
        dispath({type: ORDER_DELETE_SUCCESS, payload: data})
    } catch (error) {
        dispath({type: ORDER_DELETE_FAIL, payload: error.message})
    }
}

export { createOrder, detailsOrder, payOrder, listOrders,listMyOrders, deleteOrder };