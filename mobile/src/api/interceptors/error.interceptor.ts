// src/api/interceptors/error.interceptor.ts
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { ERROR_MESSAGES } from "../../constants/messages";

/**
 * Error Interceptor
 *
 * Handles HTTP errors globally and provides user-friendly messages
 */

export const handleApiError = (error: AxiosError): string => {
  console.error("🔴 API Error:", {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    message: error.message,
  });

  // Network errors (no response)
  if (!error.response) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // HTTP status errors
  const status = error.response.status;

  switch (status) {
    case 0:
      return ERROR_MESSAGES.NETWORK_ERROR;

    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;

    case 403:
      return ERROR_MESSAGES.FORBIDDEN;

    case 404:
      return ERROR_MESSAGES.NOT_FOUND;

    case 409:
      return "Conflito de dados. Verifique as informações.";

    case 422:
      return ERROR_MESSAGES.VALIDATION_ERROR;

    case 500:
      return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

    case 502:
    case 503:
      return "Servidor temporariamente indisponível. Tente novamente.";

    case 504:
      return "Tempo de resposta esgotado. Verifique sua conexão.";

    default:
      // Try to get error message from response
      const responseData: any = error.response.data;
      return responseData?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

/**
 * Show error alert to user
 */
export const showErrorAlert = (
  error: AxiosError,
  customTitle?: string,
): void => {
  const message = handleApiError(error);

  Alert.alert(
    customTitle || "Erro",
    message,
    [{ text: "OK", style: "default" }],
    { cancelable: true },
  );
};

/**
 * Get validation errors from response
 */
export const getValidationErrors = (
  error: AxiosError,
): Record<string, string[]> | null => {
  const responseData: any = error.response?.data;

  if (error.response?.status === 422 && responseData?.errors) {
    return responseData.errors;
  }

  return null;
};

/**
 * Check if error is network error
 */
export const isNetworkError = (error: AxiosError): boolean => {
  return (
    !error.response ||
    error.code === "ECONNABORTED" ||
    error.code === "ERR_NETWORK"
  );
};

/**
 * Check if error is authentication error
 */
export const isAuthError = (error: AxiosError): boolean => {
  return error.response?.status === 401;
};

/**
 * Check if error is validation error
 */
export const isValidationError = (error: AxiosError): boolean => {
  return error.response?.status === 422;
};
