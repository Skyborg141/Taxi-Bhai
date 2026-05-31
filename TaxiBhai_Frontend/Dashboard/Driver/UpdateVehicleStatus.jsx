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
                                        <th className="text-yellow-600">Vehicle_Photo</th>
                                        <th className="text-yellow-600" >Route</th>
                                        <th className="text-yellow-600" >Amount</th>
                                        <th className="text-yellow-600" >OwnerEmail</th>
                                        <th className="text-yellow-600" >Status</th>
                                        
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
                                                    <img src={dr.photo}></img>
                                                </div>
                                            </div>


                                        </td>
                                        <td>
                                        <p className="text-base">{dr.route}</p>

                                        </td>
                                        <td>
                                        <p className="text-base">{dr.amount}</p>

                                        </td>
                                        <td>


                                            <p className="text-base font-extrabold">{dr.ownerEmail}</p>

                                        </td>
                                        



                                      

                                        
                                        <td>
                                            <div>
                                            
                                            <Link to={`/dashboard/updateVehicle/${dr.route}/${encodeURIComponent(dr.photo)}/${dr.amount}/${dr.ownerEmail}`}><button  className="btn btn-sm bg-yellow-700 text-white ">Update</button></Link>
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