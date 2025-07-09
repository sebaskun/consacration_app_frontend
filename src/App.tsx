import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Chatbot from "./components/Chatbot";
import "./index.css";
import { useState, useEffect } from "react";
import MainLayout from "./components/MainLayout";

// Placeholder components for now
const ChatbotPage = () => <div>Chatbot: Marie Grignion de Montfort</div>;

// Calendar Page wrapper to handle API data
const CalendarPage = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch("/src/data/mockApi.json");
        const data = await response.json();
        setCalendarData(data.calendar.days);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const handleTaskUpdate = (day: number, task: string, completed: boolean) => {
    setCalendarData((prev) =>
      prev.map((dayData: any) =>
        dayData.day === day
          ? { ...dayData, tasks: { ...dayData.tasks, [task]: completed } }
          : dayData
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando calendario...</p>
        </div>
      </div>
    );
  }

  return (
    <Calendar calendarData={calendarData} onTaskUpdate={handleTaskUpdate} />
  );
};

function App() {
  // Fetch user name for sidebar
  const [userName, setUserName] = useState<string | undefined>(undefined);
  useEffect(() => {
    fetch("/src/data/mockApi.json")
      .then((res) => res.json())
      .then((data) => setUserName(data.user?.name));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout userName={userName}>
              <Dashboard />
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
        <Route path="/chat" element={<ChatbotPage />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
