"use client";

import React, { useState } from "react";
import { Heart, BookOpen, Play, Star, Crown, Shield, Info } from "lucide-react";
import imagenBackground from "../assets/virgen_y_jesus_eucaristia.png";
import image2Background from "../assets/virgen_maria_san_jose.png";
import AboutModal from "./AboutModal";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

export default function HomePage() {
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <a href="/" className="flex items-center space-x-2">
          <Crown className="h-8 w-8 text-yellow-600" />
          <div>
            <span className="text-xl font-bold text-gray-900">Totus Tuus</span>
            <p className="text-xs text-gray-500">La Milicia de la Inmaculada</p>
          </div>
        </a>
        <nav className="ml-auto flex gap-6">
          <a
            href="#beneficios"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Beneficios
          </a>
          <a
            href="#app"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Aplicación
          </a>
          <a
            href="/acerca"
            className="text-sm font-medium hover:text-yellow-600 transition-colors"
          >
            Acerca de
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imagenBackground})`,
            }}
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 container px-4 md:px-6 mx-auto max-w-4xl text-center text-white">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-yellow-600/80 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                Jornada Espiritual de 33 Días
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl">
                Consagración Total a{" "}
                <span className="text-yellow-300">Jesús por María</span>
              </h1>
              <p className="max-w-[800px] mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-lg text-gray-100">
                Embárcate en una jornada transformadora de 33 días de oración,
                meditación y crecimiento espiritual. Profundiza tu relación con
                Jesús a través de la amorosa intercesión de Nuestra Señora.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-600 text-white hover:bg-yellow-700 hover:scale-105 shadow-2xl backdrop-blur-sm px-8 py-4"
                  onClick={() => (window.location.href = "/auth")}
                >
                  ✨ Totus Tuus - Comienza tu Jornada
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-lg font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm px-8 py-4">
                  Saber Más
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="beneficios"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Frutos de la Consagración
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Experimenta los profundos beneficios espirituales que
                  innumerables almas han descubierto a través de esta devoción
                  sagrada
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="rounded-lg border border-yellow-100 bg-white text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Unión más Profunda con Jesús
                  </h3>
                  <p className="text-gray-600">
                    A través del ejemplo perfecto de María, acércate más al
                    Sagrado Corazón de Jesús y experimenta Su amor infinito de
                    manera más íntima.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-yellow-100 bg-white text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Protección Espiritual
                  </h3>
                  <p className="text-gray-600">
                    Encuentra refugio bajo el manto de María y experimenta su
                    poderosa intercesión contra la tentación y la guerra
                    espiritual.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-yellow-100 bg-white text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Santificación Acelerada
                  </h3>
                  <p className="text-gray-600">
                    Permite que María te forme a imagen de su Hijo,
                    experimentando un crecimiento rápido en virtud y santidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Features Section */}
        <section
          id="app"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-yellow-50 to-yellow-100"
        >
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-200 px-3 py-1 text-sm text-yellow-800">
                  Tu Compañero Diario
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Todo lo que Necesitas para tu Jornada
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Nuestra aplicación integral proporciona todos los recursos
                  espirituales para guiarte a través de tu consagración de 33
                  días
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                    <BookOpen className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Meditaciones Diarias en PDF
                    </h3>
                    <p className="text-gray-600">
                      Recibe meditaciones diarias bellamente formateadas basadas
                      en la Verdadera Devoción de San Luis de Montfort,
                      perfectas para imprimir o leer en cualquier dispositivo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Play className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Videos Inspiradores
                    </h3>
                    <p className="text-gray-600">
                      Mira videos cuidadosamente seleccionados que iluminan los
                      misterios de la consagración y profundizan tu comprensión
                      de la devoción mariana.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Heart className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Rosario Guiado
                    </h3>
                    <p className="text-gray-600">
                      Reza el rosario con guía de audio, incluyendo los
                      misterios más relevantes para tu etapa actual de
                      preparación para la consagración.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-auto">
                <img
                  src={image2Background}
                  width="300"
                  height="400"
                  alt="Interfaz de aplicación móvil mostrando meditación diaria"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-yellow-600 to-yellow-800">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center text-white">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para Comenzar tu Jornada Sagrada?
                </h2>
                <p className="mx-auto max-w-[700px] text-yellow-100 md:text-xl">
                  Únete a miles de almas que han experimentado el poder
                  transformador de la Consagración Total. Tu jornada de 33 días
                  hacia Jesús por María comienza hoy.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-yellow-600 hover:bg-yellow-50 px-8 py-4 text-lg font-semibold shadow-lg"
                  onClick={() => (window.location.href = "/auth")}
                >
                  🌹 "Ad Jesum per Mariam" - Comenzar Ahora
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 text-lg bg-transparent"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1o687WDATAebWTfcVvM5qo1Q0Qh3WP4aR/view?usp=drive_link",
                      "_blank"
                    )
                  }
                >
                  Descargar Meditación de Muestra
                </button>
              </div>
              <p className="text-sm text-yellow-200 max-w-md">
                "A Jesús por María" - Comienza tu preparación hoy y experimenta
                la alegría de pertenecer completamente a Nuestro Señor a través
                de Su Santísima Madre.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500">
          © 2025 Consagración Totus Tuus. Difundiendo la devoción a Jesús por
          María.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-xs hover:underline underline-offset-4 text-gray-500"
          >
            Política de Privacidad
          </button>
          <button
            onClick={() => setShowAbout(true)}
            className="text-xs hover:underline underline-offset-4 text-gray-500"
          >
            Acerca de
          </button>
        </nav>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
