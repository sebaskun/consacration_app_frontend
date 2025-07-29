import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Notification from "./components/Notification";
import "./index.css";
import { useState, useEffect } from "react";
import MainLayout from "./components/MainLayout";
import { useDashboard, useUpdateProgress } from "./services/userService";

// Placeholder components for now

// Calendar Page wrapper to handle API data
const CalendarPage = () => {
  const [pendingUpdates, setPendingUpdates] = useState<{
    [key: string]: number;
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
  const { data: dashboardData, isLoading: loading } = useDashboard();
  const updateProgressMutation = useUpdateProgress();

  // Build calendarData from dashboard data
  const calendarData =
    dashboardData?.progress?.map((day: any) => ({
      day: day.day,
      title: `Día ${day.day}`,
      completed: day.total_completed === 3,
      tasks: {
        meditationCompleted: day.meditation_completed,
        videoCompleted: day.video_completed,
        rosaryCompleted: day.rosary_completed,
      },
      isAvailable: day.day <= (dashboardData?.available_day || 0),
    })) || [];

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
      // Get current task states from the specific day
      const currentDay = dashboardData.progress.find((d: any) => d.day === day);
      if (!currentDay) return;

      await updateProgressMutation.mutateAsync({
        day: day,
        meditation_completed:
          task === "meditationCompleted"
            ? completed
            : currentDay.meditation_completed,
        video_completed:
          task === "videoCompleted" ? completed : currentDay.video_completed,
        rosary_completed:
          task === "rosaryCompleted" ? completed : currentDay.rosary_completed,
      });

      showNotification("Progreso guardado exitosamente", "success");
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

  const handleTaskUpdate = (day: number, task: string, completed: boolean) => {
    // Cancel any pending update for this task
    const updateKey = `${day}-${task}`;
    if (pendingUpdates[updateKey]) {
      clearTimeout(pendingUpdates[updateKey]);
    }

    // Schedule the backend update
    const timeoutId = setTimeout(() => {
      debouncedUpdateProgress(day, task, completed);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-whitesmoke flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando calendario...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={notification.type === "success" ? 3000 : 5000}
      />
      <Calendar calendarData={calendarData} onTaskUpdate={handleTaskUpdate} />
    </>
  );
};

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout userName={userName}>
              <Dashboard setUserName={setUserName} />
            </MainLayout>
          }
        />
        <Route
          path="/calendar"
          element={
            <MainLayout userName={userName}>
              <CalendarPage />
            </MainLayout>
          }
        />
        {/* <Route path="/chat" element={<ChatbotPage />} /> */}
      </Routes>
      {/* <Chatbot /> */}
    </Router>
  );
}

export default App;
