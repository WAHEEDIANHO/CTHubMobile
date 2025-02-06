import {useQuery} from "@tanstack/react-query";
import {getUserSchedule, GetUserScheduleQuery} from "@/utils/request/getUserSchedule";

export const useGetUserSchedule = (query: GetUserScheduleQuery ) => {
    const manageQuery = useQuery({
        queryKey: ["userSchedule", query],
        queryFn: () => getUserSchedule(query),      
    })
    
    return manageQuery;
}