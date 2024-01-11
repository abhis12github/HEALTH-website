import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Register from './components/Register';
import LogIn from './components/Login';
import DefaultSpinner from './components/Spinner';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './components/ApplyDotor';
import Notification from './components/Notification';
import Users from './components/Users';
import Doctors from './components/Doctors';
import Profile from './components/Profile';
import DoctorList from './components/DoctorList';
import BookingPage from './components/Appointments';
import AppointmentsList from './components/AppointmentList';
import DoctorAppointments from './components/DoctorAppointments';
import Video from './components/Video';
import RoomPage from './components/Room';


function App() {
const {loading} = useSelector(state=>state.alerts); 
const {user}=useSelector((state)=>state.user);
console.log(`/doctors/Profile/${user?._id}`);
const router = createBrowserRouter([ 
  {
    path: "/",
    element:<ProtectedRoute> <HomePage></HomePage></ProtectedRoute>
  },
  {
    path: "/Register",
    element:<PublicRoute> <Register></Register></PublicRoute>
  },
  {
    path:"/LogIn",
    element:<PublicRoute><LogIn></LogIn></PublicRoute>
  },
  {
    path:"/applyDoctor",
    element:<ProtectedRoute><ApplyDoctor></ApplyDoctor></ProtectedRoute>
  },
  {
    path:"/notification",
    element:<ProtectedRoute><Notification></Notification></ProtectedRoute>
  },
  {
    path:"/admin/users",
    element:<ProtectedRoute><Users></Users></ProtectedRoute>
  },
  {
    path:"/admin/doctors",
    element:<ProtectedRoute><Doctors></Doctors></ProtectedRoute>
  },
  {
    path:`/doctors/Profile/:id`,
    element:<ProtectedRoute><Profile></Profile></ProtectedRoute>
  },
  {
    path:"/findDoctor",
    element:<ProtectedRoute><DoctorList></DoctorList></ProtectedRoute>
  },
  {
    path:`/doctor/book-appointment/:doctorId`,
    element:<ProtectedRoute><BookingPage></BookingPage></ProtectedRoute>
  },
  {
    path:'/appointments',
    element:<ProtectedRoute><AppointmentsList></AppointmentsList></ProtectedRoute>
  },
  {
    path:"/doctorAppointments",
    element:<ProtectedRoute><DoctorAppointments></DoctorAppointments></ProtectedRoute>
  },
  {
    path:"/video",
    element:<ProtectedRoute><Video></Video></ProtectedRoute>
  },
  {
    path:"/room/:roomId",
    element:<ProtectedRoute><RoomPage></RoomPage></ProtectedRoute>
  }
]);

  return (
    <main>
      {loading ? <DefaultSpinner></DefaultSpinner> : <RouterProvider router={router}></RouterProvider> }

    </main>

  );
}

export default App;
