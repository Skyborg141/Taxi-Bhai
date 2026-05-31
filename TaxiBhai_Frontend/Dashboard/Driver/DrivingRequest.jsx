import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import { useContext } from 'react';
import { TaxiContextManagement } from "../../Context/TaxiContext";
import usePublicUrl from "../../Hooks/usePublicUrl";
import Swal from "sweetalert2";
import UseDriver from "../../Hooks/UseDriver";

const DrivingRequest = () => {
    const { user } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const [isdriver] = UseDriver()
    



    const formik = useFormik({
        initialValues: {

            ownerEmail: "",
            nid: "",
            licence: "",




        },
        validate: values => {
            const errors = {};
            if (!values.ownerEmail) {
                errors.ownerEmail = 'Required ownerEmail';
            }
            if (!values.nid) {
                errors.nid = 'Required NID';
            }
            if (!values.licence) {
                errors.licence = 'Required Licence';
            }

            return errors

        },
        onSubmit: values => {
            

            const DrivingRequestInformation = { name:user?.displayName, email: user?.email, photo:user?.photoURL, ownerEmail:values.ownerEmail,NID:values.nid,Licence:values.licence,status: "Pending",assignedVehicle:"None" }
            publicApi.post("/driver/drivingReq", DrivingRequestInformation)
                .then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your Driving Request has been sent to the Admin Panel!",
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


                isdriver && <div className=" min-h-screen  ml-[420px] w-full  ">
                    <div className=" flex-col ">
                        <div className="text-center flex items-center justify-center lg:text-left">
                            <h1 className="text-5xl text-yellow-500  text-center font-bold p-8">Driving Request</h1>


                        </div>
                        <div className="card w-full mx-auto  shadow-2xl ">
                            <form onSubmit={formik.handleSubmit} className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Owner's Email</span>
                                    </label>
                                    <input type="email" id="ownerEmail" name="ownerEmail" placeholder="Owner Email " onChange={formik.handleChange}
                                        value={formik.values.ownerEmail} className="input input-bordered" required />
                                    {formik.touched.ownerEmail && formik.errors.ownerEmail && <p className='text-red-500'>{formik.errors.ownerEmail}</p>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">NID Number</span>
                                    </label>
                                    <input type="number" id="nid" name="nid" placeholder="Licence Number" onChange={formik.handleChange}
                                        value={formik.values.nid} className="input input-bordered" required />
                                    {formik.touched.nid && formik.errors.nid && <p className='text-red-500'>{formik.errors.nid}</p>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-bold">Driving Licence Number</span>
                                    </label>
                                    <input type="number" id="licence" name="licence" placeholder="Licence Number" onChange={formik.handleChange}
                                        value={formik.values.licence} className="input input-bordered" required />
                                    {formik.touched.licence && formik.errors.licence && <p className='text-red-500'>{formik.errors.licence}</p>}

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

export default DrivingRequest;