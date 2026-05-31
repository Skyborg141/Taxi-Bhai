import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";
import UseAdmin from "../../Hooks/UseAdmin";
import Swal from "sweetalert2";



const AdminServiceRequest = () => {
    const PublicApi_url = usePublicUrl()
    const [isadmin] = UseAdmin()



    // tanstack query is used to provide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: serviceReqs = [] ,refetch} = useQuery({
        queryKey: ['serviceReq'],
        queryFn: async () => {
            // get data of service Request offered by Taxi Owner  through the server
            const res = await PublicApi_url.get("/serviceReq")
            return res.data

        }

    })

    // admin accept the request(function body)
    // when an item is inserted on the databse, each item get a databaseId , if we catch the item by databseId, server do query based on databseId and do assign work.
    const adminAcceptRequest = (databaseId) => {
        // initially when an owner request for a service, their status is pending, but when admin accept their request, the status should be accepted!
        const status = { status: "accepted" }
        PublicApi_url.patch(`/admin/acceptRequest/${databaseId}`, status)
            .then((res) => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Service Accepted !",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // refetch is used to show the updated data instantly.
                    // fetch means a specified data is loading in the client side
                    // refetch means again fetch as my data is just updated.
                    refetch()
                }
               
            })


    }

    // Admin Reject/delete the service Request:

    const adminRejectRequest=(vehicleId)=>{
        const status = { status: "rejected" }
        PublicApi_url.patch(`/admin/rejectRequest/${vehicleId}`,status)
        .then((res)=>{
            if(res.data.modifiedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Service Rejected !",
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
            {isadmin &&
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
                                        <th className="text-yellow-600" > Accept</th>
                                        <th className="text-yellow-600" > Reject/withdrow</th>
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
                                           {/* If accept button clicked , then triggers the adminAcceptRequest Function */}
                                            <button  onClick={()=>adminAcceptRequest(serviceReq._id)} className="btn btn-sm btn-success">ACCEPT</button>
                                        </td>
                                        <td>
                                            <button onClick={()=>adminRejectRequest(serviceReq._id)} className="btn btn-sm btn-error">Reject</button>
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

export default AdminServiceRequest;