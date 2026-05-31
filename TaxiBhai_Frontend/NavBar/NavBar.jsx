// import the content, componnets from different folder

import { Link, NavLink } from "react-router-dom";
import logo from "../../public/Logo/Taxi VAI.jpg";
import { IoCall } from "react-icons/io5";
import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";
import { Helmet } from "react-helmet-async";

const Navbar = () => {
    // take Context value from the TaxiContextManagement
    const { user, logOut } = useContext(TaxiContextManagement)
    const logOutFromThePortal = () => {
        return logOut()
            .then(() => { })
            .catch(() => { })
    }


    // for  dynamically  use navcomponnet bar 
    const navComponents = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/ride">Ride</NavLink></li>
        <li><NavLink to="/dashboard">DASHBOARD</NavLink></li>
        




    </>
    return (
        
        // fixed ==> navbar fixed , no changes while scrolling
        // top-0 ==> margin top 0px
        // z-10 ==> give priority the componnet over the other componnet
        // w-full ==> take the entire width of the current machine Screen.

        <div className="fixed top-0 z-10 w-full" >
            
            <div className="navbar flex-col md:flex-row lg:flex-row bg-neutral text-neutral-content">
                <Link to="/"><button className="btn btn-ghost text-xl text-yellow-400 font-sans font-semibold">
                    <span><img className="w-[40px] h-[40px]" src={logo}></img></span>Taxi Vai</button></Link>
                {/* Bangladesh police page is linked below. */}
                <a href="https://dmp.gov.bd/"><button className="btn btn-ghost text-xl ml-24 text-red-600 font-sans font-semibold">
                    <span><IoCall></IoCall></span>Emergency: 999</button></a>

                    {/* in chrome tab bar, showing the information about the page */}
                    <Helmet>
                    <title>Taxi vai-Home</title>
                    </Helmet>


                {
                    user ? <div className=" flex gap-4 ml-[900px]">
                        <div>
                            <p className="text-white">{user?.displayName}</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn flex btn-ghost btn-circle avatar">

                                <div className="w-10  rounded-full">
                                    <img className="flex-1" src={user.photoURL} />


                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <button onClick={logOutFromThePortal} className="text-black">LogOut</button>

                            </ul>
                        </div>
                    </div>
                        : <Link to="/login"><button className="bg-yellow-600 text-white btn ml-[900px]  font-bold">Sign In</button></Link>
                }

            </div>


            <div className="navbar  bg-base-100">
                <div className="navbar-start">
                    {/* small display */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {/* take navComponnets */}
                            {navComponents}
                        </ul>
                    </div>

                </div>
                {/* large display */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* take navComponnets */}
                        {navComponents}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default Navbar;