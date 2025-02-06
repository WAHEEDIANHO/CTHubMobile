import {useQuery} from "@tanstack/react-query";
import {getStops} from "@/utils/request/getStops";
import {getSchedule} from "@/utils/request/schedule";

export const useScheduleQuery = () => {
    const query = useQuery({
        queryKey: ['schedules'],
        queryFn: getSchedule,
    });

    return query;
}