"use client";
import { useAuth } from "@/context/ContextAuth";
import { useState } from "react";
import iconVisible from "@/assets/visible.svg";
import iconHidden from "@/assets/hidden.svg";
import iconCopy from "@/assets/copy.svg";
import "@/styles/docs.css";
import { api_all_posts, api_unique_post } from "@/utils/options";
import { RequireAuth } from "@/components/RequireAuth";

export default function Docs() {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  const handleCopy = async (api: string) => {
    await navigator.clipboard.writeText(api);
    setMessage("Copiado");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <RequireAuth>
      <main className="main-docs">
      <section className="section-page-docs">
        <section className="section-details-docs" id="inicio">
          <h2 className="title-details-docs">Gestor blog</h2>
          <p className="details-docs">
            Gestiona tus artículos para tus proyectos como pueden ser un blog o
            portfolio personal. Aquí encontrarás todo lo necesario para
            comenzar. Uso, herramientas, manejo del contenido, conocer las
            distintas API's y más
          </p>
        </section>
        <hr />
        <section className="section-details-docs" id="herramientas">
          <h3 className="title-details-docs">
            Aquí la lista de herramientas del editor:
          </h3>
          <ul className="list-tools-docs">
            <li className="tool-docs">Bloques de códigos</li>
            <li className="tool-docs">Blockquotes</li>
            <li className="tool-docs">Imagenes(a través de url solamente)</li>
            <li className="tool-docs">Links</li>
            <li className="tool-docs">Tablas</li>
            <li className="tool-docs">Markdown</li>
          </ul>
        </section>
        <hr />
        <section className="section-details-docs" id="apis">
          <h3 className="title-details-docs">API's</h3>
          <p className="details-docs">
            Ofrece 2 rutas para obtener todos tus artículos y otra para obtener
            un solo artículo
          </p>

          <h4>Las API's son:</h4>
          <ul className="list-apis">
            <p className={`message-docs ${message ? "hidden-message" : ""}`}>
                {message}
              </p>
            <li className="item-api">
              <div className="back-credential">
                <p className="credential">{api_all_posts}</p>
              </div>
              <img
                src={iconCopy.src}
                alt="icon copy"
                width={25}
                height={25}
                onClick={() => handleCopy(api_all_posts)}
                className="icon-copy"
              />
            </li>

            <li className="item-api">
              <div className="back-credential">
                <p className="credential">{api_unique_post}</p>
              </div>
              <img
                src={iconCopy.src}
                alt="icon copy"
                width={25}
                height={25}
                onClick={() => handleCopy(api_unique_post)}
                className="icon-copy"
              />
 
            </li>
          </ul>
        </section>

        <hr />
        <section className="section-details-docs" id="credenciales">
          <h3 className="title-details-docs">Credenciales</h3>
          <p className="details-docs">
            La unica credencial que necesitas es tu user_id para poder traer tus
            artículos desde donde tu lo necesites
          </p>
          <div className="container-credentials">
            <h3 className="title-section">ID usuario</h3>
            <p className="content-details">Tu ID de usuario</p>
            <div className="box-credential">
              <div className="back-credential">
                <p className={`credential user-id no-show`}>
                  {show ? user.user_id : ""}
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
          </div>
          <p className="note-credential">
            Nota: No compartas con nadie tu id de usuario y url, usar variables
            de entorno en desarrollo y producción para la seguridad de tu
            contenido
          </p>
        </section>
      </section>
    </main>
    </RequireAuth>
    
  );
}
