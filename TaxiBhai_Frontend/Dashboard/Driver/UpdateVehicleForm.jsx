import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import usePublicUrl from "../../Hooks/usePublicUrl";
import Swal from "sweetalert2";
import { TaxiContextManagement } from "../../Context/TaxiContext";
import UseDriver from "../../Hooks/UseDriver";


const UpdateVehicleForm = () => {
    const [error, setError] = useState("")
    const publicApi_url = usePublicUrl()
    const [isdriver] = UseDriver()

    const { user } = useContext(TaxiContextManagement)
    const { amount } = useParams()
    const { route } = useParams()
    const { ownerEmail } = useParams()
    const { photo } = useParams()
    const currentDateTime = new Date()

    const formik = useFormik({
        initialValues: {


            passengerCount: "",
            fuel: "",
            transactionId: ""



        },
        validate: values => {
            const errors = {};

            if (!values.transactionId) {
                errors.transactionId = 'Required';
            }
            if (!values.passengerCount) {
                errors.passengerCount = 'Required';
            }
            if (!values.fuel) {
                errors.fuel = 'Required';
            }

            return errors

        },
        onSubmit: values => {
            setError("")
            const VehicleStatus = { TransactionId: values.transactionId, PassengerCount: values.passengerCount, PayableAmount: amount, driverEmail: user?.email, ownerEmail: ownerEmail, currentDateTime, fuel: values.fuel, Route: route, vehiclePhoto: photo }
            publicApi_url.post("/driver/vehicleStatus", VehicleStatus)
                .then((res) => {
                    console.log(res);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Updated Vehicle Status",
                            showConfirmButton: true,

                        });
                    }
                })

                .catch((error) => {
                    console.log(error);
                })


            console.log("vehicleStatus", values);

        }
    })
    return (


        <div>
            <Helmet>
                <title>Update_Vehicle</title>
            </Helmet>
            {
                isdriver &&


                <div className=" min-h-screen  mt-44 md:mt-32 lg:mt-36 ml-[600px] ">
                    <div className=" flex-col ">
                        <div className="text-center flex items-center justify-center lg:text-left">
                            <h1 className="text-5xl text-yellow-400  text-center font-bold p-8">Update Vehicle Form</h1>


                        </div>
                        <div className=" w-full mx-auto  shadow-2xl ">
                            {/* use Formik package for form handle */}
                            <form onSubmit={formik.handleSubmit} className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">TransactionId</span>
                                    </label>
                                    <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                                        <input type="text" id="transactionId" name="transactionId" placeholder="transactionId" onChange={formik.handleChange}
                                            value={formik.values.transactionId} className="  w-3/4 input input-bordered" required />

                                        {formik.touched.transactionId && formik.errors.transactionId && <p className='text-red-500'>{formik.errors.transactionId}</p>}

                                    </div>

                                    {error && <p className='text-red-600'>{error}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Fuel</span>
                                    </label>
                                    <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                                        <input type="number" id="fuel" name="fuel" placeholder="fuel" onChange={formik.handleChange}
                                            value={formik.values.fuel} className="  w-3/4 input input-bordered" required />

                                        {formik.touched.fuel && formik.errors.fuel && <p className='text-red-500'>{formik.errors.fuel}</p>}

                                    </div>

                                    {error && <p className='text-red-600'>{error}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">passengerCount</span>
                                    </label>
                                    <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                                        <input type="number" id="passengerCount" name="passengerCount" placeholder="passengerCount" onChange={formik.handleChange}
                                            value={formik.values.passengerCount} className="  w-3/4 input input-bordered" required />

                                        {formik.touched.passengerCount && formik.errors.passengerCount && <p className='text-red-500'>{formik.errors.passengerCount}</p>}

                                    </div>

                                    {error && <p className='text-red-600'>{error}</p>}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-yellow-400 text-2xl font-semibold text-white hover:bg-yellow-700 btn-primary">Update Status</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
};

export default UpdateVehicleForm;