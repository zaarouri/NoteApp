const express = require('express')
const auth = require('../middlewares/auth')
const User = require("../models/user")
const router = new express.Router()
// crate user
router.post("/users/create",async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken
        res.status(201).send({user,token,message:"new user created succussfuly "})
    }catch(e){
        console.log(e);
        if (user.password.length < 8){
            res.status(500).send({
                message:"password need to be more than 8 caracters"
            })
        }else if (e.keyPattern.username == 1){
            res.status(500).send({message:"username already taken "})
        }else {
            res.status(500).send({message:"Something went wrong "})
        }
    }
})
//login User
router.post('/user/login',async(req,res)=>{
    try{
        const user = await User.findBycredentials(req.body.username,req.body.password)
        const token = await User.generateAuthToken()
        res.status(200).send({User,token})
    }catch(err){
        res.status(500).send({message:"enable to login"})

    }
})
router.post("user/logout",auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({message:"logged out"})
    }catch(err){
        res.status(500).send({err})
    }
})
// get user deatils
router.get("users/me",auth,async(req,res)=>{
    res.send(req.user)
})
// delete user 
router.delete("/users/delete",auth,async(req,res)=>{
    try{
        req.user.remove()
        res.send({
            message:"your account was deleted along with all your data  "
        })
    }catch(err){
        res.status(500).send({err})
    }
})
module.exports = router