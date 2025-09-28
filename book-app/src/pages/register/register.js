import React, { useState } from "react";
import { register } from "../../services/authService";
import "./register.scss"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return alert("Las contraseñas no coinciden");

        try {
        const res = await register(nombre, email, password);
        alert(res.data.msg + ": " + res.data.user.email); // ✅ correcto
        navigate("/login");
        } catch (err) {
        alert("Error: " + (err.response?.data?.msg || err.message));
        }
        };


    return (

        <div className="cont-form">
            <div className="form-register">
            <h2 className="form-register__title">Registro</h2>
            <form className="form-register__form" onSubmit={handleRegister}>
            <input type="text" placeholder="Nombre" className="form-register__form-email"
                    value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="email" placeholder="Email" className="form-register__form-email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="form-register__form-pass"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="form-register__form-pass"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button 
            type="submit">
           Registrarse
            </button>


            </form>
        </div>

        </div>

        
    ) 
    }
