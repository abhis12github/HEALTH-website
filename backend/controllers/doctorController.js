const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "doctor profile fetch success",
            data: doctor,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching doctor profile",
        });
    }
}

const updateProfileController = async (req, res) => {

    try {
        const doctor = await doctorModel.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
        );
        res.status(201).send({
            success: true,
            message: "Doctor Profile Updated",
            data: doctor,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching doctor profile",
        });
    }
}

const getDoctorByIdController=async(req,res)=>{
    try{
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Sigle Doctor Info Fetched",
      data: doctor,
    });

    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching single doctor profile",
        });
    }
}

const doctorAppointmentsController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ userId: req.body.userId });
      const appointments = await appointmentModel.find({
        doctorId: doctor._id,
      });
      res.status(200).send({
        success: true,
        message: "Doctor Appointments fetch Successfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in fetching Doctor Appointments",
      });
    }
  };

  const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Update Status",
      });
    }
  };

module.exports = { getDoctorInfoController, updateProfileController ,getDoctorByIdController,doctorAppointmentsController,updateStatusController };