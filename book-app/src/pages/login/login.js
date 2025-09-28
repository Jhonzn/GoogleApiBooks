import React, { useState } from "react";
import { login } from "../../services/authService";
import "./login.scss"
import { useNavigate } from "react-router-dom";
import GetUser from '../../components/GetUser';

export default function Login(props) {
  const {setUser} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password); // esto devuelve { token, user }

      // Guardar token en localStorage
      localStorage.setItem("token", response.token);
      setUser(GetUser());
      // Mostrar datos del usuario
      alert("Login exitoso: " + response.user.nombre + " (" + response.user.email + ")");

      navigate("/"); // redirigir a la página principal
    } catch (err) {
      alert("Error: " + (err.response?.data?.msg || "Error inesperado"));
    }
  };

  return (

    <div className="cont-form">
        <div className="form-login">
        <h2 className="form-login__title">Login</h2>
        <form className="form-login__form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="form-login__form-email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="form-login__form-pass"
                value={password} onChange={(e) => setPassword(e.target.value)} />
        <button 
        type="submit">
        Ingresar
        </button>


        </form>
    </div>

    </div>

    
  ) 
}
