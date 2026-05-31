
import { useContext } from "react";
import usePublicUrl from "./usePublicUrl";
import { useQuery } from "@tanstack/react-query";
import { TaxiContextManagement } from "../Context/TaxiContext";

const UseDriver = () => {
    const { user,loader } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const { data: isdriver, isPending: isdriverPending } = useQuery({
        queryKey: [user?.email, "isdriver"],
        enabled: !loader,
        queryFn: async () => {
            const res = await publicApi.get(`/user/driver/${user.email}`);
            console.log(res.data);
            return res.data?.driver


        }
    })
    return [isdriver, isdriverPending]


};

export default UseDriver;