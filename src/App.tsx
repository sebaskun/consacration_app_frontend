import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import { useState } from "react";
import MainLayout from "./components/MainLayout";
import { useDashboard } from "./services/userService";

// Placeholder components for now

// Calendar Page wrapper to handle API data
const CalendarPage = () => {

  // React Query hooks
  const { data: dashboardData, isLoading: loading } = useDashboard();

  // Build calendarData from dashboard data
  const calendarData =
    dashboardData?.progress?.map((day: any) => ({
      day: day.day,
      title: `Día ${day.day} de Consagración`, // Default title for all days
      completed: day.total_completed === 3,
      tasks: {
        meditationCompleted: day.meditation_completed || false,
        videoCompleted: day.video_completed || false,
        rosaryCompleted: day.rosary_completed || false,
      },
      isAvailable: day.day <= (dashboardData?.available_day || 0) || (dashboardData?.user?.start_day > 1 && day.day < dashboardData.user.start_day),
    })) || [];



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

  return <Calendar calendarData={calendarData} />;
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
