
import { useContext } from "react";
import { TaxiContextManagement } from "../Context/TaxiContext";
import usePublicUrl from "./usePublicUrl";
import { useQuery } from "@tanstack/react-query";

const UseAdmin = () => {
    const { user,loader } = useContext(TaxiContextManagement)
    const publicApi = usePublicUrl()
    const { data: isadmin, isPending: isadminPending } = useQuery({
        queryKey: [user?.email, "isadmin"],
        enabled: !loader,
        queryFn: async () => {
            const res = await publicApi.get(`/user/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin


        }
    })
    return [isadmin, isadminPending]


};

export default UseAdmin;