import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";



import { useContext } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";
import UsePassenger from "../../Hooks/usePassenger";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import UseDriver from "../../Hooks/UseDriver";



const DriverRide = () => {
    const { user } = useContext(TaxiContextManagement)
    const PublicApi_url = usePublicUrl()
    const [isdriver] = UseDriver()


    // tanstack query is used to drovide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: driverRides = [], refetch } = useQuery({
        queryKey: ['driverRides'],
        queryFn: async () => {

            const res = await PublicApi_url.get(`/driverRide/getInfo/${user?.email}`)
            return res.data

        }

    })

    const cancelRide = (dt) =>{
        const data = {isdriverAccepted:"cancel"}
        PublicApi_url.patch(`/driver/cancelRide/${dt}`,data)
        .then((res) => {
            if (res.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Riding Request has been canceled. !",
                    showConfirmButton: false,
                    timer: 1800
                });
                refetch()

            }
        })

    }
    // Driver Cancel Ride
    const acceptRide = (dt) =>{
        const data = {isdriverAccepted:"accepted"}
        PublicApi_url.patch(`/driver/acceptRide/${dt}`,data)
        .then((res) => {
            if (res.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Riding Request has been accepted. !",
                    showConfirmButton: false,
                    timer: 1800
                });
                refetch()

            }
        })

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

            {isdriver &&
                <div className="ml-[350px] min-h-screen">


                    {
                        driverRides.map((dr, idx) => <div key={dr._id} className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No .</th>
                                        <th className="text-yellow-600" >Passenger_Photo</th>
                                        <th className="text-yellow-600">passenger_Name</th>
                                        <th className="text-yellow-600" >passenger_Email</th>
                                        <th className="text-yellow-600" >Route</th>
                                        <th className="text-yellow-600" >isdriverAccepted</th>
                                        <th className="text-yellow-600">ispassengerBooked</th>
                                        <th className="text-yellow-600">Ride</th>


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
                                                    <img src={dr.passengerPhoto}></img>
                                                </div>
                                            </div>


                                        </td>
                                        <td>
                                        <p className="text-base">{dr.passengerName}</p>

                                        </td>
                                        <td>


                                            <p className="text-base">{dr.passengerEmail}</p>

                                        </td>
                                        <td>


                                            <p className="font-bold">{dr.route}</p>

                                        </td>



                                        <td>

                                            {
                                                dr.isdriverAccepted === "pending" &&


                                                <p className=" btn btn-warning btn-sm ">{dr.isdriverAccepted}</p>
                                            }
                                            {
                                                dr.isdriverAccepted === "accepted" &&


                                                <p className=" btn btn-success btn-sm ">{dr.isdriverAccepted}</p>
                                            }
                                            {
                                                dr.isdriverAccepted === "cancel" &&


                                                <p className=" btn btn-error btn-sm ">{dr.isdriverAccepted}</p>
                                            }

                                        </td>

                                        <td>

                                            {
                                                dr.
                                                    ispassengerBooked === "booked" &&


                                                <p className=" btn btn-success btn-sm ">{dr.ispassengerBooked}</p>
                                            }

                                            {
                                                dr.ispassengerBooked === "canceled" &&


                                                <p className=" btn btn-error btn-sm ">{dr.ispassengerBooked}</p>
                                            }

                                        </td>
                                        <td>
                                            <div>
                                            <button onClick={()=>cancelRide(dr.currentDate)} className="btn btn-sm bg-yellow-700 text-white ">Cancel</button>
                                            <button onClick={()=>acceptRide(dr.currentDate)} className="btn btn-sm bg-yellow-700 text-white ">Accept</button>
                                            </div>
                                            
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

export default DriverRide;