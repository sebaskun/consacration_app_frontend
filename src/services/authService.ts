import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./api";
import type { LoginRequest, RegisterRequest, LoginResponse } from "./api";

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Register
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
  },
};

// React Query hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store tokens and user data
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      // Clear and set fresh data to prevent unnecessary fetches
      queryClient.setQueryData(["dashboard"], undefined);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // Store tokens and user data
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      // Clear and set fresh data to prevent unnecessary fetches
      queryClient.setQueryData(["dashboard"], undefined);
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
