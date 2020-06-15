import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';


function OrderScreen(props){

    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay, error: errorPay} = orderPay;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successPay){
            props.history.push("/profile")
        }else{
            dispatch(detailsOrder(props.match.params.id));
        }
        return () => {

        };
    }, [successPay])
    
    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, order, error} = orderDetails;
    const playHandler = () => {};

    const handlerSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }


    return loading ? <div>Loading... </div>:error?<div>{error}</div>:
    <div>
        <div className="placeorder"> 
            <div className="placeorder-info">
                <div>
                <h3>Orden: {order._id}</h3>
                </div>
                <div>
                    <h3>Envío</h3>
                    <div> {order.shipping.address}, {order.shipping.city},{order.shipping.postalCode}, {order.shipping.country} </div>
                    <div> {orderDetails.isDelivered? "Entregado:" + orderDetails.deliveredAt : "No entregado."} </div>
                </div>
                <div>
                    <h3>Pago </h3>
                    <div>Método de pago: {order.payment.paymentMethod}</div>
                    <div> {orderDetails.isPaid? "Pagado:" + orderDetails.paidAt : "No pagado."} </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>
                                Productos
                            </h3>
                            <div>
                                Price
                            </div>
                        </li>
                        
                            {
                                
                                order.orderItems.map( item=>
                                    <li>
                                        
                                            <div className="cart-image">
                                                <img src={item.image} alt ="product"/>
                                            </div>
                                            <div className = "cart-name">
                                                <div>
                                                    <Link to={"/product/" + item.product}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    Cantidad: {item.cantidad}
                                                </div>
                                            </div>
                                            <div className= "cart-price"> ${item.price}</div>
                                        
                                    </li>
                                    )
                            }
                        
                    </ul>
                </div>
                
            </div>
            <div className="placeorder-action">
                <ul>
                    <li className="placeorder-action-payment">
                        {!order.isPaid && <PaypalButton amount={order.totalPrice} onSuccess={handlerSuccessPayment} />}
                    </li>
                    <li>
                        <h3>Resumen de compra</h3>
                    </li>
                    <li>
                        <div> Artículos </div>
                        <div>${order.itemsPrice}</div>
                    </li>
                    <li>
                        <div> Envío </div>
                        <div>${order.shippingPrice}</div>
                    </li>
                    <li>
                        <div> Impuestos </div>
                        <div>${order.taxPrice}</div>
                    </li>
                    <li>
                        <div> Total </div>
                        <div>${order.totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
    
    
}

export default OrderScreen;