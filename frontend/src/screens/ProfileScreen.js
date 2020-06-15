import React, { useState, useEffect } from 'react'
import {logout, update} from "../actions/userActions";
import {listMyOrders} from "../actions/orderActions";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileScreen(props){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({userId: userInfo._id, email, name, password}));
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading, success, error} = userUpdate;
    
    const myOrderList = useSelector(state => state.myOrderList);
    const{loading: loadingOrders, orders, error: errorOrders} = myOrderList;
    useEffect(() => {
        if(userInfo){
            setEmail(userInfo.email);
            setName(userInfo.name);
        }
        dispatch(listMyOrders());
        return() =>{
            
        };
    }, [])

    return <div className ="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h3>Perfil de Usuario.</h3>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Perfil actualizado</div>}
                            
                        </li>
                        <li>
                        <label htmlFor="name"> Nombre </label> 
                        <input value={name} type='name' name="name" id="name" onChange={(e) => setName(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="email"> Email </label> 
                        <input value={email} type='email' name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        </li>
                        <li>
                            <label htmlFor="password"> Contraseña</label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <button type="submit" className="button-signin">Actualizar</button>
                        </li>
                        <li>
                           <button onClick={handleLogout} className="button-signin full-width">Logout</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div className="profile-orders">
            {
                loadingOrders ? <div>Loading... </div> :
                errorOrders ? <div>{errorOrders} </div>:
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
                            </td>
                        </tr> 
                    )}
                </tbody>
            </table>
            }
        </div>

    </div>
}

export default ProfileScreen;