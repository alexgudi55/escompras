import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req,res) => {
    const category = req.query.category ? {category: req.query.category} : {};
    const searchKeyword = req.query.searchKeyword ? {
        name: {$regex: req.query.searchKeyword,$options: "i" }
        } 
        :{};
    const sortOrder = req.query.sortOrder ? 
        (req.query.sortOrder === "lowest"? {price: 1}:{price:-1})
        : {_id: -1};
    const products = await Product.find({...category, ...searchKeyword}).sort(sortOrder);
    res.send(products);
});

router.get("/:id", async (req,res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product) res.send(product);
    else res.status(404).send({message:"Product not found."})
});

router.post("/", isAuth, isAdmin, async (req,res) =>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        seller: req.body.seller,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock
    });

    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message: "New product created", data: newProduct});
    }
    
    return res.status(500).send({message: "Error registering product"});
})

router.put("/:id",isAuth, isAdmin, async (req,res) =>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(productId);
    if(product)
    {
        product.name =  req.body.name;
        product.image =  req.body.image;
        product.seller = req.body.seller;
        product.category = req.body.category;
        product.description = req.body.description;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        const updatedproduct = await product.save();

        if(updatedproduct){
            return res.status(200).send({message: "Product update", data: updatedproduct});
        }
    }
    return res.status(500).send({message: "Error updating product"});
})

router.delete("/:id", isAuth, isAdmin, async(req,res) => {
    const deleteProduct = await Product.findById(req.params.id);
    if(deleteProduct){
        await deleteProduct.remove();
        res.send({message: "Product successfully deleted"})
    }else{
        res.send("Error in Deletion");
    }

})

export default router;


