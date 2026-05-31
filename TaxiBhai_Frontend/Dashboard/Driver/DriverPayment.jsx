import { useQuery } from "@tanstack/react-query";
import usePublicUrl from "../../Hooks/usePublicUrl";
import { useContext } from "react";
import { TaxiContextManagement } from "../../Context/TaxiContext";

import UseDriver from "../../Hooks/UseDriver";




const DriverPayment = () => {
    const { user } = useContext(TaxiContextManagement)
    const PublicApi_url = usePublicUrl()
    const [isdpiver] = UseDriver()


    // tanstack query is used to dpovide information from the database in the client side by communicate with server
    const { isLoading, isError, error, data: dpiverPayments = [], refetch } = useQuery({
        queryKey: ['dpiverPayments'],
        queryFn: async () => {

            const res = await PublicApi_url.get(`/driverPayment/${user?.email}`)
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

            {isdpiver &&
                <div className="ml-[350px] min-h-screen">


                    {
                        dpiverPayments.map((dp, idx) => <div key={dp._id} className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-yellow-600">No .</th>
                                        <th className="text-yellow-600" >Passenger_Photo</th>
                                        <th className="text-yellow-600" >vehicle_Photo</th>
                                        <th className="text-yellow-600" >passenger_Email</th>
                                        <th className="text-yellow-600" >driver_Email</th>
                                        <th className="text-yellow-600" >Route</th>
                                        <th className="text-yellow-600" >Amount</th>

                                        <th className="text-yellow-600">Date & Time</th>


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
                                                    <img src={dp.passengerPhoto}></img>
                                                </div>
                                            </div>


                                        </td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-8 h-8">
                                                    <img src={dp.vehiclePhoto}></img>
                                                </div>
                                            </div>


                                        </td>

                                        <td>


                                            <p className="text-base">{dp.passengerEmail}</p>

                                        </td>
                                        <td>


                                            <p className="text-base">{dp.driverEmail}</p>

                                        </td>
                                        <td>


                                            <p className="font-bold">{dp.route}</p>

                                        </td>
                                        <td>


                                            <p className="font-bold">{dp.amount}</p>

                                        </td>
                                        <td>
                                            <p className="font-bold">{dp.currentDateTime}</p>
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

export default DriverPayment;