
import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";
import usePublicUrl from "./usePublicUrl";
import { useQuery } from "@tanstack/react-query";

const UsePassenger = () => {
    const { user,loader } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const { data: ispassenger, isPending: ispassengerPending } = useQuery({
        queryKey: [user?.email, "ispassenger"],
        enabled: !loader,
        queryFn: async () => {
            const res = await publicApi.get(`/user/passenger/${user.email}`);
            console.log(res.data);
            return res.data?.passenger


        }
    })
    return [ispassenger, ispassengerPending]


};

export default UsePassenger;