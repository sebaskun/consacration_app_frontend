"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  BookOpen,
  Play,
  Calendar,
  Crown,
  User,
  Settings,
  Home,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Bell,
  Check,
  X,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DayProgress {
  day: number;
  rosaryCompleted: boolean;
  meditationCompleted: boolean;
  videoCompleted: boolean;
}

interface DailyContent {
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

interface UserData {
  id: number;
  name: string;
  email: string;
  currentDay: number;
  totalDays: number;
  startDate: string;
  progressPercentage: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [progress, setProgress] = useState<DayProgress[]>([]);
  const [showRosaryVideo, setShowRosaryVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        const response = await fetch("/src/data/mockApi.json");
        const data = await response.json();

        setUserData(data.user);
        setDailyContent(data.dailyContent[data.user.currentDay]);

        // Initialize progress from API data
        const initialProgress = Array.from({ length: 33 }, (_, i) => ({
          day: i + 1,
          rosaryCompleted: false,
          meditationCompleted: false,
          videoCompleted: false,
        }));
        setProgress(initialProgress);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTask = (day: number, task: keyof Omit<DayProgress, "day">) => {
    setProgress((prev) =>
      prev.map((p) => (p.day === day ? { ...p, [task]: !p[task] } : p))
    );
  };

  const getDayProgress = (day: DayProgress) => {
    const tasks = [
      day.rosaryCompleted,
      day.meditationCompleted,
      day.videoCompleted,
    ];
    return tasks.filter(Boolean).length;
  };

  const totalProgress = progress.reduce(
    (sum, day) => sum + getDayProgress(day),
    0
  );
  const maxProgress = progress.length * 3;
  const overallProgressPercentage = Math.round(
    (totalProgress / maxProgress) * 100
  );

  if (loading || !userData || !dailyContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-yellow-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              ¡Buen día, {userData.name}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Continuemos tu jornada hacia la consagración
            </p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-yellow-600 transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>
            </button>
            <div className="text-right">
              <p className="text-xs sm:text-sm font-medium text-gray-900">
                Día {userData.currentDay}
              </p>
              <p className="text-xs text-gray-500">
                {userData.totalDays - userData.currentDay} días restantes
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-4 sm:p-6">
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
                Día {userData.currentDay} de {userData.totalDays}
              </span>
              <span className="font-medium text-yellow-700">
                {userData.progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-yellow-100 rounded-full h-2 sm:h-3">
              <div
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${userData.progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">
              {userData.totalDays - userData.currentDay} días restantes para
              completar tu consagración
            </p>
          </div>
        </div>

        {/* Today's Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                  Día {dailyContent.day}: {dailyContent.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {dailyContent.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">
                    {dailyContent.readingTime} de lectura
                  </span>
                  <button
                    onClick={() =>
                      window.open(dailyContent.meditationPdfUrl, "_blank")
                    }
                    className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition-colors"
                  >
                    Ver PDF
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {dailyContent.tasks.meditationCompleted
                      ? "Completada"
                      : "Pendiente"}
                  </span>
                  <button
                    onClick={() =>
                      toggleTask(dailyContent.day, "meditationCompleted")
                    }
                    className={`p-1 rounded ${
                      dailyContent.tasks.meditationCompleted
                        ? "text-green-600 hover:text-green-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
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
              <div className="relative bg-gray-100 rounded-lg aspect-video">
                <iframe
                  width="100%"
                  height="315"
                  src={dailyContent.video.youtubeUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover rounded-lg"
                ></iframe>
              </div>
              <div className="mb-3">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                  {dailyContent.video.title}
                </h4>
              </div>
              <button
                onClick={() => toggleTask(dailyContent.day, "videoCompleted")}
                className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                  dailyContent.tasks.videoCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {dailyContent.tasks.videoCompleted
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
                  {dailyContent.mysteries}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {dailyContent.mysteriesDescription}
                </p>
                <div className="text-center mb-3">
                  <blockquote className="text-xs sm:text-sm text-gray-700 italic">
                    "{dailyContent.quote.text}"
                  </blockquote>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    - {dailyContent.quote.author}
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
                  <div className="relative bg-gray-100 rounded-lg aspect-video">
                    <iframe
                      width="100%"
                      height="315"
                      src={dailyContent.rosaryVideo.youtubeUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-cover rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}
              <button
                onClick={() => toggleTask(dailyContent.day, "rosaryCompleted")}
                className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                  dailyContent.tasks.rosaryCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {dailyContent.tasks.rosaryCompleted
                  ? "Completado"
                  : "Marcar como Rezado"}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/calendar")}
              className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group"
            >
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-gray-900 text-center">
                Ver Calendario
              </span>
            </button>
            <button
              onClick={() =>
                window.open(dailyContent.meditationPdfUrl, "_blank")
              }
              className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group"
            >
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-gray-900 text-center">
                Ver Meditación PDF
              </span>
            </button>
            <button className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-gray-900 text-center">
                Rezar Rosario
              </span>
            </button>
            <button className="flex flex-col items-center p-3 sm:p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-gray-900 text-center">
                Ver Progreso
              </span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
