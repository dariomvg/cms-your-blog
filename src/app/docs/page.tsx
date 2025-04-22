"use client";
import "@/styles/docs.css";
import { urlApp } from "@/utils/options";
import { useState } from "react";
import iconVisible from "@/assets/visible.svg";
import iconHidden from "@/assets/hidden.svg";
import { useAuth } from "@/context/ContextAuth";
import iconCopy from "@/assets/copy.svg";

export default function Docs() {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${urlApp}/api/posts/your_user_id`);
    setMessage("Copiado");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <main className="page-docs">
      <h1 className="title-docs">CMS Blog</h1>
      <h2 className="subtitle-docs">Manejador de contenido</h2>
      <hr />
      <section className="section-details">
        <p className="content-details">
          Maneja tu contenido para tu blog o portafolio, creando artículos
          completos con editor con todas las herramientas, editandolos cuando
          quieras, mostrando solo los que quieras y eliminandolos cuando lo
          desees.
        </p>
        <ul className="list-tools-docs">
          <h3 className="title-section"></h3>
          <li className="tool-docs">Bloques de códigos</li>
          <li className="tool-docs">Blockquotes</li>
          <li className="tool-docs">Imagenes(sin servidor para manejar)</li>
          <li className="tool-docs">Links</li>
          <li className="tool-docs">Listas</li>
          <li className="tool-docs">Tablas</li>
          <li className="tool-docs">Markdown</li>
        </ul>
      </section>
      <hr />
      <section className="section-details">
        <h3 className="title-section">Uso de artículos</h3>
        <p className="content-details">
          CMS Blog provide una url para mostrar tus artículos en tu blog,
          portafolio u otro{" "}
        </p>

        <div className="container-credentials">
          <h3 className="title-section">URL</h3>
          <p className="content-details">
            Retorna todos los artículos públicos que hayas creado
          </p>
          
          <div className="box-credential">
            <div className="back-credential">
              <p className="credential">{`${urlApp}/api/posts/your_user_id`}</p>
            </div>
            <img
              src={iconCopy.src}
              alt="icon copy"
              width={25}
              height={25}
              onClick={() => handleCopy()}
              className="icon-copy"
            />
            <p className={`message-docs ${message ? "hidden-message" : ""}`}>
            {message}
          </p>
          </div>
        </div>

        <div className="container-credentials">
          <h3 className="title-section">ID usuario</h3>
          <p className="content-details">Tu ID de usuario</p>
          <div className="box-credential">
            <div className="back-credential">
              <p className={`credential user-id no-show`}>
                {show
                  ? user.user_id
                  : "-------------------------------------------------"}
              </p>
            </div>

            <button className="button-show" onClick={() => setShow(!show)}>
              {show ? (
                <img
                  src={iconHidden.src}
                  alt="icon eye hidden"
                  width={25}
                  height={25}
                />
              ) : (
                <img
                  src={iconVisible.src}
                  alt="icon eye visible"
                  width={25}
                  height={25}
                />
              )}
            </button>
          </div>
          <p className="note-credential">
            Nota: No compartas con nadie tu id de usuario y url, usar variables
            de entorno en desarrollo y producción para la seguridad de tu
            contenido
          </p>
        </div>
      </section>
    </main>
  );
}
