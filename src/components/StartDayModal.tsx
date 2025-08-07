import React, { useState } from "react";
import { X, Calendar, AlertTriangle, Clock } from "lucide-react";

interface StartDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (startDay: number) => void;
  isLoading?: boolean;
}

const StartDayModal: React.FC<StartDayModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleConfirm = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }
    onConfirm(selectedDay);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setSelectedDay(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Elige tu Día de Inicio
              </h2>
              <p className="text-sm text-gray-500">
                Esta acción solo se puede realizar una vez
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showConfirmation ? (
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">
                      ¿Cómo funciona?
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Puedes empezar en cualquier día del 1 al 33</li>
                      <li>• La consagración continúa en orden desde el día elegido</li>
                      <li>• Ejemplo: Si eliges día 15, continuarás: 15, 16, 17... 33, 1, 2... 14</li>
                      <li>• Esta elección es permanente y no se puede cambiar</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Day Selection Grid */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Selecciona el día de inicio:
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 33 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`
                        w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200
                        ${
                          selectedDay === day
                            ? "bg-yellow-500 text-white shadow-md transform scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700"
                        }
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Day Preview */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                  Día seleccionado: {selectedDay}
                </h4>
                <p className="text-sm text-yellow-700">
                  Comenzarás tu consagración en el día {selectedDay} y continuarás la secuencia normal.
                  {selectedDay > 1 && (
                    <span className="block mt-1">
                      Orden: {selectedDay} → {selectedDay < 33 ? selectedDay + 1 : 1} → ... → {selectedDay - 1}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            /* Confirmation Step */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  ¿Estás seguro?
                </h3>
                <p className="text-gray-600">
                  Vas a comenzar tu consagración en el <strong>día {selectedDay}</strong>.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-800 mb-1">
                      Importante:
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Esta decisión es <strong>permanente</strong></li>
                      <li>• No podrás cambiar el día de inicio después</li>
                      <li>• Asegúrate de que es el día correcto</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 p-6 border-t border-gray-200">
          <button
            onClick={showConfirmation ? () => setShowConfirmation(false) : handleClose}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {showConfirmation ? "Volver" : "Cancelar"}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50"
          >
            {isLoading
              ? "Procesando..."
              : showConfirmation
              ? `Confirmar Día ${selectedDay}`
              : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartDayModal;