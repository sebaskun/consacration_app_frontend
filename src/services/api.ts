const API_BASE_URL = "http://localhost:8000/api/v1";

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  current_day: number;
  start_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: UserResponse;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
}

export interface UserProgressCreate {
  day: number;
  meditation_completed: boolean;
  video_completed: boolean;
  rosary_completed: boolean;
}

export interface UserProgressResponse {
  id: string;
  user_id: string;
  day: number;
  meditation_completed: boolean;
  video_completed: boolean;
  rosary_completed: boolean;
  completed_at?: string;
}

export interface UserProgressSummary {
  day: number;
  meditation_completed: boolean;
  video_completed: boolean;
  rosary_completed: boolean;
  total_completed: number;
}

export interface DailyContent {
  id: string;
  day: number;
  title: string;
  description: string;
  readingTime: string;
  mysteries: string;
  mysteriesDescription: string;
  video: {
    title: string;
    youtubeUrl: string;
  };
  rosaryVideo: {
    title: string;
    youtubeUrl: string;
  };
  quote: {
    text: string;
    author: string;
  };
  tasks: {
    meditationCompleted: boolean;
    videoCompleted: boolean;
    rosaryCompleted: boolean;
  };
  meditationPdfUrl: string;
}

export interface DashboardData {
  user: UserResponse & {
    totalDays: number;
    currentDay: number;
    progressPercentage: number;
  };
  available_day: number;
  progress: UserProgressSummary[];
  daily_content: DailyContent;
  next_available_time?: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to refresh access token
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return data.access_token;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
  
  // Clear invalid tokens
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_data");
  return null;
};

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Generic API request function with token refresh
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  let config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  };

  let response = await fetch(url, config);
  
  // If unauthorized and we have a refresh token, try to refresh
  if (response.status === 401 && localStorage.getItem("refresh_token")) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry with new token
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };
      response = await fetch(url, config);
    }
  }
  
  return handleResponse<T>(response);
};

export { apiRequest, getAuthHeaders };
