import { apiConnector } from "../axiosInstance";
import { form_create_url } from "../api";
import { useSelector, UseSelector } from "react-redux";

export type FormData = {
    title: string;
    message: string; 
};

export type ApiResponse = {
    success: boolean;
    message: string;
    form: {
        title: string;
        description?: string;
        user: {
            userId: number;
            name: string;
            email: string;
            passwordHash: string;
            createdAt: string;
            updatedAt: string;
        };
        formId: number;
        createdAt: string;
        updatedAt: string;
    };
};

export const createFormApi = async (formData: FormData,token: string|null): Promise<ApiResponse> => {
    try {
        const response = await apiConnector<ApiResponse>(
            "POST", 
            form_create_url,
            formData,
            { Authorization: `Bearer ${token}` }
        );

        
        return response.data;
    } catch (error: any) {
        console.error("Error creating form:", error);
        throw error.response?.data || { success: false, message: "Unknown error occurred" };
    }
};
