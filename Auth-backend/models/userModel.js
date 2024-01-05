const mongoose =require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        maxLength:[30,"Max length must be <30"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        maxLength:[50,"Max length must be <30"]
    }
})
module.exports=mongoose.model("User",userSchema)