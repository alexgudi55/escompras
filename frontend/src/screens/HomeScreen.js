import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props){

    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const category = props.match.params.id?props.match.params.id:"";
    const productList = useSelector(state => state.productList);
    const { products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts(category));
        return() => {
            //
        };
    }, [category])
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder));
    }
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }
    return <div className="content">
        {category && <h2>{category}</h2>}
        <ul className="filter">
            <li>
                <form onSubmit={submitHandler}>
                    <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button type="submit">Buscar</button>
                </form>
            </li>
            <li>
                <select name="sortOrder" onChange={sortHandler}>
                    <option value="">Lo más nuevo</option>
                    <option value="lowest">Menor precio</option>
                    <option value="highest">Mayor precio</option>
                </select>
            </li>
        </ul>
        {loading ? <div> Loading...</div>:
    error ? <div> error</div>:
    <ul className="products">
                {
                    products.map( product => 
                    <li key={product._id}>
                    <div className="product">
                        <Link to= {"/product/" + product._id} >
                            <img className = "product-image" src={product.image} alt="product"/>
                        </Link>
                        <div className="product-name">
                            <Link to= {"/product/" + product._id} >{product.name}</Link> 
                        </div>
                        <div className="product-seller">{product.seller}</div>
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews) </div>
                    </div>
                </li>)
                }
            </ul>}
    </div>
    
}

export default HomeScreen;