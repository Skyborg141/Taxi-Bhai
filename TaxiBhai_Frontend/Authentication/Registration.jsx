
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

import usePublicUrl from '../Hooks/usePublicUrl';
import Swal from 'sweetalert2';
import { TaxiContextManagement } from '../Context/TaxiContext';



const Registration = () => {
    const [showPassword, setShowpassword] = useState(false)
    const [error, setError] = useState(false)
    const { createUser, updateUser, logOut } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "",
            phonenumber: "",
            location: "",
            photo: "",


        },
        validate: values => {
            const errors = {}
            if (!values.name) {
                errors.name = 'Required Name';
            }

            if (!values.email) {
                errors.email = 'Required Email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.role) {
                errors.role = 'Required role';
            }
            if (!values.phonenumber) {
                errors.phonenumber = 'Required Phone Number';
            }
            if (!values.location) {
                errors.location = 'Required Location';
            }
            if (!values.photo) {
                errors.location = 'Required PhotoLink';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/.test(values.password)
            ) {
                errors.password =
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
            } else if (values.password.length < 6) {
                errors.password = 'Password should be at least 6 characters';
            }
            return errors
        },

        onSubmit: values => {
            console.log(values);
            setError("")
            createUser(values.email, values.password)
                .then((userCredential) => {
                    console.log(userCredential.user);

                    updateUser(values.name, values.photo)
                        // const user = {name: values.name}
                        .then(() => {
                            console.log("profile updated");
                            const user = { name: values.name, email: values.email, role: values.role, phonenumber: values.phonenumber,  location: values.location, photo: values.photo }

                            publicApi.post("/registerUser", user)
                                .then((res) => {
                                    console.log(res)
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            title: "Registration complete",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });

                                    }
                                })
                                .catch((error) => console.log(error))
                            return logOut()


                        })
                        .catch((error) => {
                            setError(error.message)
                            console.log(error.message);
                        })
                })
                .catch((error) => {
                    setError(error.message)
                    console.error(error.message)
                })

        }
    })
    return (
        <div>
            <Helmet>
                <title>Registration</title>

            </Helmet>
            <div className=" min-h-screen  mt-44 md:mt-32 lg:mt-36 ">
                <div className=" flex-col ">
                    <div className="text-center flex items-center justify-center lg:text-left">
                        <h1 className="text-5xl text-yellow-600  text-center font-bold p-8">Registartion</h1>


                    </div>
                    <div className="card w-1/2 mx-auto  shadow-2xl ">

                        <form onSubmit={formik.handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Name</span>
                                </label>
                                <input type="text" id="name" name="name" placeholder="Name" onChange={formik.handleChange}
                                    value={formik.values.name} onBlur={formik.handleBlur} className="input input-bordered" required />
                                {formik.touched.name && formik.errors.name && <p className='text-red-500'>{formik.errors.name}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Email</span>
                                </label>
                                <input type='email' id="email" name="email" placeholder="email" onChange={formik.handleChange}
                                    value={formik.values.email} className="input input-bordered" required />
                                {formik.touched.email && formik.errors.email && <p className='text-red-500'>{formik.errors.email}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Password</span>
                                </label>
                                <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="password" onChange={formik.handleChange}
                                        value={formik.values.password} className="  w-3/4 input input-bordered" required />

                                    {formik.touched.password && formik.errors.password && <p className='text-red-500'>{formik.errors.password}</p>}
                                    <p className='btn text-yellow-600 text-lg w-1/3' onClick={() => setShowpassword(!showPassword)}>{showPassword ? "Hidden Password" : "Show Password"}</p>

                                </div>
                                <p className='text-gray-800 text-wrap'>Your password length should be atleast 6 including uppercase letter,lowercase letter, number,special symbol.</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">role</span>
                                </label>
                                <input type="text" id="role" name='role' placeholder="role" onChange={formik.handleChange}
                                    value={formik.values.role} className="input input-bordered" required />
                                {formik.touched.role && formik.errors.role && <p className='text-red-500'>{formik.errors.role}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Phone</span>
                                </label>
                                <input type="tel" id="phonenumber" name='phonenumber' placeholder="Phone Number (start +88)" onChange={formik.handleChange}
                                    value={formik.values.phonenumber} className="input input-bordered" required />
                                {formik.touched.phonenumber && formik.errors.phonenumber && <p className='text-red-500'>{formik.errors.phonenumber}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Your Photo Link</span>
                                </label>
                                <input type="url" id="photo" name='photo' placeholder="Host your image and paste here the link" onChange={formik.handleChange}
                                    value={formik.values.photo} className="input input-bordered" required />
                                {formik.touched.photo && formik.errors.photo && <p className='text-red-500'>{formik.errors.photo}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Your Location</span>
                                </label>
                                <input type="text" id="location" name='location' placeholder="Type your District Name, Example: Dhaka" onChange={formik.handleChange}
                                    value={formik.values.location} className="input input-bordered" required />
                                {formik.touched.location && formik.errors.location && <p className='text-red-500'>{formik.errors.location}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn bg-yellow-700 text-2xl font-semibold text-white hover:bg-yellow-800 btn-primary">Register</button>
                            </div>
                            {
                                error && <p className='text-red-700'>{error}</p>
                            }

                            <div className="flex flex-col w-full">
                                <div className="divider divider-start"></div>

                            </div>
                            <div className="flex gap-8 flex-col md:flex-row lg:flex-row  mt-4">
                                <p className="text-xl text-green-700 font-bold">Already have an account ? </p>
                                <Link to="/login"><button className="text-xl bg-black text-white p-2 rounded-md">Login</button></Link>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;



