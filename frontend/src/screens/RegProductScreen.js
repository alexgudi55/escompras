import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';


function RegProductScreen(props){

    const [registarProducto, setRegistrarProducto] = useState("Registrar Producto");
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [seller, setSeller] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState("");

    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;

    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
    const dispatch  = useDispatch();

    useEffect(() => {
        if(successSave){
            setModalVisible(false);
            setRegistrarProducto("Registrar Producto");
        }
        dispatch(listProducts())
        return() =>{
            
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        if(modalVisible) {
            setRegistrarProducto("Registrar Producto");
            setModalVisible(false);
        }
        else{
            setModalVisible(true);
            setRegistrarProducto("Cerrar");
        } 
        setID(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setSeller(product.seller);
        setDescription(product.description);
        setCategory(product.category);
        setCountInStock(product.countInStock);       
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id: id,name, price, image, seller, category, description, countInStock}));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return <div className="content content-margined">
        <div className="product-header">
            <h3> Productos</h3>
        <button className="button-signin" onClick={() => openModal({})}> {registarProducto}</button>
        </div>
        {modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h3>Registrar Producto</h3>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                            
                        </li>
                        <li>
                        <label htmlFor="name"> Nombre </label> 
                        <input type='text' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="precio"> Precio </label> 
                        <input type='text' name="precio" id="precio" value={price} onChange={(e) => setPrice(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="image"> Imagen </label> 
                        <input type='text' name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="seller"> Vendedor </label> 
                        <input type='text' name="seller" id="seller" value={seller} onChange={(e) => setSeller(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="category"> Categoría </label> 
                        <input type='text' name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="description"> Descripción </label> 
                        <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                        </li>
                        <li>
                        <label htmlFor="countInStock"> Cantidad </label> 
                        <input type="text" name="countInStock" id="countInStocl" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                        </input>
                        </li>
                        <li>
                            <button type="submit" className="button-signin">Guardar Producto</button>
                        </li>
                    </ul>
                </form>
            </div>
        }
        
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Vendedor</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map( product =>
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name} </td>
                            <td>{product.seller} </td>
                            <td>{product.price} </td>
                            <td>{product.category} </td>
                            <td>
                                <button className="button-signup" onClick={() => openModal(product)}>Editar</button>
                                {" "}
                                <button className="button-signup" onClick={() => deleteHandler(product)}>Borrar</button>
                            </td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    </div>
    
}
export default RegProductScreen;
