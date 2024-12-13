import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance = axios.create({});

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const apiConnector = async <T>(
  method: HttpMethod,
  url: string,
  bodyData?: any,
  headers?: Record<string, string>,
  params?: Record<string, string | number | boolean>
): Promise<AxiosResponse<T>> => {
  // Define the Axios request configuration
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? undefined,
    params: params ?? undefined,
  };

  // Execute the request
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response;
  } catch (error) {
    // Handle errors (e.g., log or rethrow)
    throw error;
  }
};
