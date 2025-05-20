import Link from "next/link";
import "@/styles/home.css";

export default function Main() {
  return (
    <main className="main">
      <section className="container-main">
        <h1 className="title-main">Gestiona tus artículos...</h1>
        <h2 className="subtitle-main">
          creando y manejando tus propios artículos desde un solo lugar
        </h2>
        <Link href="/editor/post" className="link-main">
          Comenzar
        </Link>
      </section>

      <section className="section-features">
        <div className="feature">
          <h3 className="title-feature">Soporte para imágenes</h3>
          <p className="detail-feature">
            Manejo de imagenes optimizado, solo agregando la url de esa misma
          </p>
        </div>
        <div className="feature">
          <h3 className="title-feature">Editor completo para artículos</h3>
          <p className="detail-feature">
            Todas las herramientas incluidas para tus blogs y/o portafolios web
          </p>
        </div>
        <div className="feature">
          <h3 className="title-feature">Contenido manejado con markdown</h3>
          <p className="detail-feature">
            Todo se maneja con markdown por lo que es más versátil, simple y
            rápido
          </p>
        </div>
      </section>
    </main>
  );
}
