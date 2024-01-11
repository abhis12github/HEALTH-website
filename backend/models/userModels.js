const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is a required field']
    },
    email:{
        type:String,
        required:[true,'email is a required field']
    },
    password:{
        type:String,
        required:[true,'Password is a required field']
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[],
    },
    seennotification:{
        type:Array,
        default:[],
    },
});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;