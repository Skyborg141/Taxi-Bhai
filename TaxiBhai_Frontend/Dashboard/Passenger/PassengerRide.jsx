import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";



import { useContext } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";
import UsePassenger from "../../Hooks/usePassenger";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";



const PassengerRide = () => {
    const { user } = useContext(TaxiContextManagement)
    const PublicApi_url = usePublicUrl()
    const [ispassenger] = UsePassenger()
    const [show, setShow] = useState(true)



    // tanstack query is used to provide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: passengerRides = [], refetch } = useQuery({
        queryKey: ['passengerRides'],
        queryFn: async () => {

            const res = await PublicApi_url.get(`/passengerRide/getInfo/${user?.email}`)
            return res.data

        }

    })

    const cancelRide = (brta) => {
        setShow(false)
        const data = { ispassengerBooked: "canceled" }
        PublicApi_url.patch(`/passenger/cancelRide/${brta}`, data)
            .then((res) => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Riding Request has been canceled. !",
                        showConfirmButton: false,
                        timer: 1800
                    });
                    refetch()

                }
            })

    }

    const showRideHistory = () => {
        setShow(false)
    }




    // data is Loading 
    if (isLoading) {
        return <span className="loading loading-spinner text-warning w-[500px] ml-[500px]"></span>
    }
    // if any error has been occour 
    if (isError) {
        return <span className="ml-[300px] text-red-700 text-4xl">Error : {error.message}</span>
    }
    return (



        <div>

            {ispassenger &&
                <div className="ml-[350px] min-h-screen">


                    {
                        passengerRides.map((pr, idx) => <div key={pr._id} className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No .</th>
                                        <th className="text-yellow-600" >Photo</th>
                                        <th className="text-yellow-600" >DriverEmail</th>
                                        <th className="text-yellow-600" >Route</th>
                                        <th className="text-yellow-600" >BRTA</th>
                                        <th className="text-yellow-600" >isdriverAccepted</th>
                                        <th className="text-yellow-600">ispassengerBooked</th>
                                        <th className="text-yellow-600"> Ride</th>
                                        <th className="text-yellow-600">Payment</th>

                                    </tr>
                                </thead>
                               

                                    <tbody>
                                        {/* row 1 */}
                                        <tr>

                                            <td>

                                                <div>
                                                    <div className="">
                                                        <p>{idx + 1}</p>
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-8 h-8">
                                                        <img src={pr.photo}></img>
                                                    </div>
                                                </div>


                                            </td>
                                            <td>


                                                <p className="text-base">{pr.driverEmail}</p>

                                            </td>
                                            <td>


                                                <p className="font-bold">{pr.route}</p>

                                            </td>
                                            <td>


                                                <p className="font-bold">{pr.brta}</p>

                                            </td>



                                            <td>

                                                {
                                                    pr.isdriverAccepted === "pending" &&


                                                    <p className=" btn btn-warning btn-sm ">{pr.isdriverAccepted}</p>
                                                }
                                                {
                                                    pr.isdriverAccepted === "accepted" &&


                                                    <p className=" btn btn-success btn-sm ">{pr.isdriverAccepted}</p>
                                                }
                                                {
                                                    pr.isdriverAccepted === "rejected" &&


                                                    <p className=" btn btn-error btn-sm ">{pr.isdriverAccepted}</p>
                                                }

                                            </td>

                                            <td>

                                                {
                                                    pr.
                                                        ispassengerBooked === "booked" &&


                                                    <p className=" btn btn-success btn-sm ">{pr.ispassengerBooked}</p>
                                                }

                                                {
                                                    pr.ispassengerBooked === "canceled" &&


                                                    <p className=" btn btn-error btn-sm ">{pr.ispassengerBooked}</p>
                                                }

                                            </td>
                                            <td>
                                                <button disabled={pr.ispassengerBooked === "canceled"} onClick={() => cancelRide(pr.brta)} className="btn btn-sm bg-red-700 text-white ">Cancel</button>

                                            </td>
                                            <td>
                                                <Link to={`/dashboard/passenger/payment/${pr._id}/${pr.amount}/${pr.driverEmail}/${pr.ownerEmail}`}><button onClick={showRideHistory}

                                                    className="bg-cyan-300 btn">
                                                    PAY
                                                </button></Link>
                                            </td>



                                        </tr>



                                    </tbody>
                              
                                {/* foot */}


                            </table>
                        </div>)
                    }
                </div>
            }

        </div >

    );
};

export default PassengerRide;