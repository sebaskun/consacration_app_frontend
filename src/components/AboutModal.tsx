import React from "react";
import { X } from "lucide-react";

import MiliciaLogo from "../assets/milicia_logo_transp1.png";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Acerca de Totus Tuus
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Logo Section */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center mb-4">
              <img
                src={MiliciaLogo}
                alt="Milicia Logo"
                className="max-w-xs h-auto"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">Totus Tuus</h3>
                <p className="text-sm text-gray-600">
                  App de Consagración Total
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Hecho por <strong>La Milicia de la Inmaculada</strong> 2025
            </p>
          </div>

          {/* About Content */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Por qué desarrollamos esta aplicación?
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Como miembros de La Milicia de la Inmaculada, sentimos la
                necesidad de crear herramientas digitales que faciliten el
                crecimiento espiritual de las personas. La consagración total a
                Jesús por María es un camino profundo y transformador que
                requiere dedicación y guía constante.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Nuestra Misión
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Esta aplicación nace del deseo de hacer accesible la
                espiritualidad mariana en el mundo digital. Queremos acompañar a
                cada persona en su jornada de 33 días hacia la consagración
                total, proporcionando meditaciones, videos y recursos que
                enriquezcan su experiencia espiritual.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                La Milicia de la Inmaculada
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Somos un grupo de jóvenes católicos comprometidos con la
                evangelización digital y la difusión de la devoción mariana.
                Inspirados por San Maximiliano Kolbe, buscamos llevar el amor de
                María a todos los rincones del mundo a través de la tecnología y
                la innovación.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Características de la App
              </h4>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li>
                  • <strong>Meditaciones diarias</strong> basadas en la
                  Verdadera Devoción de San Luis de Montfort
                </li>
                <li>
                  • <strong>Videos inspiradores</strong> que profundizan en los
                  misterios de la consagración
                </li>
                <li>
                  • <strong>Rosario guiado</strong> con los misterios más
                  relevantes para cada etapa
                </li>
                <li>
                  • <strong>Seguimiento de progreso</strong> para mantener la
                  motivación
                </li>
                <li>
                  • <strong>Interfaz intuitiva</strong> diseñada para facilitar
                  la oración diaria
                </li>
              </ul>
            </div>
          </div>

          {/* Contact/Footer */}
          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-600 text-center">
              Para más información sobre La Milicia de la Inmaculada, contacta
              con nosotros a través de nuestras redes sociales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
