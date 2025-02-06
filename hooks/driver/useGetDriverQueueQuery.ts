import {useQuery} from "@tanstack/react-query";
import {getDriverQueueWithDriverId, getDriverQueueWithDriverIdQuery} from "@/utils/request/getDriverQueueWithDriverId";

export const useGetDriverQueueQuery = (query: getDriverQueueWithDriverIdQuery) => {
    const queryRes = useQuery({
        queryKey: ['driverQueue'],
        queryFn: () => getDriverQueueWithDriverId(query)
        
    })
    
    return queryRes;
}