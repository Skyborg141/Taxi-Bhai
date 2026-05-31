
import { Link } from "react-router-dom";
import error from "../../public/Error/istockphoto-1323622820-1024x1024.jpg"
const Error = () => {
    return (
        <div className="flex mt-8 justify-center items-center space-y-4">
            <div className="">
            <img  width={300} src={error}></img>
            <Link to ="/">
                <button className="btn mt-8  bg-gradient-to-r from-yellow-500 to-orange-400">Go To HomePage</button>
            </Link>
            </div>
         
        </div>
    );
};

export default Error;