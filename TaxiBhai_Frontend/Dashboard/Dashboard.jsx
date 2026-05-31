import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../NavBar/NavBar"
import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";
import UseOwner from "../Hooks/UseOwner";
import { Helmet } from "react-helmet-async";
import UseAdmin from "../Hooks/UseAdmin";
import UseDriver from "../Hooks/UseDriver";
import UsePassenger from "../Hooks/usePassenger";



const DashBoard = () => {
    const { user } = useContext(TaxiContextManagement)
    // specific role based hooks are imported here to give access the dashbord and dashbord activity.
    // isOwner is comming here as a true /false 
    const [isowner] = UseOwner()
    const [isadmin] = UseAdmin()
    const[isdriver] = UseDriver()
    const[ispassenger] = UsePassenger()
    return (
        <div>
            <Navbar></Navbar>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div className="flex">
                <div className="w-[280px] fixed min-h-screen border-4 rounded-lg bg-slate-200 border-orange-400">
                    <div className=" flex mt-32 avatar justify-center ">
                        <div className="w-4 md:w-11 lg:w-11 rounded-full">
                            <img src={user?.photoURL} />
                        </div>

                    </div>
                    <div>
                        {/* check the role and if is owner is true  and excute h1 class as it is a and oparation  */}
                        {
                            isowner && <h1 className="ml-16 w-1/2 text-right flex mt-4 bg-green-300 rounded-md font-bold items-center text-lg justify-center">Role : Owner </h1>
                        }
                        {/* check the role and if is admin is true  and excute h1 class as it is a and oparation  */}
                        {
                            isadmin && <h1 className="ml-16 w-1/2 text-right flex mt-4 bg-red-300 rounded-md font-bold items-center text-lg justify-center">Role : Admin </h1>
                        }
                        {
                            isdriver && <h1 className="ml-16 w-1/2 text-right flex mt-4 bg-cyan-300 rounded-md font-bold items-center text-lg justify-center">Role : Driver </h1>
                        }
                        {
                            ispassenger && <h1 className="ml-16 w-1/2 text-right flex mt-4 bg-lime-300 rounded-md font-bold items-center text-base justify-center">Role : Passenger </h1>
                        }
                    </div>

                    {/* if is owner is true  and excute div class as it is a and oparation */}
                    {/* owner Dashboard */}
                    {
                        isowner && <div className="mt-8 flex flex-col space-y-4">
                          
                          {/* navlink is a active route and indicates which url/component is currently active */}
                            <NavLink
                                to="/dashboard/owner/businessReq"
                                // custom style is applied for three conditions
                                style={({ isActive, isPending, isTransitioning }) => {
                                    // ? is a ternary oparator
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                                <p className=" text-center w-full  p-2 ">Service Request</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/owner/assignDrivers"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">AssignDrivers</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/owner/serviceStatus"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">Service Status</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/owner/vehicleStatus"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">Vehicle Status</p>
                            </NavLink>
                        </div>
                    }
                    {/* admin Dashboard */}
                    {
                        isadmin && <div className="mt-8 flex flex-col space-y-4">
                          
                          {/* navlink is a active route and indicates which url/component is currently active */}
                            <NavLink
                                to="/dashboard/admin/serviceReq"
                                // custom style is applied for three conditions
                                style={({ isActive, isPending, isTransitioning }) => {
                                    // ? is a ternary oparator
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                                <p className=" text-center w-full  p-2 ">Service Request</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/admin/driverReq"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">Driver Request</p>
                            </NavLink>
                        </div>
                    }
                    {/* driver DashBoard */}
                     {
                        isdriver && <div className="mt-8 flex flex-col space-y-4">
                          
                          {/* navlink is a active route and indicates which url/component is currently active */}
                            <NavLink
                                to="/dashboard/driver/drivingReq"
                                // custom style is applied for three conditions
                                style={({ isActive, isPending, isTransitioning }) => {
                                    // ? is a ternary oparator
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                                <p className=" text-center w-full  p-2 ">Driving Request</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/driver/UpdateVehicleStatus"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">Update Vehicle Status</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/driver/drivingStatus"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">DrivingStatus</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/driver/ride"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">Ride</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/driver/payment"
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                               <p className=" text-center w-full  p-2  ">Payment</p>
                            </NavLink>
                        </div>
                    }

                    {/* Passenger DashBoard */}
                    {
                        ispassenger && <div className="mt-8 flex flex-col space-y-4">
                          
                          {/* navlink is a active route and indicates which url/component is currently active */}
                            <NavLink
                                to="/dashboard/passenger/ride"
                                // custom style is applied for three conditions
                                style={({ isActive, isPending, isTransitioning }) => {
                                    // ? is a ternary oparator
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        background:isActive? " rgb(233,182,63)":"",
                                        padding:isActive? "4px":"",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                                <p className=" text-center w-full  p-2 ">Ride</p>
                            </NavLink>
                           
                        </div>
                    }

                </div>
                <div className="mt-36">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;