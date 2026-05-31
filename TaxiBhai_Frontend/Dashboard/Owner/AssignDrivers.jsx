import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";
import Swal from "sweetalert2";
import UseOwner from "../../Hooks/UseOwner";
import { useContext, useState } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";


const AssignDrivers = () => {
    const { user } = useContext(TaxiContextManagement);
    const PublicApi_url = usePublicUrl();
    const [isOwner] = UseOwner();
    const [driverEmail, setDriverEmail] = useState('')

    const { isLoading, isError, error, data: serviceReqs = [], refetch } = useQuery({
        queryKey: ['serviceReq'],
        queryFn: async () => {
            try {
                const res = await PublicApi_url.get(`/owner/serviceReqStatus/${user?.email}`);
                return res.data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });
    const handleFormSubmit = (email) => {
        setDriverEmail(email); // Update driver's email state
    };

    const ownerAssignDriver = (serviceId) => {

        const assignDrivers = { driverEmail: driverEmail, serviceId: serviceId };

        PublicApi_url.post("/owner/assignDriver", assignDrivers)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Driver Assigned!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };



    if (isLoading) {
        return <span className="loading loading-spinner text-warning w-[500px] ml-[500px]"></span>;
    }

    if (isError) {
        return <span className="ml-[300px] text-red-700 text-4xl">Error : {error.message}</span>;
    }

    return (
        <div>
            {isOwner && (
                <div className="ml-[350px] min-h-screen">
                    {serviceReqs.map((serviceReq, idx) => (
                        <div key={serviceReq._id} className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No.</th>
                                        <th className="text-yellow-600">Photo</th>
                                        <th className="text-yellow-600 font-bold">Route</th>
                                        <th className="text-yellow-600">Fare Rate</th>
                                        <th className="text-yellow-600">Status</th>
                                        <th className="text-yellow-600">Driver's Email</th>
                                        <th className="text-yellow-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                            <p className="text-blue-700">{serviceReq.route}</p>
                                        </td>
                                        <td>
                                            <p className="text-base">{serviceReq.fareRate} BDT</p>
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

                                        {serviceReq.status === "accepted" && (

                                            <>

                                                <td>
                                                    <input
                                                        type="text"
                                                        
                                                        name={serviceReq?.brta}
                                                        onFocus={name}
                                                        value={driverEmail}
                                                        onChange={(e) => {

                                                            handleFormSubmit(e.target.value)
                                                        }}
                                                       
                                                        placeholder="Enter driver's email"
                                                    />

                                                </td>
                                                <td>
                                                    <button onClick={() => ownerAssignDriver(serviceReq._id)} className="btn btn-sm btn-secondary">
                                                        ASSIGN
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssignDrivers;
