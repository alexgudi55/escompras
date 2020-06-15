import express from 'express';
import User from '../models/userModel';
import getToken, { isAuth } from "../util";
import jwt from 'jsonwebtoken';
import config from '../config';

const router = express.Router();

router.post("/signin", async (req, res) => {

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: jwt.sign(
                {
                _id: signinUser._id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin}, 
                config.JWT_SECRET, 
                {expiresIn: '48h'}
            )
        })

    }else{
        res.status(401).send({msg: "Invalid Email or Password"})
    }
})

router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const  newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: jwt.sign(
                {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin}, 
                config.JWT_SECRET, 
                {expiresIn: '48h'}
            )
        })

    }
    else{
        res.status(401).send({msg: "No se pudo registrar el usuario"})
    }
});

router.put("/:id", isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: jwt.sign(
                {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin}, 
                config.JWT_SECRET, 
                {expiresIn: '48h'}
            )
        })
    }
    else{
        res.status(404).send({msg: "User not found"})
    }
});


router.get("/createadmin", async (req, res) => {
    try{    
        const user = new User({
            name: 'Alejandro',
            email: 'alexblink182sr@hotmail.com',
            password: "1234",
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(newUser);
    } catch(error){
        res.send({msg: error.message});
    }
})

export default router;

