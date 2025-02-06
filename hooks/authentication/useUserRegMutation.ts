import {useMutation} from "@tanstack/react-query";
import {ToastMessage} from "@/utils/ToastMessage";
import {register} from "@/utils/request/register";


export const useUserRegMutation = () => {
    const mutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            ToastMessage({message: 'Registration successful', type: 'success'})
        },
        onError: (e: any) => {
            console.log(e.response.data.title, "error");
            ToastMessage({message: e.response.data.detail, type: 'danger'})
        }
    })
    
    return mutation;
}