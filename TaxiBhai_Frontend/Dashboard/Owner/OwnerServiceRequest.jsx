import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';



import { useContext } from 'react';
import { TaxiContextManagement } from "../../Context/TaxiContext";
import usePublicUrl from "../../Hooks/usePublicUrl";
import Swal from "sweetalert2";
import UseOwner from "../../Hooks/UseOwner";

const OwnerServiceRequest = () => {
    const { user } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const [isowner] = UseOwner()



    const formik = useFormik({
        initialValues: {

            busineesName: "",
            transportType: "",
            route: "",
            distance: "",
            fareRate: "",
            brta: "",
            photo:""



        },
        validate: values => {
            const errors = {};
            if (!values.busineesName) {
                errors.busineesName = 'Required Business Name';
            }
            if (!values.transportType) {
                errors.transportType = 'Required Transport Type';
            }
            if (!values.route) {
                errors.route = 'Required Route';
            }

            if (!values.fareRate) {
                errors.fareRate = 'Required FareRate';
            }
            if (!values.brta) {
                errors.brta = 'Required licence';
            }
            if (!values.photo) {
                errors.photo = 'Required Photo';
            }


            return errors

        },
        onSubmit: values => {
            // service information is taken from the form by object
            // in addition, a status is is also sent associated with form information.

            const ServiceInformation = { email: user?.email, busineesName: values.busineesName, transportType: values.transportType, route: values.route, fareRate: values.fareRate, brta: values.brta,photo:values.photo, status: "Pending" }
            publicApi.post("/owner/serviceRequest", ServiceInformation)
                .then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your Service Request has been sent to the Admin Panel!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

                .catch((error) => {
                    console.log(error);
                })

            console.log(values);

        }
    })
    return (
        <div>
            <Helmet>
                <title>Apply</title>

            </Helmet>
            {


                isowner &&  <div className=" min-h-screen  ml-[420px] w-full  ">
                    <div className=" flex-col ">
                        <div className="text-center flex items-center justify-center lg:text-left">
                            <h1 className="text-5xl text-yellow-500  text-center font-bold p-8">Taxi Service Request</h1>


                        </div>
                        <div className="card w-full mx-auto  shadow-2xl ">
                            <form onSubmit={formik.handleSubmit} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Business Name</span>
                                    </label>
                                    <input type="text" id="busineesName" name="busineesName" placeholder="Business Name" onChange={formik.handleChange}
                                        value={formik.values.busineesName} className="input input-bordered" required />
                                    {formik.touched.busineesName && formik.errors.busineesName && <p className='text-red-500'>{formik.errors.busineesName}</p>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Transport Type</span>
                                    </label>
                                    <input type="text" id="transportType" name="transportType" placeholder="Transport Type" onChange={formik.handleChange}
                                        value={formik.values.transportType} className="input input-bordered" required />
                                    {formik.touched.transportType && formik.errors.transportType && <p className='text-red-500'>{formik.errors.transportType}</p>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Route</span>
                                    </label>
                                    <input type="text" id="route" name="route" placeholder="Route" onChange={formik.handleChange}
                                        value={formik.values.route} className="input input-bordered" required />
                                    {formik.touched.route && formik.errors.route && <p className='text-red-500'>{formik.errors.route}</p>}

                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Fare Rate</span>
                                    </label>
                                    <input type="number" id="fareRate" name="fareRate" placeholder="fareRate" onChange={formik.handleChange}
                                        value={formik.values.fareRate} className="input input-bordered" required />
                                    {formik.touched.fareRate && formik.errors.fareRate && <p className='text-red-500'>{formik.errors.fareRate}</p>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Vehicle Photo</span>
                                    </label>
                                    <input type="url" id="photo" name="photo" placeholder="Vehicle Photo" onChange={formik.handleChange}
                                        value={formik.values.photo} className="input input-bordered" required />
                                    {formik.touched.photo && formik.errors.photo && <p className='text-red-500'>{formik.errors.photo}</p>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">BRTA Licence Number</span>
                                    </label>
                                    <input type="text" id="brta" name="brta" placeholder="Licence Number" onChange={formik.handleChange}
                                        value={formik.values.brta} className="input input-bordered" required />
                                    {formik.touched.brta && formik.errors.brta && <p className='text-red-500'>{formik.errors.brta}</p>}

                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn bg-yellow-700 text-2xl font-semibold text-white hover:bg-yellow-800 btn-primary">Submit to Admin Panel</button>
                                </div>

                                <div className="flex flex-col w-full">
                                    <div className="divider divider-start"></div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default OwnerServiceRequest;