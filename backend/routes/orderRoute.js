import express from 'express';
import { isAuth, isAdmin } from '../util';
import Order from '../models/orderModel';


const  router = express.Router();

router.get("/mine", isAuth, async(req,res) =>{
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
})

router.post("/", isAuth, async (req, res) => {

    console.log(req.body);
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({message: "New Order Created", data: newOrderCreated});

});

router.get("/:id", isAuth, async(req, res) => {
    const order = await Order.findOne({_id: req.params.id});
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send("Order not found");
    }
});

router.get("/", isAuth, async(req, res) => {
    const orders = await Order.find({}).populate("user");
    res.send(orders);
});

router.delete("/:id", isAuth, isAdmin, async(req, res) => {
    const order = await Order.findOne({_id: req.params.id});
    if(order){
        const DeletedOrder = await order.remove();
        res.send(DeletedOrder);
    }else{
        res.status(404).send("Order not found");
    }
});


router.put(":id/pay", isAuth, async (req, res) => {

    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment ={
            paymentMethod: "paypal",
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();
        res.send({message: "Order Paid", order: updatedOrder});
    } else {
        res.statut(404).send({message: "Order not found"});
    }
});



export default router;