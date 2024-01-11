const express=require('express');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app=express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/user',require("./routes/userRoutes"));
app.use('/api/v1/admin',require("./routes/adminRoutes"));
app.use('/api/v1/doctor',require("./routes/doctorRoutes"));

const port =process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} Mode on port ${process.env.port}`);
});