import {Toast} from "react-native-toast-notifications";

type ToastMessageProp = {
    message: string,
    type: 'normal' | 'success' | 'warning' | 'danger' | 'custom'
}

let isToastVisble = false;

export const ToastMessage = ({ message, type }: ToastMessageProp) => {
    if (message && !isToastVisble) {
        Toast.show(message, {
            type: type,
            placement: 'top',
            duration: 4000,
            animationType: 'zoom-in'
        })
    }
}