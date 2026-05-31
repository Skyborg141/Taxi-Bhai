import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Error from "../Error/Error";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import OwnerServiceRequest from "../Dashboard/Owner/OwnerServiceRequest";
import AssignDrivers from "../Dashboard/Owner/AssignDrivers";
import AdminServiceRequest from "../Dashboard/Admin/AdminServiceRequest";
import ServiceStatus from "../Dashboard/Owner/ServiceStatus";
import DrivingRequest from "../Dashboard/Driver/DrivingRequest";
import AdminDrivingRequest from "../Dashboard/Admin/AdminDrivingRequest";
import DrivingStatus from "../Dashboard/Driver/DrivingStatus";
import UpdateVehicleStatus from "../Dashboard/Driver/UpdateVehicleStatus";
import Ride from "../Ride/Ride";
import PassengerRide from "../Dashboard/Passenger/PassengerRide";
import Payment from "../Dashboard/Passenger/Payment";
import DriverRide from "../Dashboard/Driver/DriverRide";
import DriverPayment from "../Dashboard/Driver/DriverPayment";
import UpdateVehicleForm from "../Dashboard/Driver/UpdateVehicleForm";
import VehicleStatusFromDriver from "../Dashboard/Owner/VehicleStatusFromDriver";







const Router = createBrowserRouter([
    {
        path: "/",
        errorElement:<Error></Error>,
        element: <App></App>,
        children:[
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/reg",
                element:<Registration></Registration>
            },
            {
                path:"/ride",
                element:<PrivateRoutes><Ride></Ride></PrivateRoutes>
            }

        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children:[
            {
                path:"/dashboard/owner/businessReq",
                element:<OwnerServiceRequest></OwnerServiceRequest>
            },
            {
                path:"/dashboard/owner/assignDrivers",
                element:<AssignDrivers></AssignDrivers>
            },
            {
                path:"/dashboard/owner/serviceStatus",
                element:<ServiceStatus></ServiceStatus>
            },
            {
                path:"/dashboard/owner/vehicleStatus",
                element:<VehicleStatusFromDriver></VehicleStatusFromDriver>
            },
            {
                path:"/dashboard/admin/serviceReq",
                element:<AdminServiceRequest></AdminServiceRequest>
            },
            {
                path:"/dashboard/admin/driverReq",
                element:<AdminDrivingRequest></AdminDrivingRequest>
            },
            {
                path:"/dashboard/driver/drivingReq",
                element:<DrivingRequest></DrivingRequest>
            },
            {
                path:"/dashboard/driver/drivingStatus",
                element:<DrivingStatus></DrivingStatus>
            },
            {
                path:"/dashboard/driver/UpdateVehicleStatus",
                element:<UpdateVehicleStatus></UpdateVehicleStatus>
            },
            {
                path:"/dashboard/passenger/ride",
                element:<PassengerRide></PassengerRide>
            },
            {
                path:"/dashboard/passenger/payment/:id/:amount/:driverEmail/:ownerEmail",
                element:<Payment></Payment>
            },
            {
                path:"/dashboard/driver/ride",
                element:<DriverRide></DriverRide>
            },
            {
                path:"/dashboard/driver/payment",
                element:<DriverPayment></DriverPayment>
            },
            {
                path:"/dashboard/updateVehicle/:route/:photo/:amount/:ownerEmail",
                element:<UpdateVehicleForm></UpdateVehicleForm>
            }
        ]
    }
]);

export default Router;
