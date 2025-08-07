import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./api";
import type {
  UserResponse,
  UserUpdateRequest,
  UserProgressCreate,
  UserProgressResponse,
  UserProgressSummary,
  DashboardData,
} from "./api";

export const userService = {
  // Get user profile
  getProfile: async (): Promise<UserResponse> => {
    return apiRequest<UserResponse>("/users/profile");
  },

  // Update user profile
  updateProfile: async (userData: UserUpdateRequest): Promise<UserResponse> => {
    return apiRequest<UserResponse>("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  // Get user progress
  getProgress: async (): Promise<UserProgressSummary[]> => {
    return apiRequest<UserProgressSummary[]>("/users/progress");
  },

  // Update user progress
  updateProgress: async (
    progressData: UserProgressCreate
  ): Promise<UserProgressResponse> => {
    return apiRequest<UserProgressResponse>("/users/progress", {
      method: "POST",
      body: JSON.stringify(progressData),
    });
  },

  // Get dashboard data
  getDashboard: async (): Promise<DashboardData> => {
    return apiRequest<DashboardData>("/users/dashboard");
  },

  // Delete account
  deleteAccount: async (): Promise<{ message: string; deleted: boolean }> => {
    return apiRequest<{ message: string; deleted: boolean }>("/users/account", {
      method: "DELETE",
    });
  },

  // Toggle libre mode
  toggleLibreMode: async (libre_mode: boolean): Promise<UserResponse> => {
    return apiRequest<UserResponse>("/users/libre-mode", {
      method: "PUT",
      body: JSON.stringify({ libre_mode }),
    });
  },

  // Set start day (only available once)
  setStartDay: async (start_day: number): Promise<UserResponse> => {
    return apiRequest<UserResponse>("/users/set-start-day", {
      method: "POST",
      body: JSON.stringify({ start_day }),
    });
  },
};

// React Query hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: userService.getProfile,
    enabled: !!localStorage.getItem("access_token"),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      // Update local storage
      const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
      const updatedUserData = { ...userData, ...data };
      localStorage.setItem("user_data", JSON.stringify(updatedUserData));

      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useUserProgress = () => {
  return useQuery({
    queryKey: ["user", "progress"],
    queryFn: userService.getProgress,
    enabled: !!localStorage.getItem("access_token"),
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateProgress,
    onSuccess: () => {
      // Invalidate and refetch progress and dashboard queries
      queryClient.invalidateQueries({ queryKey: ["user", "progress"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: userService.getDashboard,
    enabled: !!localStorage.getItem("access_token"),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteAccount,
    onSuccess: () => {
      // Clear all data and invalidate queries
      localStorage.clear();
      queryClient.clear();
    },
  });
};

export const useToggleLibreMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.toggleLibreMode,
    onSuccess: (data) => {
      // Update local storage if user data exists
      const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
      const updatedUserData = { ...userData, ...data };
      localStorage.setItem("user_data", JSON.stringify(updatedUserData));

      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};

export const useSetStartDay = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.setStartDay,
    onSuccess: (data) => {
      // Update local storage if user data exists
      const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
      const updatedUserData = { ...userData, ...data };
      localStorage.setItem("user_data", JSON.stringify(updatedUserData));

      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
