interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export const createApiResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
  meta?: ApiResponse<T>["meta"]
): ApiResponse<T> => ({
  success,
  message,
  ...(data && { data }),
  ...(meta && { meta }),
});
