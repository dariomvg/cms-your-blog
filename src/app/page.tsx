"use client";
import { useEditorConfig } from "../hooks/useEditorConfig";
import { EditorProvider } from "@tiptap/react";
import { usePosts } from "../context/contextPosts";
import { useRouter } from "next/navigation";
import { NavEditor } from "@/components/NavEditor";
import "@/styles/editor.css";

export default function Home() {
  const { extensions } = useEditorConfig();
  const {
    submitPost,
    handleChange,
    changeIsPublic,
    post,
    html,
    setHtml,
    cancelForm,
    message,
    isPublic,
  } = usePosts();
  const router = useRouter();

  const handleSubmit = () => {
    submitPost();
    router.push("/posts");
  };

  return (
    <main className="editor">
      <form className="form">
        <h1 className="title-form">Metadatos para el artículo</h1>
        <div className="container-input">
          <label htmlFor="title" className="label-form">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            required
            className="input-form"
            placeholder="Cómo mejorar el rendimiento en React..."
            onChange={handleChange}
          />
        </div>
        <div className="container-input">
          <label htmlFor="description" className="label-form">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input-form"
            value={post.description}
            required
            placeholder="En este artículo te explico 5 técnicas para optimizar aplicaciones React"
            onChange={handleChange}
          />
        </div>
        <div className="container-input">
          <label htmlFor="keyboards" className="label-form">
            Claves(separadas por comas)
          </label>
          <input
            type="text"
            id="keyboards"
            name="keyboards"
            value={post.keyboards}
            required
            className="input-form"
            placeholder="React, rendimiento, optimización, JavaScript"
            onChange={handleChange}
          />
        </div>

        <div className="container-input check">
          <label htmlFor="is_public" className="label-form">
            {post.is_public !== null ? (
              <div className="check-label">
                <p>Actualmente {post.is_public ? "público" : "privado"}</p>
                <p>Artículo {isPublic ? "público" : "privado"}</p>
              </div>
            ) : (
              <p>Artículo {isPublic ? "público" : "privado"}</p>
            )}
          </label>
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            checked={isPublic}
            required
            onChange={changeIsPublic}
            title="Selecciona para privarlo"
          />
        </div>
      </form>
      <EditorProvider
        slotBefore={<NavEditor />}
        extensions={extensions}
        content={html}
        onUpdate={({ editor }) => setHtml(editor.getHTML())}
      />
      <div className="container-buttons-form">
        <button className="button-form" onClick={handleSubmit}>
          {post.id ? "Actualizar" : "Agregar"}
        </button>

        <button className="button-form delete-form" onClick={cancelForm}>
          Cancelar
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </main>
  );
}
