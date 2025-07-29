import React, { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const borderColor =
    type === "success" ? "border-green-600" : "border-red-600";
  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div className="fixed top-4 left-4 z-50 max-w-sm">
      <div
        className={`${bgColor} ${borderColor} border text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between`}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
