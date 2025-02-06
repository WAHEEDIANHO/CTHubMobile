import {useMutation} from "@tanstack/react-query";
import {bookRide} from "@/utils/request/bookRide";
import {ToastMessage} from "@/utils/ToastMessage";

export const useBookRideMutation = () => {
    const mutation = useMutation({
        mutationFn: bookRide,
        onSuccess: (data) => {
            ToastMessage({message: 'Booking successful', type: 'success'})
        },
        onError: (e: any) => {
            console.log(e.response.data.title, "error");
            ToastMessage({message: e.response.data.detail, type: 'danger'})
        }
    })
    
    return mutation;
}