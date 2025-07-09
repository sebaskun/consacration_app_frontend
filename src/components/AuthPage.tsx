import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setMessage(
        isRegister ? "¡Registro exitoso!" : "¡Inicio de sesión exitoso!"
      );

      // Redirect to dashboard after successful login/register
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-3xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">
              Consagración Total a Jesús por María
            </h1>
            <div className="flex justify-center mb-4">
              <button
                className={`px-4 py-2 rounded-l ${
                  !isRegister
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setIsRegister(false)}
              >
                Iniciar Sesión
              </button>
              <button
                className={`px-4 py-2 rounded-r ${
                  isRegister
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setIsRegister(true)}
              >
                Registrarse
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {isRegister && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded font-semibold hover:bg-yellow-700 transition"
              disabled={loading}
            >
              {loading
                ? "Cargando..."
                : isRegister
                ? "Registrarse"
                : "Iniciar Sesión"}
            </button>
          </form>
          <div className="mt-4 text-center">
            {isRegister ? (
              <span>
                ¿Ya tienes cuenta?{" "}
                <button
                  className="text-yellow-600 underline"
                  onClick={() => setIsRegister(false)}
                >
                  Inicia sesión
                </button>
              </span>
            ) : (
              <span>
                ¿No tienes cuenta?{" "}
                <button
                  className="text-yellow-600 underline"
                  onClick={() => setIsRegister(true)}
                >
                  Regístrate
                </button>
              </span>
            )}
          </div>
          {message && (
            <div className="mt-4 text-green-600 text-center font-semibold">
              {message}
            </div>
          )}
        </div>
        {/* Right: Image */}
        <div className="hidden md:block md:w-1/2 bg-yellow-50 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/250x350?text=Our+Lady"
            alt="Nuestra Señora"
            className="object-cover h-80 rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
