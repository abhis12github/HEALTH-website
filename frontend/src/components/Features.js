import React from "react";
import doctor from "../images/vecteezy_afro-female-professional-doctor_14175079-removebg.png";
import styles from "../styles/Features.module.css";
import Card from "./Card";
import { useSelector } from "react-redux";

function Features() {
    const { user } = useSelector((state) => state.user);
    const profilelink = `/doctors/Profile/${user?._id}`;
    const appointmentLink = user?.isDoctor ? "/doctorAppointments" : "/appointments";
    return (
        <div className="h-[100vh] w-[100%]">
            <div className={styles.feature}>
                <h2 className="text-center font-medium text-xl p-4 text-[#2aacb0]">Our Services</h2>
                <div className="flex h-[85vh] justify-between">
                    <div className="h-[100%] w-[35%] flex justify-center pr-2">
                        <img src={doctor} className="w-[80%]"></img>
                    </div>
                    <div className="w-[65%] flex justify-evenly my-auto">
                        <Card source="fa-solid fa-video fa-lg" title="Video" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." navigateto="/video"></Card>
                        <Card source="fa-solid fa-video fa-lg" title="Appointments List" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." navigateto={appointmentLink}></Card>
                        {user?.isDoctor ? "" : <Card source="fa-solid fa-location-dot fa-xl" title="Find Doctors" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." navigateto="/findDoctor"></Card>}
                        {user?.isDoctor ? "" : <Card source="fa-solid fa-user-doctor fa-xl" title="Apply Doctor" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." navigateto="/applyDoctor"></Card>}
                        {user?.isDoctor && <Card source="fa-solid fa-headset fa-xl" title="Profile" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi." navigateto={profilelink}></Card>}
                    </div>
                </div>

            </div>


        </div>
    );

}

export default Features;