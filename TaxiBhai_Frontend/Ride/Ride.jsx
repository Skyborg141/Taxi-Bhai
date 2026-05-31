import { Helmet } from "react-helmet-async";
import usePublicUrl from "../Hooks/usePublicUrl";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";

const Ride = () => {
    const publicApi_url = usePublicUrl()
    const {user} = useContext(TaxiContextManagement)
    const { isLoading, isError, error, data: serviceReqs = [], refetch } = useQuery({
        queryKey: ['serviceReqs'],
        queryFn: async () => {
            try {
                const res = await publicApi_url.get("/showService");
                console.log(res);
                return res.data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });
    const currentDate= new Date()

    const BookRide = (driverEmail,driverName,route,photo,amount,ownerEmail,brta)=>{
        const RideData = {driverEmail,driverName,route,photo,isdriverAccepted:"pending", ispassengerBooked:"booked",passengerEmail: user?.email,amount,passengerName:user?.displayName,passengerPhoto:user?.photoURL,ownerEmail,brta,currentDate}

        publicApi_url.post("/ride", RideData)
        .then((res) => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Riding Request is sent to the Driver . Wait for the Driver Response!",
                    showConfirmButton: true,
                    
                });
            }
        })

        .catch((error) => {
            console.log(error);
        })


    }


    if (isLoading) {
        return <span className="loading loading-spinner text-warning w-[500px] ml-[500px]"></span>;
    }

    if (isError) {
        return <span className="ml-[300px] text-red-700 text-4xl">Error : {error.message}</span>;
    }


    return (
        <div>
            <Helmet>
                <title>Ride</title>
            </Helmet>
            <div>
                <h2 className="text-center mt-36 text-4xl font-bold mb-8 text-yellow-400">Choose a Ride </h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {
                    serviceReqs.map(rides => 
                       
                    <div key={rides._id} className="card w-96 bg-slate-50 shadow-xl">
                        <figure className="px-10 pt-10 h-48">
                            <img width={120} height={120} src={rides.photo} className="rounded-xl object-cover" alt="Ride Photo" />
                        </figure>
                        <div className="card-body items-center text-center">
                            {/* show driver image and ownerEmail in a row */}
                            <div className="flex items-center justify-center gap-4 border-b-4 border-yellow-400">
                                {/* show driverImage and driverEmail in  a row*/}
                                <div className="flex items-center justify-center">
                                    <img width={50} height={50} className="rounded-full" src={rides.driverPhoto}></img>
                                    <h2 className="font-semibold">{rides.driverName}</h2>
                                </div>

                                <h2 className=""> Owner: {rides.email}</h2>
                            </div>

                            <div className="">
                                <h2 className="font-medium">Route : {rides.route}</h2>
                                <h2 className="font-medium">Fare : {rides.fareRate} BDT</h2>
                                <h2 className="font-medium">BRTA : {rides.brta}</h2>
                            </div>

                            <div className="mt-4">
                                
                                <button onClick={()=>BookRide(rides.driverEmail,rides.driverName,rides.route,rides.photo,rides.fareRate,rides.email,rides.brta)} className="btn w-80  bg-yellow-500 hover:bg-yellow-600 text-base">Book & Ride</button>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default Ride;