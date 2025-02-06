import {useMutation} from "@tanstack/react-query";
import {joinQueue} from "@/utils/request/joinQueue";
import {ToastMessage} from "@/utils/ToastMessage";

export const useDriverEnqueueMutation = () => {
    const mutation = useMutation({
        mutationFn: joinQueue,
        onSuccess: (data) => {
            ToastMessage({message: 'joined queue successfully', type: 'success'})
        },
        onError: (e: any) => {
            console.log(e.response.data.title, "error");
            ToastMessage({message: e.response.data.detail, type: 'danger'})
        }
    })
    return mutation;
}