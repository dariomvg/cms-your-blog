"use client";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { EditorProvider } from "@tiptap/react";
import { useParams, useRouter } from "next/navigation";
import { NavEditor } from "@/components/NavEditor";
import "@/styles/editor.css";
import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { marked } from "marked";

export default function EditorPostContent() {
  const params = useParams<{ idPost: string }>();
  const postId = params?.idPost ? parseInt(params.idPost) : undefined;
  const router = useRouter();
  const { extensions } = useEditorConfig();
  const { post, isPublic, submitPost, changeInput, changeIsPublic, findPost } =
    usePosts(postId);
  const [html, setHtml] = useState<string>("");

  const handleSubmit = () => {
    submitPost(html);
    setHtml("");
    router.push("/dashboard");
  };

  const content = `<h1>Guia completa para iniciar en desarrollo web front-end y back-end 2025</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus accusamus esse, error explicabo id sit quidem quia possimus magnam quod ipsum exercitationem modi optio necessitatibus. Nemo vel voluptas blanditiis perferendis.</p>
`
  useEffect(() => {
    if (postId) {
      const getPostToUpdate = async () => {
        try {
          // const editPost = await findPost(postId);
          const data = await marked.parse(content);
          setHtml(data);
          if (data) {
            console.log(data)
          }
        } catch (error) {
          console.error("Error al cargar el post:", error);
        }
      };
      getPostToUpdate();
    }
  }, [postId]);

  return (
    <RequireAuth>
      <main className="main-editor">
        <section className="section-metadates">
          <h1 className="title-form">Metadatos para el artículo</h1>
          <div className="container-input-metadates">
            <label htmlFor="title" className="label-metadates">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={post.title}
              onChange={changeInput}
              className="input-metadates"
              placeholder="Cómo mejorar el rendimiento en React..."
            />
          </div>
          <div className="container-input-metadates">
            <label htmlFor="description" className="label-metadates">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="input-metadates"
              required
              value={post.description}
              onChange={changeInput}
              placeholder="En este artículo te explico 5 técnicas para optimizar aplicaciones React"
            />
          </div>
          <div className="container-input-metadates">
            <label htmlFor="keyboards" className="label-metadates">
              Claves(separadas por comas)
            </label>
            <input
              type="text"
              id="keyboards"
              name="keyboards"
              required
              value={post.keyboards}
              onChange={changeInput}
              className="input-metadates"
              placeholder="React, rendimiento, optimización, JavaScript"
            />
          </div>

          <div className="container-input-metadates check">
            <label htmlFor="is_public" className="label-metadates">
              {post.is_public !== null ? (
                <div className="check-label">
                  <p>Actualmente {post.is_public ? "público" : "privado"}</p>
                  <p>Cambiar a {isPublic ? "privado" : "público"}</p>
                </div>
              ) : (
                <p>Artículo {isPublic ? "público" : "privado"}</p>
              )}
            </label>
            <input
              type="checkbox"
              name="is_public"
              id="is_public"
              required
              checked={isPublic}
              onChange={changeIsPublic}
              title="Selecciona para privarlo"
            />
          </div>
        </section>
        <section className="section-editor">
          <EditorProvider
            immediatelyRender={false}
            slotBefore={<NavEditor />}
            extensions={extensions}
            content={html}
            onUpdate={({ editor }) => setHtml(editor.getHTML())}
          />

          <div className="container-buttons-form">
            <button className="button-form" onClick={handleSubmit}>
              {post.id ? "Actualizar" : "Agregar"}
            </button>

            <Link href="/dashboard" className="link-cancel-form">
              Cancelar
            </Link>
          </div>
        </section>
      </main>
    </RequireAuth>
  );
}
