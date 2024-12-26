
import { apiConnector } from "../axiosInstance";
import { signin_url } from "../api";

type UserData = {
    name: string;
    email: string;
    password: string;
};

type ApiResponse = {
    success: boolean;
    message: string;
};

export const signinapi =(data : UserData, ) : boolean =>{
    try {
        const response = apiConnector<ApiResponse>("POST",signin_url,data)
        console.log(response)
        return true
    } catch (error) {
        console.log(error)
    }
    return false
}