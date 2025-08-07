import React from "react";
import { X, Clock, AlertTriangle } from "lucide-react";

interface LibreModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isActivating: boolean; // true for activation, false for deactivation
  isLoading?: boolean;
}

const LibreModeModal: React.FC<LibreModeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isActivating,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            {isActivating ? (
              <Clock className="w-6 h-6 text-yellow-600 mr-3" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {isActivating ? "¿Activar Modo Libre?" : "¿Desactivar Modo Libre?"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isActivating ? (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                El <strong>Modo Libre</strong> te permitirá avanzar al siguiente día 
                inmediatamente después de completar todas las tareas del día actual, 
                sin tener que esperar hasta las 12:00 AM.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                      Ten en cuenta:
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Podrás avanzar días más rápidamente</li>
                      <li>• El modo se puede desactivar en cualquier momento</li>
                      <li>• Tu progreso espiritual se mantiene igual</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                ¿Deseas continuar y activar el Modo Libre?
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Al desactivar el <strong>Modo Libre</strong>, volverás al sistema normal 
                donde necesitarás esperar hasta las 12:00 AM para acceder al siguiente día.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">
                      Tiempo de reflexión:
                    </h4>
                    <p className="text-sm text-blue-700">
                      El sistema normal de espera te ayuda a reflexionar y asimilar 
                      mejor las enseñanzas de cada día.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                ¿Deseas desactivar el Modo Libre y volver al sistema normal?
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full sm:w-auto px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 ${
              isActivating
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {isLoading
              ? "Procesando..."
              : isActivating
              ? "Activar Modo Libre"
              : "Desactivar Modo Libre"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibreModeModal;