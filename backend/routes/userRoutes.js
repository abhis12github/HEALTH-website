const express=require('express');
const { LoginController, RegisterController, AuthController ,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookeAppointmnetController,bookingAvailabilityController,userAppointmentsController} = require('../controllers/userControlller');
const authMiddleware = require('../middlewares/authMiddleware');


const router=express.Router();

router.post('/login',LoginController);
router.post('/register',RegisterController);
router.post('/getUserData',authMiddleware,AuthController);
router.post('/apply-doctor',authMiddleware,applyDoctorController);
router.post('/getallnotification',authMiddleware,getAllNotificationController);
router.post('/deleteallnotification',authMiddleware,deleteAllNotificationController);
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post("/booking-availbility",authMiddleware,bookingAvailabilityController);
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports=router;