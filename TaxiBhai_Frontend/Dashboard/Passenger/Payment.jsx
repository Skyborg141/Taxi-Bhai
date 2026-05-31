import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import usePublicUrl from "../../Hooks/usePublicUrl";
import Swal from "sweetalert2";


const Payment = () => {
    const [error,setError] = useState("")
    const publicApi_url = usePublicUrl()
    const {id} = useParams()
   
    const {amount} = useParams()
    const {driverEmail} = useParams()
    const {ownerEmail} = useParams()
    const currentDateTime = new Date()
 
    const formik = useFormik({
        initialValues: {

            
            transactionId: "",



        },
        validate: values => {
            const errors = {};
            
            if (!values.transactionId) {
                errors.transactionId = 'Required';
            } 
            return errors

        },
        onSubmit: values => {
            setError("")
            const paymentInfo = { TransactionId: values.transactionId,rideId:id,PayableAmount:amount,driverEmail:driverEmail,ownerEmail:ownerEmail,currentDateTime}
            publicApi_url.post("/passenger/makePayment",paymentInfo)
            .then((res) => {
                console.log(res);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment Done",
                        showConfirmButton: true,
                        
                    });
                }
            })
    
            .catch((error) => {
                console.log(error);
            })
           
            
            console.log("paymentValues",values);

        }
    })
    return (
        <div>
            <Helmet>
                <title>Payment</title>
            </Helmet>

            <div className=" min-h-screen  mt-44 md:mt-32 lg:mt-36 ml-[600px] ">
                <div className=" flex-col ">
                    <div className="text-center flex items-center justify-center lg:text-left">
                        <h1 className="text-5xl text-yellow-400  text-center font-bold p-8">Payment</h1>
                       

                    </div>
                    <div className=" w-full mx-auto  shadow-2xl ">
                        {/* use Formik package for form handle */}
                        <form onSubmit={formik.handleSubmit} className="card-body">
                           
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">transactionId</span>
                                </label>
                                <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                                    <input type="text" id="transactionId" name="transactionId" placeholder="transactionId" onChange={formik.handleChange}
                                        value={formik.values.transactionId} className="  w-3/4 input input-bordered" required />

                                    {formik.touched.transactionId && formik.errors.transactionId && <p className='text-red-500'>{formik.errors.transactionId}</p>}
                                    
                                </div>
                                
                                {error && <p className='text-red-600'>{error}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-yellow-400 text-2xl font-semibold text-white hover:bg-yellow-700 btn-primary">Make Payment</button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;