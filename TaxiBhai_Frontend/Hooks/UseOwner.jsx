import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";
import usePublicUrl from "./usePublicUrl";
import { useQuery } from "@tanstack/react-query";

const UseOwner = () => {
    const { user,loader } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const { data: isowner, isPending: isownerPending } = useQuery({
        queryKey: [user?.email, "isowner"],
        enabled: !loader,
        queryFn: async () => {
            const res = await publicApi.get(`/user/owner/${user.email}`);
            console.log(res.data);
            return res.data?.owner


        }
    })
    return [isowner, isownerPending]


};

export default UseOwner;