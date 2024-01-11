import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/Features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert('Date and Time required');
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <h1 className="text-center p-2">Booking Page</h1>
      <div className="p-2 shadow-lg rounded-lg shadow-blue-gray-500 ml-6 w-[30%]">

        <div className="m-2">
          {doctors && (
            <div className="flex flex-col">
              <h3 className="p-3 text-center">
                <b>Dr.{doctors.firstName} {doctors.lastName}</b>
              </h3>
              <div className="flex flex-col m-2">
                <p className="text-sm">Fees : {doctors.feesPerCunsaltation}</p>
                <p className="text-sm">
                  Timings : {doctors.timings && doctors.timings[0]} -{" "}
                  {doctors.timings && doctors.timings[1]}{" "}
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex">
                  <DatePicker
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      setIsAvailable(false);
                      setDate(moment(value).format("DD-MM-YYYY"));
                    }
                    }
                  />
                  <TimePicker
                    format="HH:mm"
                    className="m-2"
                    onChange={(value) => {
                      setIsAvailable(false);
                      setTime(moment(value).format("HH:mm"));
                    }}
                  />

                </div>

                <div className="flex p-2">
                  <button className="mt-2 bg-white p-[5px] rounded-md text-black text-xs mr-2 outline-black outline-1 outline" onClick={handleAvailability}>
                    Check Availability
                  </button>
                  {!isAvailable && <button className="bg-black p-2 rounded-md mt-2 text-xs text-white" onClick={handleBooking}>
                    Book Now
                  </button>}

                </div>


              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;