import { useFormik } from 'formik';
import { MdOutlineLogin } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useContext, useState } from 'react';
import { TaxiContextManagement } from '../Context/TaxiContext';


const Login = () => {
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"
    const navigate = useNavigate()

    const [showPassword, setShowpassword] = useState(false)
    const [error,setError] = useState("")
    const {signIn,googleSignIn} = useContext(TaxiContextManagement)
    const continueWithGoogle =()=>{
        return googleSignIn()
        .then((result)=>{
            console.log("googleSignIn",result.user);
            navigate(from, { replace: true });
        })
        .catch((error)=>{
            console.log("Error_googleSignIn",error.message);
            setError(error.message)
        })
    }
    const formik = useFormik({
        initialValues: {

            email: "",
            password: "",



        },
        validate: values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required Email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
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
            setError("")
            signIn(values.email,values.password)
            .then((userCredintial)=>{
                console.log(userCredintial.user);
                navigate(from, { replace: true });
                
            })
            .catch((error)=>{
                setError(error.message)
                console.log(error.message);
            })
            console.log(values);

        }
    })
    return (
        <div>
            <Helmet>
                <title>Login</title>

            </Helmet>
            <div className=" min-h-screen  mt-44 md:mt-32 lg:mt-36 ">
                <div className=" flex-col ">
                    <div className="text-center flex items-center justify-center lg:text-left">
                        <h1 className="text-5xl text-yellow-400  text-center font-bold p-8">Login</h1>
                        {/* for icon of login */}
                        <MdOutlineLogin className="text-5xl text-yellow-400"></MdOutlineLogin>

                    </div>
                    <div className="card w-1/2 mx-auto  shadow-2xl ">
                        {/* use Formik package for form handle */}
                        <form onSubmit={formik.handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-bold">Email</span>
                                </label>
                                <input type="email" id="email" name="email" placeholder="email" onChange={formik.handleChange}
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
                                    <p className='btn text-yellow-600  bg-slate-300 text-lg w-1/3' onClick={() => setShowpassword(!showPassword)}>{showPassword ? "Hidden Password" : "Show Password"}</p>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text text-lg text-blue-600  font-bold link link-hover">Forgot password?</a>
                                </label>
                                {error && <p className='text-red-600'>{error}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-yellow-400 text-2xl font-semibold text-white hover:bg-yellow-700 btn-primary">Login</button>
                            </div>
                            <p className="mt-6 text-center font-semibold"> or, Continue with </p>
                            <div className=" flex items-center justify-center mt-6">
                                {/* for google sign in with google Account  */}
                                <button onClick={continueWithGoogle} className="text-3xl flex items-center justify-center"><FcGoogle></FcGoogle></button>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="divider divider-start"></div>

                            </div>
                            <div className="flex gap-8 flex-col md:flex-row lg:flex-row  mt-4">
                                <p className="text-xl text-red-500">Do not have an account ? </p>
                                <Link to="/reg"><button className="text-xl bg-black text-white p-2 rounded-md">Regsiter</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;