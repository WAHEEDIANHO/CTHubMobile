import {useQuery} from "@tanstack/react-query";
import {getStops} from "@/utils/request/getStops";

export const useStopsQuery = () => {
    const query = useQuery({
        queryKey: ['stops'],
        queryFn: getStops,
    });
    
    return query;
}