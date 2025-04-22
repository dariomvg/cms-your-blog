"use client";

import "../styles/header.css";
import { useAuth } from "../context/ContextAuth";
import iconGoogle from "../assets/google.svg";
import iconMenu from "../assets/menu.svg";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const { login, logout, user } = useAuth();
  const [active, setActive] = useState<boolean>(false); 
  return (
    <header className="header">
      <nav className="nav">
        <Link href="/" className="link-title-header">
          CMS Blog
        </Link>
        <img src={iconMenu.src} alt="icon menu" width={35} height={35} className="icon-menu" onClick={() => setActive(!active)} />
        <div className={`container-nav-links ${active ? "active" : ""}`}>
          <Link href="/posts" className="link-nav">
            Artículos
          </Link>
          <Link href="/docs" className="link-nav">
            Docs
          </Link>
          {user.user_id ? (
            <section className="container-logout">
              <div className="container-user">
                <Image
                  src={user.picture}
                  alt={user.name}
                  className="picture-user"
                  width={40}
                  height={40}
                />
                <p className="name-user">{user.name}</p>
              </div>
              <button className="button-nav logout" onClick={logout}>
                Cerrar sesión
              </button>
            </section>
          ) : (
            <button className="button-nav login" onClick={login}>
              Iniciar sesión
              <img src={iconGoogle.src} alt="google icon" width={20} height={20} />
            </button>
          )}
        </div>
        
      </nav>
    </header>
  );
};
