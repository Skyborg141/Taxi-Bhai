import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = ({children}) => {
    const{user,loader} = useContext(TaxiContextManagement)
    const location = useLocation()

    // if loader is true, that means necessary info is not at our hand right now, so we have to wait. In this waiting time, we should show some loading icon to the user.
    if(loader){
    return  <span className="loading loading-spinner text-warning w-[500px] ml-48"></span>
    }

    // if user is present in the system, we allow the user to go their requested page 
    if(user){
        return children //through children, it can go anywhere of the component
    }

    // otherwise we return the user to the login page for signin in  the system. 
    return <Navigate to ="/login" state={{from:location}} replace></Navigate>
    
};

export default PrivateRoutes;