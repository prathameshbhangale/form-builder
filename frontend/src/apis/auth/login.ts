import { apiConnector } from "../axiosInstance";
import { login_url } from "../api";

type UserData = {
    email: string;
    password: string;
};

type ApiResponse = {
    success: boolean;
    message: string | null | undefined;
    token: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    userId: number | null 
};

export const loginApi = async (data: UserData): Promise<ApiResponse | null> => {
    try {
        const response = await apiConnector<ApiResponse>("POST", login_url, data);
        console.log(response);
        if (response.data.success) {
            return response.data;  // Return the response data
        }
    } catch (error) {
        console.log(error);
    }
    return null;
};
