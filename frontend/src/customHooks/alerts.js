import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const useSuccess = () => {
    return (message) => {
        toast.success(message, {
            theme: 'dark',
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
        })
    }
}

export const useError = () => {
    return (message) => {
        toast.error(message, {
            theme: 'dark',
            position: toast.POSITION.BOTTOM_CENTER,
        })
    }
}