import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


function ProductScreen(props){
    const[cantidad, setCantidad] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return() =>{
            
        };
    }, []);

    const handlerAddToCart = () => {
        props.history.push("/cart/"+props.match.params.id + "?qty=" + cantidad);
    }

    return <div>
        <div className="back-to-results">
            <Link to ="/">Back to Results</Link>
        </div>
        {loading? <div>LOADING...</div>:
         error ? <div>{error} </div> :
         (
            <div className = "details"> 
            <div className="details-image">
                <img src={product.image} alt='product'/>
            </div>
            <div className="details-info">
                <ul>
                    <li>
         <h4>{product.name} </h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                         Precio: <b>${product.price}</b>
                    </li>
                    <li>
                        Descripción:
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Precio: <b>${product.price}</b>
                    </li>
                    <li>
                        Status:  {product.countInStock > 0 ? "Disponible":
                            "Agotado"
                        }
                    </li>
                    <li>
                        Cantidad: <select value={cantidad} onChange={(e) => {setCantidad(e.target.value)}}>
                            {[...Array(product.countInStock).keys()].map(x=>
                                <option key={x+1} value= {x+1}> {x+1}</option>    
                            )}
                        </select>
                    </li>
                    <li>
                        {product.countInStock > 0 ? <button className="button-add-to-cart" onClick={handlerAddToCart}>Agregar al Carrito</button>
                        :
                        <button className=".button-producto-agotado" disabled>Agregar al Carrito</button>
                        }
                      
                    </li>
                </ul>
            </div>
        </div>
        )
        }
    </div>
    
}
export default ProductScreen;