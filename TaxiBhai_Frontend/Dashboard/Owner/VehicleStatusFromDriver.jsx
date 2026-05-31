
import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";

import Swal from "sweetalert2";
import UseOwner from "../../Hooks/UseOwner";
import { useContext } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";
import { Helmet } from "react-helmet-async";



const VehicleStatusFromDriver = () => {
    const{user} = useContext(TaxiContextManagement)
    const PublicApi_url = usePublicUrl()
    const [isowner] = UseOwner()



    // tanstack query is used to provide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: vehicleStatus = [] ,refetch} = useQuery({
        queryKey: ['vehicleStatus'],
        queryFn: async () => {
            // get data of service Request Status   through the server
            const res = await PublicApi_url.get(`/owner/vehicleStatus/${user?.email}`)
            return res.data

        }

    })

    

  
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
             <Helmet>
                <title>Service Status</title>
            </Helmet>
            {isowner &&
                <div className="ml-[350px] min-h-screen">


                    {
                       vehicleStatus.map((serviceReq, idx) => <div key={serviceReq._id} className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No .</th>
                                        <th className="text-yellow-600" >Vehicle_Photo</th>
                                        <th className="text-yellow-600" > Driver Email</th>
                                        <th className="text-yellow-600" >Transaction Id</th>
                                        <th className="text-yellow-600 font-bold" >Route</th>
                                        <th className="text-yellow-600" >Amount</th>
                                        <th className="text-yellow-600" >passenger Count</th>
                                        <th className="text-yellow-600" >Fuel</th>
                                        <th className="text-yellow-600" >Time</th>

                                        
                                    
                                      
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
                                                    <img src={serviceReq.vehiclePhoto}></img>
                                                </div>
                                            </div>


                                        </td>
                                        <td>


                                            <p className="text-base">{serviceReq.driverEmail}</p>

                                        </td>
                                        <td>


                                            <p className="font-bold">{serviceReq.TransactionId}</p>

                                        </td>
                                        <td>

                                            <p className="text-base">{serviceReq.Route}</p>

                                        </td>
                                        <td>

                                            <p className="text-base">{serviceReq.PayableAmount} BDT</p>

                                        </td>
                                        <td>


                                            <p className=" text-blue-700">{serviceReq.PassengerCount} person</p>

                                        </td>
                                        <td>

                                            <p className="text-base ">{serviceReq.fuel} L</p>

                                        </td>
                                        <td>


                                            <p className=" ">{serviceReq.currentDateTime}</p>

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

export default VehicleStatusFromDriver;