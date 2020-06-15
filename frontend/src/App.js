import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegProductScreen from "./screens/RegProductScreen";
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlayOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';



function App() {

  const userSignin = useSelector(state => state.userSignin); /*Usando algo similar podría agregar automaticamente el nombre al vendedor de los productos*/
  const {userInfo} = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  const openMenuAdmin = () => {
    if(document.querySelector(".dropdown-content.open")) document.querySelector(".dropdown-content").classList.remove("open");
    else document.querySelector(".dropdown-content").classList.add("open");
  }

  return (
    <BrowserRouter> 
    <div className="grid-container">
          <header className="header">
              <div className="marca">
                  <button onClick={openMenu}>
                      &#9776;
                  </button>
                  <Link to="/"> ESCOMpras</Link>
              </div>
              <div className="header-links">
                  <Link to="/cart"> Carrito  </Link>
                  {" "}
                     {userInfo ? <Link to="/profile">{ userInfo.name }</Link> 
                     : <Link to="/signin">  Sign in  </Link>
                     }
                     {" "}
                    {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                        <a href="#" onClick={openMenuAdmin}>Admin</a>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/orders" onClick={openMenuAdmin}>Ordenes</Link>
                                <Link to="/products" onClick={openMenuAdmin}>Productos</Link>
                            </li>
                        </ul>
                        </div>
                    )}
              </div>
          </header> 
          <aside className="sidebar">
              <h3> Opciones de búsqueda</h3>
              <button className="sidebar-close-button" onClick={closeMenu}>x</button>
              <ul className="categories">
                  <li>
                      <Link to="/category/Golosinas">Golosinas</Link>
                  </li>
                  <li>
                      <Link to="/category/Pastelillos">Pastelillos</Link>
                  </li>
                  <li>
                      <Link to="/category/Electronica">Electrónica</Link>
                  </li>
              </ul>
          </aside> 
          <main className="main">
              <div className="content">
                  <Route path="/orders" component={OrdersScreen}/>
                  <Route path="/order/:id" component={OrderScreen}/>
                  <Route path="/profile" component={ProfileScreen}/>
                  <Route path="/placeorder" component={PlayOrderScreen}/>
                  <Route path="/payment" component={PaymentScreen}/>
                  <Route path="/shipping" component={ShippingScreen}/>
                  <Route path="/products" component={RegProductScreen}/>
                  <Route path="/signin" component={SigninScreen}/>
                  <Route path="/register" component={RegisterScreen}/>
                  <Route path="/product/:id" component={ProductScreen}/>
                  <Route path="/cart/:id?" component={CartScreen}/>
                  <Route path="/category/:id" component={HomeScreen}/>
                  <Route path="/" exact ={true}component={HomeScreen}/>
              </div>
          </main>
          <footer className="footer">All rights reserved.</footer>
      </div>
      </BrowserRouter> 
  );
}

export default App;
