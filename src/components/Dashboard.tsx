"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";
import { useDashboard, useUpdateProgress } from "../services/userService";


interface DashboardProps {
  setUserName: (name: string) => void;
}

export default function Dashboard({ setUserName }: DashboardProps) {
  const navigate = useNavigate();
  const [showRosaryVideo, setShowRosaryVideo] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [pendingUpdates, setPendingUpdates] = useState<{
    [key: string]: NodeJS.Timeout;
  }>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // React Query hooks
  const queryClient = useQueryClient();
  const { data: dashboardData, isLoading: loading, error } = useDashboard();
  const updateProgressMutation = useUpdateProgress();

  // Set user name when dashboard data is loaded
  useEffect(() => {
    if (dashboardData?.user?.name) {
      setUserName(dashboardData.user.name);
    }
  }, [dashboardData?.user?.name, setUserName]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      console.error("Error fetching dashboard data:", error);
      navigate("/auth");
    }
  }, [error, navigate]);

  // Countdown timer for next available day
  useEffect(() => {
    // Only show timer if:
    // 1. There is a next_available_time
    // 2. User has completed all tasks for current day
    // 3. Next available time is in the future
    if (!dashboardData?.next_available_time || !dashboardData?.daily_content) {
      setTimeRemaining("");
      return;
    }

    const currentTasks = dashboardData.daily_content.tasks;
    const allTasksCompleted = currentTasks.meditationCompleted && 
                             currentTasks.videoCompleted && 
                             currentTasks.rosaryCompleted;
    
    if (!allTasksCompleted) {
      setTimeRemaining("");
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const nextAvailable = new Date(dashboardData.next_available_time!);
      const diff = nextAvailable.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("");
        // Refresh data when countdown ends to unlock next day
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [dashboardData?.next_available_time, dashboardData?.daily_content, queryClient]);

  // Cleanup pending updates on unmount
  useEffect(() => {
    return () => {
      Object.values(pendingUpdates).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, [pendingUpdates]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const debouncedUpdateProgress = async (
    day: number,
    task: string,
    completed: boolean
  ) => {
    if (!dashboardData) return;

    try {
      // Get current task states
      const currentTasks = dashboardData.daily_content.tasks;
      const newTasks = {
        meditation_completed:
          task === "meditationCompleted"
            ? completed
            : currentTasks.meditationCompleted,
        video_completed:
          task === "videoCompleted" ? completed : currentTasks.videoCompleted,
        rosary_completed:
          task === "rosaryCompleted" ? completed : currentTasks.rosaryCompleted,
      };

      await updateProgressMutation.mutateAsync({
        day: day,
        ...newTasks,
      });

      // Check if all tasks are completed for the day
      const allTasksCompleted =
        newTasks.meditation_completed &&
        newTasks.video_completed &&
        newTasks.rosary_completed;

      if (allTasksCompleted && completed) {
        showNotification(
          "¡Felicitaciones! Has completado el día " +
            day +
            ". El siguiente día estará disponible a las 12:00 AM.",
          "success"
        );
        // Invalidate dashboard query to refresh data
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        }, 2000);
      } else {
        showNotification("Progreso guardado exitosamente", "success");
      }
    } catch (error: any) {
      console.error("Error updating progress:", error);
      if (error.message?.includes("429")) {
        showNotification(
          "Demasiadas operaciones. Por favor, intenta de nuevo en 5 minutos.",
          "error"
        );
      } else {
        showNotification("Error al guardar el progreso", "error");
      }
    }
  };

  const toggleTask = (day: number, task: string) => {
    if (!dashboardData) return;

    // Only allow toggling for the available day
    if (day !== dashboardData.available_day) return;

    // Cancel any pending update for this task
    const updateKey = `${day}-${task}`;
    if (pendingUpdates[updateKey]) {
      clearTimeout(pendingUpdates[updateKey]);
    }

    // Get the new state for this task
    const newCompleted =
      !dashboardData.daily_content.tasks[
        task as keyof typeof dashboardData.daily_content.tasks
      ];

    // Schedule the backend update
    const timeoutId = setTimeout(() => {
      debouncedUpdateProgress(day, task, newCompleted);
      setPendingUpdates((prev) => {
        const newUpdates = { ...prev };
        delete newUpdates[updateKey];
        return newUpdates;
      });
    }, 500);

    setPendingUpdates((prev) => ({
      ...prev,
      [updateKey]: timeoutId,
    }));
  };

  const getDayProgress = (day: any) => {
    const tasks = [
      day.rosary_completed,
      day.meditation_completed,
      day.video_completed,
    ];
    return tasks.filter(Boolean).length;
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const { user, available_day, progress, daily_content } = dashboardData;
  console.log("user", user);

  // Check if daily_content exists
  if (!daily_content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">
            No hay contenido disponible para el día actual.
          </p>
        </div>
      </div>
    );
  }
  const totalProgress = progress.reduce(
    (sum, day) => sum + getDayProgress(day),
    0
  );
  const maxProgress = progress.length * 3;
  const overallProgressPercentage = Math.round(
    (totalProgress / maxProgress) * 100
  );

  console.log("available_day", available_day);
  console.log("user.totalDays", user.totalDays);

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={notification.type === "success" ? 3000 : 5000}
      />
      {/* Header */}
      <header className="bg-white border-b border-yellow-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              ¡Buen día, {user.name}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Continuemos tu jornada hacia la consagración
            </p>
          </div>
          <div className="text-left sm:text-right bg-yellow-50 p-3 rounded-lg sm:bg-transparent sm:p-0">
            <p className="text-sm sm:text-sm font-medium text-gray-900">
              Día {available_day}
            </p>
            <p className="text-xs text-gray-500">
              {33 - available_day} días restantes
            </p>
          </div>
        </div>
      </header>

      {/* Countdown Timer */}
      {timeRemaining && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-800 font-medium text-center">
                ¡Felicitaciones! Has completado el día {available_day}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-blue-700 mb-3">
              El día {available_day + 1} estará disponible a las 12:00 AM
            </p>
            <div className="bg-blue-100 rounded-lg p-3 max-w-xs mx-auto">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Tiempo restante:
              </p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 font-mono">
                {timeRemaining}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <main className="p-4 sm:p-6 bg-slate-100">
        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Progreso General
            </h3>
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">
                Día {available_day} de {user.totalDays}
              </span>
              <span className="font-medium text-yellow-700">
                {overallProgressPercentage}%
              </span>
            </div>
            <div className="w-full bg-yellow-100 rounded-full h-2 sm:h-3">
              <div
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgressPercentage}%` }}
              ></div>
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">
              {user.totalDays - available_day} días restantes para completar tu
              consagración
            </p>
          </div>
        </div>

        {/* Today's Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Today's Meditation */}
          <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Meditación de Hoy
              </h3>
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                  Día {daily_content.day}: {daily_content.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {daily_content.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">
                    {daily_content.readingTime} de lectura
                  </span>
                  <button
                    onClick={() =>
                      window.open(daily_content.meditationPdfUrl, "_blank")
                    }
                    className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
                  >
                    Ver PDF
                  </button>
                </div>
                <button
                  onClick={() =>
                    toggleTask(daily_content.day, "meditationCompleted")
                  }
                  className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                    daily_content.tasks.meditationCompleted
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {daily_content.tasks.meditationCompleted
                    ? "Completada"
                    : "Marcar como Completada"}
                </button>
              </div>
            </div>
          </div>

          {/* Today's Video */}
          <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Video de Hoy
              </h3>
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg aspect-video overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={daily_content.video.youtubeUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
              <div className="mb-3">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                  {daily_content.video.title}
                </h4>
              </div>
              <button
                onClick={() => toggleTask(daily_content.day, "videoCompleted")}
                className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                  daily_content.tasks.videoCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {daily_content.tasks.videoCompleted
                  ? "Completado"
                  : "Marcar como Visto"}
              </button>
            </div>
          </div>

          {/* Today's Rosary */}
          <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Rosario de Hoy
              </h3>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                  {daily_content.mysteries}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {daily_content.mysteriesDescription}
                </p>
                <div className="text-center mb-3">
                  <blockquote className="text-xs sm:text-sm text-gray-700 italic">
                    "{daily_content.quote.text}"
                  </blockquote>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    - {daily_content.quote.author}
                  </p>
                </div>
                <button
                  onClick={() => setShowRosaryVideo(!showRosaryVideo)}
                  className="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  {showRosaryVideo ? "Ocultar Video" : "Ver Video Guía"}
                </button>
              </div>
              {showRosaryVideo && (
                <div className="space-y-3">
                  <div className="relative bg-gray-100 rounded-lg aspect-video overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={daily_content.rosaryVideo.youtubeUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}
              <button
                onClick={() => toggleTask(daily_content.day, "rosaryCompleted")}
                className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                  daily_content.tasks.rosaryCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {daily_content.tasks.rosaryCompleted
                  ? "Completado"
                  : "Marcar como Rezado"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
