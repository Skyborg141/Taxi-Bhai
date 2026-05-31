import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";

import Swal from "sweetalert2";
import UseOwner from "../../Hooks/UseOwner";
import { useContext } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";



const ServiceStatus = () => {
    const{user} = useContext(TaxiContextManagement)
    const PublicApi_url = usePublicUrl()
    const [isowner] = UseOwner()



    // tanstack query is used to provide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: serviceReqs = [] ,refetch} = useQuery({
        queryKey: ['serviceReq'],
        queryFn: async () => {
            // get data of service Request Status   through the server
            const res = await PublicApi_url.get(`/owner/serviceReqStatus/${user?.email}`)
            return res.data

        }

    })

    

    // owner Reject/delete the service Request:

    const ownerWithdrowRequest=(vehicleId)=>{
        
        PublicApi_url.delete(`/owner/withdrowRequest/${vehicleId}`)
        .then((res)=>{
            if(res.data.deletedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Service Withdrowed !",
                    showConfirmButton: false,
                    timer: 1500
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
            {/* if isadmin == true (coming from server side response) , then only excute <div>..</div> */}
            {isowner &&
                <div className="ml-[350px] min-h-screen">


                    {
                        serviceReqs.map((serviceReq, idx) => <div key={serviceReq._id} className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No .</th>
                                        <th className="text-yellow-600" >Photo</th>
                                        <th className="text-yellow-600" >Business Name</th>
                                        <th className="text-yellow-600" > Owner's Email</th>
                                        <th className="text-yellow-600" >Transport Type</th>
                                        <th className="text-yellow-600 font-bold" >Route</th>
                                        <th className="text-yellow-600" >Fare Rate</th>
                                        <th className="text-yellow-600">BRTA License </th>
                                        <th className="text-yellow-600" > status</th>
                                      
                                        <th className="text-yellow-600" >withdrow</th>
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
                                                    <img src={serviceReq.photo}></img>
                                                </div>
                                            </div>


                                        </td>
                                        <td>


                                            <p className="text-base">{serviceReq.busineesName}</p>

                                        </td>
                                        <td>


                                            <p className="font-bold">{serviceReq.email}</p>

                                        </td>
                                        <td>

                                            <p className="text-base">{serviceReq.transportType}</p>

                                        </td>
                                        <td>


                                            <p className=" text-blue-700">{serviceReq.route}</p>

                                        </td>
                                        <td>

                                            <p className="text-base ">{serviceReq.fareRate} BDT</p>

                                        </td>
                                        <td>


                                            <p className=" ">{serviceReq.brta}</p>

                                        </td>
                                        <td>

                                            {
                                                serviceReq.status === "Pending" &&


                                                <p className=" btn btn-warning btn-sm ">{serviceReq.status}</p>
                                            }
                                            {
                                                serviceReq.status === "accepted" &&


                                                <p className=" btn btn-success btn-sm ">{serviceReq.status}</p>
                                            }
                                            {
                                                serviceReq.status === "rejected" &&


                                                <p className=" btn btn-error btn-sm ">{serviceReq.status}</p>
                                            }

                                        </td>
                                        
                                        <td>
                                            <button onClick={()=>ownerWithdrowRequest(serviceReq._id)} className="btn btn-sm btn-error">Withdrow</button>
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

export default ServiceStatus;