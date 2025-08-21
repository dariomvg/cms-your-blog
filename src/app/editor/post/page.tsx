"use client";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { EditorProvider } from "@tiptap/react";
import { useRouter, useSearchParams } from "next/navigation";
import { NavEditor } from "@/components/NavEditor";
import "@/styles/editor.css";
import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { usePosts } from "@/hooks/usePosts";
import { Suspense } from "react";

function EditorPostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idPost = searchParams?.get("idPost");
  const postId = idPost ? parseInt(idPost) : undefined;
  const { extensions } = useEditorConfig();
  const {
    html,
    post, 
    isPublic,
    submitPost,
    changeEditor,
    changeInput,
    changeIsPublic
  } = usePosts(postId);

  const handleSubmit = () => {
    submitPost();
    router.push("/dashboard");
  };

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
              {isPublic !== null ? (
                <div className="check-label">
                  <p>Actualmente {isPublic ? "público" : "privado"}</p>
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
            slotBefore={<NavEditor />}
            extensions={extensions}
            content={html}
            onUpdate={({ editor }) => changeEditor(editor)}
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

export default function EditorPost() {
  return (
    <Suspense fallback={<div className="main-editor">Cargando editor...</div>}>
      <EditorPostContent />
    </Suspense>
  );
}
