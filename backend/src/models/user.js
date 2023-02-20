const mongoose=require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        required:true,
        type:String,
        minlenght:8
    },
    tokens:{
        token:{
            type:String,
            required:true
        }
    }
},{timestamps:true})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user.id.toString()},process.env.Note_JWT)
    user.tokens=users.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findBycredentials = async(username,password)=>{
const user = await User.findOne(username)
if(!user){
    throw new Error ("Enable to login ")
}
}


const User = mongoose.model("user",userSchema)
module.exports = User