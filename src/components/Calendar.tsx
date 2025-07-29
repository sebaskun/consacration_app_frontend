import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Circle,
  BookOpen,
  Play,
  Heart,
  ArrowLeft,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserProgress, useUpdateProgress } from "../services/userService";

interface DayData {
  day: number;
  title: string;
  completed: boolean;
  tasks: {
    meditationCompleted: boolean;
    videoCompleted: boolean;
    rosaryCompleted: boolean;
  };
  isAvailable: boolean;
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
    duration: string;
    author: string;
    thumbnail: string;
    youtubeUrl: string;
  };
  rosaryVideo: {
    title: string;
    duration: string;
    author: string;
    thumbnail: string;
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

interface CalendarProps {
  calendarData: DayData[];
  onTaskUpdate: (day: number, task: string, completed: boolean) => void;
}

const Calendar: React.FC<CalendarProps> = ({ calendarData, onTaskUpdate }) => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showRosaryVideo, setShowRosaryVideo] = useState(false);

  // React Query hooks

  const getDayProgress = (day: DayData) => {
    const tasks = [
      day.tasks.meditationCompleted,
      day.tasks.videoCompleted,
      day.tasks.rosaryCompleted,
    ];
    return tasks.filter(Boolean).length;
  };

  const handleTaskToggle = (day: number, task: keyof DayData["tasks"]) => {
    const currentDay = calendarData.find((d) => d.day === day);
    if (currentDay) {
      const newCompleted = !currentDay.tasks[task];
      onTaskUpdate(day, task, newCompleted);
    }
  };

  const fetchDailyContent = async (day: number) => {
    try {
      const response = await fetch("/src/data/mockApi.json");
      const data = await response.json();
      const content = data.dailyContent[day.toString()];
      if (content) {
        setDailyContent(content);
      }
    } catch (error) {
      console.error("Error fetching daily content:", error);
    }
  };

  const handleDayClick = async (day: DayData) => {
    setSelectedDay(day);
    await fetchDailyContent(day.day);
  };

  // Update selectedDay when calendarData changes to keep it in sync
  useEffect(() => {
    if (selectedDay) {
      const updatedDay = calendarData.find(d => d.day === selectedDay.day);
      if (updatedDay) {
        setSelectedDay(updatedDay);
      }
    }
  }, [calendarData, selectedDay]);

  return (
    <div className="min-h-screen bg-whitesmoke">
      {/* Header */}
      <header className="bg-white border-b border-yellow-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Calendario de Consagración
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Revisa y completa tus meditaciones
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Progress Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen de Progreso
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {calendarData.filter((d) => d.completed).length}
              </div>
              <div className="text-sm text-gray-600">Días Completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {calendarData.filter((d) => d.tasks.meditationCompleted).length}
              </div>
              <div className="text-sm text-gray-600">Meditaciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {calendarData.filter((d) => d.tasks.videoCompleted).length}
              </div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {calendarData.filter((d) => d.tasks.rosaryCompleted).length}
              </div>
              <div className="text-sm text-gray-600">Rosarios</div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Los 33 Días
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {calendarData.map((day) => (
              <div
                key={day.day}
                className={`border rounded-lg p-4 transition-all hover:shadow-md 
                  ${
                    day.completed
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white hover:border-yellow-300"
                  }
                  ${
                    !day.isAvailable
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                onClick={() => day.isAvailable && handleDayClick(day)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    Día {day.day}
                  </span>
                  <div className="text-sm text-gray-500">
                    {getDayProgress(day)}/3
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {day.title}
                </h3>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Meditación</span>
                    {day.tasks.meditationCompleted ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Circle className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Video</span>
                    {day.tasks.videoCompleted ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Circle className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Rosario</span>
                    {day.tasks.rosaryCompleted ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Circle className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                </div>

                {!day.isAvailable && (
                  <div className="mt-2 text-center">
                    <span className="inline-flex items-center text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 17v.01M17 8V7a5 5 0 00-10 0v1M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
                        />
                      </svg>
                      No disponible
                    </span>
                  </div>
                )}

                {day.completed && (
                  <div className="mt-2 text-center">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Completado
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Day Detail Modal */}
        {selectedDay && dailyContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 p-6 border-b">
                <h2 className="text-xl font-bold">
                  Día {selectedDay.day}: {dailyContent.title}
                </h2>
                <button
                  onClick={() => {
                    setSelectedDay(null);
                    setDailyContent(null);
                    setShowMeditation(false);
                    setShowVideo(false);
                    setShowRosaryVideo(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Meditation Section */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Meditación del Día
                    </h3>
                    <BookOpen className="w-5 h-5 text-yellow-600" />
                  </div>
                  <button
                    onClick={() =>
                      window.open(dailyContent.meditationPdfUrl, "_blank")
                    }
                    className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Ver Meditación en PDF
                  </button>

                  {!showMeditation ? (
                    <div>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {dailyContent.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {dailyContent.readingTime} de lectura
                        </span>
                        <button
                          onClick={() => setShowMeditation(true)}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Leer Meditación Completa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <button
                          onClick={() => setShowMeditation(false)}
                          className="text-yellow-600 hover:text-yellow-700 mb-2"
                        >
                          ← Volver al resumen
                        </button>
                      </div>
                      <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Meditación Completa
                        </h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {dailyContent.description}
                          {"\n\n"}Reflexiona profundamente sobre este tema.
                          Tómate tu tiempo para meditar en cada palabra y cómo
                          se aplica a tu vida espiritual.
                          {"\n\n"}Preguntas para la reflexión:
                          {"\n"}- ¿Cómo puedo aplicar esta virtud de María en mi
                          vida diaria?
                          {"\n"}- ¿Qué obstáculos encuentro para vivir esta
                          virtud?
                          {"\n"}- ¿Cómo puedo pedir la intercesión de María para
                          crecer en esta virtud?
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      handleTaskToggle(selectedDay.day, "meditationCompleted")
                    }
                    className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedDay.tasks.meditationCompleted
                      ? "Marcar como Incompleta"
                      : "Marcar como Completada"}
                  </button>
                </div>

                {/* Video Section */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Video del Día
                    </h3>
                    <Play className="w-5 h-5 text-red-600" />
                  </div>
                  {!showVideo ? (
                    <div>
                      <div className="relative bg-gray-100 rounded-lg aspect-video mb-4">
                        <button
                          onClick={() => setShowVideo(true)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <span className="text-red-600 font-bold text-lg">
                            ▶ Ver Video
                          </span>
                        </button>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {dailyContent.video.title}
                        </h4>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <button
                          onClick={() => setShowVideo(false)}
                          className="text-red-600 hover:text-red-700 mb-2"
                        >
                          ← Volver al resumen
                        </button>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Video Completo
                        </h4>
                        <div className="relative bg-gray-100 rounded-lg aspect-video mb-4">
                          <iframe
                            width="100%"
                            height="315"
                            src={dailyContent.video.youtubeUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-64 rounded-lg"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() =>
                      handleTaskToggle(selectedDay.day, "videoCompleted")
                    }
                    className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedDay.tasks.videoCompleted
                      ? "Marcar como No Visto"
                      : "Marcar como Visto"}
                  </button>
                </div>

                {/* Rosary Section */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Rosario del Día
                    </h3>
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-center mb-4">
                    <blockquote className="text-gray-700 italic mb-2 leading-relaxed">
                      "{dailyContent.quote.text}"
                    </blockquote>
                    <p className="text-sm text-blue-600 font-medium">
                      - {dailyContent.quote.author}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {dailyContent.mysteries}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {dailyContent.mysteriesDescription}
                    </p>
                    {!showRosaryVideo ? (
                      <button
                        onClick={() => setShowRosaryVideo(true)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Heart className="w-4 h-4 mr-2 inline" />
                        Ver Video Guía del Rosario
                      </button>
                    ) : (
                      <div>
                        <div className="mb-4">
                          <button
                            onClick={() => setShowRosaryVideo(false)}
                            className="text-blue-600 hover:text-blue-700 mb-2"
                          >
                            ← Ocultar Video
                          </button>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-3">
                            {dailyContent.rosaryVideo.title}
                          </h5>
                          <div className="relative bg-gray-200 rounded-lg aspect-video mb-4">
                            <iframe
                              width="100%"
                              height="315"
                              src={dailyContent.rosaryVideo.youtubeUrl}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-64 rounded-lg"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      handleTaskToggle(selectedDay.day, "rosaryCompleted")
                    }
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedDay.tasks.rosaryCompleted
                      ? "Marcar como No Rezado"
                      : "Marcar como Rezado"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Calendar;
