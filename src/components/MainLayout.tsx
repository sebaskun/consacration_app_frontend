import React, { useState } from "react";
import {
  Crown,
  Home,
  Calendar as CalendarIcon,
  User,
  Menu,
  Info,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import AboutModal from "./AboutModal";
import UserProfileModal from "./UserProfileModal";
import { useUpdateProfile, useDeleteAccount } from "../services/userService";

interface MainLayoutProps {
  children: React.ReactNode;
  userName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // React Query hooks
  const updateProfileMutation = useUpdateProfile();
  const deleteAccountMutation = useDeleteAccount();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-whitesmoke">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-yellow-200"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 w-64 h-screen bg-white border-r border-yellow-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center mb-8 px-3">
            <Crown className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <span className="text-xl font-bold text-gray-900">
                Totus Tuus
              </span>
              <p className="text-xs text-gray-500">
                La Milicia de la Inmaculada
              </p>
            </div>
          </div>

          {/* Navigation */}
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className={`w-full flex items-center p-2 rounded-lg group ${
                  location.pathname === "/dashboard"
                    ? "bg-yellow-100 text-yellow-900"
                    : "text-gray-900 hover:bg-yellow-100"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/calendar")}
                className={`w-full flex items-center p-2 rounded-lg group ${
                  location.pathname === "/calendar"
                    ? "bg-yellow-100 text-yellow-900"
                    : "text-gray-900 hover:bg-yellow-100"
                }`}
              >
                <CalendarIcon className="w-5 h-5" />
                <span className="ml-3">Calendario</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowAbout(true)}
                className="w-full flex items-center p-2 rounded-lg group text-gray-900 hover:bg-yellow-100"
              >
                <Info className="w-5 h-5" />
                <span className="ml-3">Acerca de</span>
              </button>
            </li>
          </ul>

          {/* User Profile */}
          <div className="absolute bottom-4 left-3 right-3">
            <div
              className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors"
              onClick={() => setShowUserProfile(true)}
            >
              <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-yellow-700" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {userName || "Usuario"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-yellow-600 text-white py-2 rounded font-semibold hover:bg-yellow-700 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">{children}</div>

      {/* About Modal */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        userName={userName || "Usuario"}
        onUpdateName={async (newName) => {
          try {
            await updateProfileMutation.mutateAsync({ name: newName });
            // The mutation will handle updating local storage and invalidating queries
          } catch (error) {
            console.error("Error updating name:", error);
          }
        }}
        onDeleteAccount={async () => {
          try {
            await deleteAccountMutation.mutateAsync();
            // The mutation will handle clearing local storage and invalidating queries
            handleLogout();
          } catch (error) {
            console.error("Error deleting account:", error);
          }
        }}
      />
    </div>
  );
};

export default MainLayout;
