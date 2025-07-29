import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagenBackground from "../assets/virgen_nino_jesus.png";
import { Eye, EyeOff } from "lucide-react";
import MiliciaLogo from "../assets/milicia_logo_transp1.png";
import { useLogin, useRegister } from "../services/authService";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Query hooks
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordRequirements = [
    { test: (pw: string) => pw.length >= 8, message: "Al menos 8 caracteres" },
    {
      test: (pw: string) => /[A-Z]/.test(pw),
      message: "Al menos una mayúscula",
    },
    {
      test: (pw: string) => /[a-z]/.test(pw),
      message: "Al menos una minúscula",
    },
    { test: (pw: string) => /[0-9]/.test(pw), message: "Al menos un número" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Password requirements for registration
    if (isRegister) {
      const failed = passwordRequirements.filter((r) => !r.test(form.password));
      if (failed.length > 0) {
        setMessage(
          "La contraseña debe cumplir: " +
            failed.map((f) => f.message).join(", ")
        );
        return;
      }
      if (form.password !== form.confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        return;
      }
    }

    try {
      if (isRegister) {
        await registerMutation.mutateAsync({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMessage("¡Registro exitoso!");
        navigate("/dashboard");
      } else {
        await loginMutation.mutateAsync({
          email: form.email,
          password: form.password,
        });
        setMessage("¡Inicio de sesión exitoso!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      setMessage(error.message || "Error en la autenticación.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <img src={MiliciaLogo} alt="Milicia Logo" className="w-8 h-8" />
          <span className="text-sm font-semibold text-gray-700">
            Totus Tuus
          </span>
        </button>
      </div>

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {isRegister && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded font-semibold hover:bg-yellow-700 transition"
              disabled={loginMutation.isPending || registerMutation.isPending}
            >
              {loginMutation.isPending || registerMutation.isPending
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
        <div className="hidden md:block md:w-1/2 bg-yellow-50 flex items-center content-center">
          <img
            src={imagenBackground}
            alt="Nuestra Señora"
            className="object-cover rounded shadow align-center"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
