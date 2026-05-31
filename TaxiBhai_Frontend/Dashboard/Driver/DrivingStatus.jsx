import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";
import { useContext } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";
import UseDriver from "../../Hooks/UseDriver";



const DrivingStatus = () => {
    const { user } = useContext(TaxiContextManagement)
    const PublicApi_url = usePublicUrl()
    const [isdriver] = UseDriver()



    // tanstack query is used to provide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: driveReqs = [] } = useQuery({
        queryKey: ['driveReq'],
        queryFn: async () => {
            // get data of drive Request Status   through the server
            const res = await PublicApi_url.get(`/driver/driveReqStatus/${user?.email}`)
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
            {/* if isadmin == true (coming from server side response) , then only excute <div>..</div> */}
            {isdriver &&
                <div className="ml-[350px] min-h-screen">


                    {
                        driveReqs.map((driveReq, idx) => <div key={driveReq._id} className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No .</th>
                                        <th className="text-yellow-600" >Photo</th>
                                        <th className="text-yellow-600" >Name</th>
                                        <th className="text-yellow-600" >Email</th>
                                        <th className="text-yellow-600" > Owner's Email</th>
                                        <th className="text-yellow-600" >NID</th>
                                        <th className="text-yellow-600 font-bold" >Licence</th>
                                        <th className="text-yellow-600" >status</th>
                                        <th className="text-yellow-600">Asigned Vehicle</th>



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
                                                    <img src={driveReq.photo}></img>
                                                </div>
                                            </div>


                                        </td>
                                        <td>


                                            <p className="text-base">{driveReq.name}</p>

                                        </td>
                                        <td>


                                            <p className="font-bold">{driveReq.email}</p>

                                        </td>
                                        <td>

                                            <p className="text-base">{driveReq.ownerEmail}</p>

                                        </td>
                                        <td>


                                            <p className=" text-blue-700">{driveReq.NID}</p>

                                        </td>
                                        <td>

                                            <p className="text-base ">{driveReq.Licence}</p>

                                        </td>

                                        <td>

                                            {
                                                driveReq.status === "Pending" &&


                                                <p className=" btn btn-warning btn-sm ">{driveReq.status}</p>
                                            }
                                            {
                                                driveReq.status === "accepted" &&


                                                <p className=" btn btn-success btn-sm ">{driveReq.status}</p>
                                            }
                                            {
                                                driveReq.status === "rejected" &&


                                                <p className=" btn btn-error btn-sm ">{driveReq.status}</p>
                                            }

                                        </td>
                                        <td>
                                            <p className="font-bold">{driveReq.assignedVehicle}</p>

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

export default DrivingStatus;