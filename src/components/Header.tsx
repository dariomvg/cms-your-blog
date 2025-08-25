"use client";

import "@/styles/header.css";
import { useAuth } from "../context/ContextAuth";
import iconGoogle from "../assets/google.svg";
import iconMenu from "../assets/menu.svg";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/services/logout";
import { login } from "@/services/login";

export const Header = () => {
  const { user } = useAuth();
  const [active, setActive] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = () => {
    logout()
    router.push("/");
  };
  return (
    <header className="header">
      <nav className="nav">
        <Link href="/" className="link-title-header">
          CMS Blog
        </Link>
        <img
          src={iconMenu.src}
          alt="icon menu"
          width={35}
          height={35}
          className="icon-menu"
          loading="lazy"
          onClick={() => setActive(!active)}
        />
        <div className={`container-nav-links ${active ? "active" : ""}`}>
          {user.user_id ? (
            <>
              <Link href="/editor/post" className="link-nav">
                Crear artículo
              </Link>
              <Link href="/dashboard" className="link-nav">
                Dashboard
              </Link>
              <Link href="/docs" className="link-nav">
                Docs
              </Link>
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
                <button className="button-nav logout" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </section>
            </>
          ) : (
            <button className="button-nav login" onClick={login}>
              Iniciar sesión
              <img
                src={iconGoogle.src}
                alt="google icon"
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
