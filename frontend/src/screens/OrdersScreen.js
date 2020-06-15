import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveorder, listOrders, deleteOrder } from '../actions/orderActions';


function OrdersScreen(props){


    const orderList = useSelector(state => state.orderList);
    const {loading, orders, error} = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = orderDelete;
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(listOrders())
        return() =>{
            
        };
    }, [successDelete]);

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id));
    }

    return loading? <div>Loading...</div>:
    <div className="content content-margined">
        <div className="order-header">
            <h3> Ordenes</h3>
        </div>
        <div className="order-list content-margined">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FECHA</th>
                        <th>PRECIO</th>
                        <th>USUARIO</th>
                        <th>PAGADO</th>
                        <th>FECHA DE PAGO</th>
                        <th>ENTREGADO</th>
                        <th>FECHA DE ENTREGA</th> 
                        <th>ACCIÓN</th> 
                    </tr>
                </thead>
                <tbody>
                    {orders.map( order =>
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt} </td>
                            <td>{order.totalPrice} </td>
                            <td>{order.user.name} </td>
                            <td>{order.isPaid.toString()} </td>
                            <td>{order.paidAt} </td>
                            <td>{order.isDelivered.toString()} </td>
                            <td>{order.deliveredAt} </td>
                            <td>
                                <Link to={"/order/"+order._id} className = "button-signup">Detalles</Link>
                                {" "}
                                <button type="button" onClick={() => deleteHandler(order)} className="button-signup">Borrar</button>
                            </td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    </div>
    
}
export default OrdersScreen;
