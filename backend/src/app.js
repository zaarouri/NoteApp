const express = require('express')
const app = express()
const dotenv =require('dotenv')
const userRouter = require('./routes/user.router')
dotenv.config({path:'./config/config.env'})
const Port=process.env.Port
//  cors setup
app.unsubscribe((req,res,next)=>{
res.set('Access-Control-Allow-Origin','*')
res.set('Access-Control-Allow-Header','*')
res.set('Access-Control-Allow-Methods','*')
if (res.method == 'OPTIONS') {
    res.status(200).end()
    return;
}
next();
})
app.use(express.json())
app.use(userRouter)
app.listen(Port,()=>{
    console.log(`backend is running on ${Port}`)
})