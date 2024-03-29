const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
    });
  }
};

const approveDoctorController=async(req,res)=>{
  try{
    const {doctorId,status}=req.body;
    const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status});
    const user=await userModel.findOne({_id:doctor.userId});
    const notification=user.notification;
    notification.push({
      type:"doctor-account-request accepted",
      message:`Your doctor account request has ${status}`,
      onClickPath:"/notification"
    });

    user.isDoctor=status==='approved'?true:false;
    await user.save();
    res.status(200).send({
      success:true,
      message:"Approved doctor",
      data:doctor
    });
  }catch(err){
    console.log(err);
    res.status(500).send({
      success:false,
      message:"Error in approveDoctor controller",
    });
  }
}

module.exports = { getAllDoctorsController, getAllUsersController, approveDoctorController };