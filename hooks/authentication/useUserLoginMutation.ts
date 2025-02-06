import {useMutation} from "@tanstack/react-query";
import {login} from "@/utils/request/login";
import {ToastMessage} from "@/utils/ToastMessage";

export const  useUserLoginMutation  = () => {
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            ToastMessage({message: 'login successfully', type: 'success'})
        },
        onError: (e: any) => {
            console.log(e);
            ToastMessage({message: 'Error  occured', type: 'danger'})
        }
    })
    
    return mutation;
}