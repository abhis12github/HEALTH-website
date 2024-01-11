const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Monogodb connected ${mongoose.connection.host}`);
    }catch(err){
        console.log(`Mongodb server issue ${err}`);
    }
}

module.exports=connectDB;