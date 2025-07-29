import React from "react";
import { X } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Política de Privacidad
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1. Información que Recopilamos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Recopilamos información que usted nos proporciona directamente,
                como su nombre, dirección de correo electrónico y progreso
                espiritual en la aplicación. Esta información se utiliza
                únicamente para proporcionar y mejorar nuestros servicios.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                2. Uso de la Información
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos su información para:
              </p>
              <ul className="text-gray-700 leading-relaxed space-y-1 ml-4 mt-2">
                <li>
                  • Proporcionar acceso a la aplicación y sus funcionalidades
                </li>
                <li>• Guardar su progreso espiritual y preferencias</li>
                <li>• Enviar notificaciones relacionadas con su cuenta</li>
                <li>• Mejorar nuestros servicios y experiencia del usuario</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                3. Protección de Datos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas
                apropiadas para proteger su información personal contra acceso
                no autorizado, alteración, divulgación o destrucción.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4. Compartir Información
              </h3>
              <p className="text-gray-700 leading-relaxed">
                No vendemos, alquilamos ni compartimos su información personal
                con terceros, excepto cuando sea necesario para proporcionar
                nuestros servicios o cuando la ley lo requiera.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                5. Sus Derechos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Usted tiene derecho a:
              </p>
              <ul className="text-gray-700 leading-relaxed space-y-1 ml-4 mt-2">
                <li>• Acceder a su información personal</li>
                <li>• Corregir información inexacta</li>
                <li>• Solicitar la eliminación de su cuenta</li>
                <li>• Retirar su consentimiento en cualquier momento</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                6. Cookies y Tecnologías Similares
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su
                experiencia en la aplicación, recordar sus preferencias y
                analizar el uso del sitio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                7. Cambios en esta Política
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nos reservamos el derecho de actualizar esta política de
                privacidad en cualquier momento. Le notificaremos sobre
                cualquier cambio significativo a través de la aplicación o por
                correo electrónico.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                8. Contacto
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Si tiene preguntas sobre esta política de privacidad o nuestras
                prácticas de datos, puede contactarnos a través de nuestras
                redes sociales o en la sección "Acerca de" de la aplicación.
              </p>
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-600 text-center">
              Última actualización: Enero 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
