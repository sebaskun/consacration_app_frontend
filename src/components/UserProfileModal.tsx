import React, { useState } from "react";
import { X, User, Edit, Trash2, AlertTriangle } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateName: (newName: string) => void;
  onDeleteAccount: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateName,
  onDeleteAccount,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleSaveName = () => {
    if (newName.trim() && newName !== userName) {
      onUpdateName(newName.trim());
    }
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "Totus Tuus") {
      onDeleteAccount();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between mb-4 p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Perfil de Usuario</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Nuevo nombre"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveName}
                      className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setNewName(userName);
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{userName}</h3>
                    <p className="text-sm text-gray-600">Usuario</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Eliminar Cuenta
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción es irreversible. Todos tus datos y progreso se
              perderán permanentemente.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar mi cuenta</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Confirmación requerida
                    </p>
                    <p className="text-xs text-red-600">
                      Escribe "Totus Tuus" para confirmar la eliminación
                    </p>
                  </div>
                </div>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Escribe 'Totus Tuus'"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmation !== "Totus Tuus"}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Confirmar Eliminación
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmation("");
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
