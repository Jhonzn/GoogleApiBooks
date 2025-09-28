import React from "react";
import { Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo-book2.svg";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const {user} = props
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Si no hay token -> solo Login y Registro
  const items = !token
    ? [
        { key: "login", label: <Link to="/login">Login</Link> },
        { key: "register", label: <Link to="/register">Registro</Link> },
      ]
    : [
        { key: "home", label: <Link to="/">Inicio</Link> },
        { key: "new", label: <Link to="/new-books">Últimas Publicaciones</Link> },
        { key: "popular", label: <Link to="/popular">Populares</Link> },
        { key: "search", label: <Link to="/search">Buscar Libros</Link> },
        { key: "username", label: <span>Bienvenido/a, {user?.nombre}</span> },
        {
          key: "logout",
          label: (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              Cerrar Sesión
            </button>
          ),
        },
      ];

  return (
    <div className="menu-top">
      <div className="menu-top__logo">
        <Logo />
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        className="custom-menu"
        selectedKeys={[location.pathname]} // activo según la ruta actual
        style={{ lineHeight: "64px" }}
        items={items.map((item) => ({
          ...item,
          key: item.label.props?.to || item.key, // clave con la ruta
        }))}
      />
    </div>
  );
}
