
import { Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorList() {
    const navigate=useNavigate();
    const [doctors, setDoctors] = useState([]);
    const getUserData = async () => {
        try {
            const res = await axios.get(
                "/api/v1/user/getAllDoctors",

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
    useEffect(()=>{
        getUserData();
    },[]);


    return (
        <div>
            <h1 className="text-center">Doctors List</h1>
            <Row>
                {doctors && doctors.map((doctor) => {
                    return <div 
                        className="h-[200px] w-[200px] p-2 shadow-lg rounded-lg shadow-blue-gray-500 ml-6 "
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
                    >
                        <div className="p-3">
                            <h3 className="text-center">Dr. {doctor.firstName} {doctor.lastName}</h3>
                        </div>
                        <div className="p-1">
                            <p className="p-1">
                                <b className="p-1">Specialization</b> {doctor.specialization}
                            </p>
                            <p className="p-1">
                                <b className="p-1">Experience</b> {doctor.experience}
                            </p>
                            <p className="p-1">
                                <b className="p-1">Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
                            </p>
                            <p className="p-1">
                                <b className="p-1">Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
                            </p>
                        </div>
                    </div>
                }
                )}

            </Row>

        </div>
    )

}

export default DoctorList;