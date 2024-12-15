import { AxiosError } from "axios";

export const handleApiError = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw "An unexpected error occured";
  }
};
