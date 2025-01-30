import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";
const SignOut = () => {
  const history = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Elimina el token de autenticación
    logout(); // O sessionStorage.removeItem('authToken');

    // Redirige al usuario a la página de inicio de sesión
    history("/session/signin");
  }, [history]);

  return null; // No se necesita renderizar nada
};

export default SignOut;
