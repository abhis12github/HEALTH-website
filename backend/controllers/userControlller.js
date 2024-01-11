const userModel=require("../models/userModels");
const doctorModel=require("../models/doctorModel");
const appointmentModel=require("../models/appointmentModel");
const moment=require("moment");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const RegisterController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message:"User Already Registered",success:false});
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;

        const newUser=new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:'Register Succesfully',success:true});
    }catch(err){
        console.log(err);
        res.status(500).send({message:`Register controller ERROR ${err}`,success:false});
    }
}

const LoginController=async(req,res)=>{
    try{
        const userFound=await userModel.findOne({email:req.body.email});
        if(!userFound){
            return res.status(200).send({message:"User is not registered", success:false});
        }
        const isMatch=await bcrypt.compare(req.body.password,userFound.password);
        if(!isMatch){
            return res.status(200).send({message:"Invalid credentials", success:false});
        }
        const token=jwt.sign({id:userFound._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({message:"user Logged In", success:true, token});
    }catch(err){
        console.log(err);
        res.status(500).send({message:`Login controller ERROR ${err}`,success:false});
    }
}

const AuthController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId});
        if(!user){
            return res.status(404).send({
                message:"user not found",
                success:false
            });
        }else{
            user.password=undefined;
            res.status(200).send({
                success:true,
                data:user,
            });
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:'auth error',success:false});
    }
}

const applyDoctorController=async(req,res)=>{
    try{
        const newDoctor=await doctorModel({...req.body,status:'pending'});
        await newDoctor.save();

        const adminUser=await userModel.findOne({isAdmin:true});
        const notification=adminUser.notification;
        notification.push({
            type:'Apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} has a pending request`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName+" "+newDoctor.lastName,
                onClickPath:'/admin/doctors'
            }
        });

        await userModel.findByIdAndUpdate(adminUser._id,{notification});
        res.status(201).send({
            message:"Successfully applied for doctor account",
            success:true,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            meassage:'Error in apply doctor controller',
            success:false
        });
    }
}

const getAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId});
        const seennotification=user.seennotification;
        const notification=user.notification;
        seennotification.push({...notification});
        user.notification=[];
        user.seennotification=notification;
        const updatedUser=await user.save();
        updatedUser.password=undefined;
        res.status(200).send({
            success:true,
            message:'all notifications marked as read',
            data:updatedUser,
        });
    }catch(err){
        res.status(500).send({message:"Error in notification controller",success:false});
    }
}

const deleteAllNotificationController=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId});
        user.notification=[];
        user.seennotification=[];
        const updatedUser=await user.save();
        updatedUser.password=undefined;
        res.status(200).send({message:"notification deleted succesfully",success:true,data:updatedUser});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"unable to delete all notification",success:false});
    }
}


const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors = await doctorModel.find({ status: "approved" });
        res.status(200).send({
          success: true,
          message: "Docots Lists Fetched Successfully",
          data: doctors,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Fetching DOcotr",
        });
      }
}

const bookeAppointmnetController = async (req, res) => {
    try {
      req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString();
      req.body.time=moment(req.body.time,'HH:mm').toISOString();
      req.body.status = "pending";
      const newAppointment = new appointmentModel(req.body);
      await newAppointment.save();
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
      user.notification.push({
        type: "New-appointment-request",
        message: `A new Appointment Request from ${req.body.userInfo.name}`,
        onCLickPath: "/user/appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Book succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While Booking Appointment",
      });
    }
  };

  const bookingAvailabilityController = async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: true,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointments available",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Booking",
      });
    }
  };

  const userAppointmentsController = async (req, res) => {
    try {
      const appointments = await appointmentModel.find({
        userId: req.body.userId,
      });
      res.status(200).send({
        success: true,
        message: "Users Appointments Fetch SUccessfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In User Appointments",
      });
    }
  };
  
  

module.exports={LoginController,RegisterController,AuthController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookeAppointmnetController,bookingAvailabilityController,userAppointmentsController};
 